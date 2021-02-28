const fs = require('fs');
const path = require('path');
const util = require('util');
const childProcess = require('child_process');
const Handlebars = require("handlebars");

const copyFile = util.promisify(fs.copyFile);
const readFile = util.promisify(fs.readFile);
const writeFile = util.promisify(fs.writeFile);
const exec = util.promisify(childProcess.exec);

// Ethereum precompiles
// 0 - 0x400
// Acala precompiles
// 0x400 - 0x800
// Predeployed system contracts (except Mirrored ERC20)
// 0x800 - 0x1000
// Mirrored Tokens
// 0x01000000
// Mirrored NFT
// 0x02000000
const PREDEPLOY_ADDRESS_START = 0x800;
const MIRRORED_TOKENS_ADDRESS_START = 0x01000000;

function address(start, offset) {
  return "0x" + (Number(start)+ Number(offset)).toString(16).padStart(40,0);
}

const generate = async () => {
  const tokensFile = (process.argv[2] === undefined) ? path.join(__dirname, '..', 'resources', 'example_tokens.json'): process.argv[2];
  const bytecodesFile = (process.argv[3] === undefined) ? path.join(__dirname, '..', 'resources', 'bytecodes.json'): process.argv[3];

  const tokens = require(tokensFile);

  const contractsDirectoryComponents = [__dirname, '..', 'contracts', 'tmp'];
  const contractsDirectory = path.join(...contractsDirectoryComponents);

  if (!fs.existsSync(contractsDirectory)) {
    fs.mkdirSync(contractsDirectory);
  }

  const templatePath = path.join(__dirname, '..', 'contracts/token', 'Token.sol');

  for (const token of tokens) {
    const { name, symbol, currencyId } = token;
    const contractPath = path.join(...contractsDirectoryComponents, `${name}ERC20.sol`);

    await copyFile(templatePath, contractPath);

    const fileData = await readFile(contractPath, 'utf8');
    const replaced = fileData
      .replace(/contract ERC20 is IERC20/g, `contract ${name}ERC20 is IERC20`)
      .replace(/import "\.\/MultiCurrency.sol";/g, `import "../token/MultiCurrency.sol";`)
      .replace(/import "\.\/IMultiCurrency.sol";/g, `import "../token/IMultiCurrency.sol";`)
      // The currencyid is u8, it needs to be converted to uint256, and it needs to satisfy `v [29] == 0 && v [31] == 0`, so shift 8 bits to the left.
      .replace(/uint256 private constant _currencyId = 0xffff;/, `uint256 private constant _currencyId = ${"0x" + (currencyId << 8).toString(16)};`)
      .replace(/string private constant _name = "TEMPLATE";/g, `string private constant _name = "${name}";`)
      .replace(/string private constant _symbol = "TEMP";/g, `string private constant _symbol = "${symbol}";`);
    await writeFile(contractPath, replaced, 'utf8');
  }

  await exec('yarn truffle-compile');

  const bytecodes = tokens.reduce((output, { name, currencyId }) => {
    const { deployedBytecode } = require(`../build/contracts/${name}ERC20.json`);
    return [...output, [name, address(MIRRORED_TOKENS_ADDRESS_START, currencyId), deployedBytecode]];
  }, []);

  // add StateRent bytecodes
  const { deployedBytecode: stateRent } = require(`../build/contracts/StateRent.json`);
  bytecodes.push(['StateRent', address(PREDEPLOY_ADDRESS_START, 0), stateRent]);

  // add Oracle bytecodes
  const { deployedBytecode: oracle } = require(`../build/contracts/Oracle.json`);
  bytecodes.push(['Oracle', address(PREDEPLOY_ADDRESS_START, 1), oracle]);

  // add ScheduleCall bytecodes
  const { deployedBytecode: scheduleCall } = require(`../build/contracts/ScheduleCall.json`);
  bytecodes.push(['ScheduleCall', address(PREDEPLOY_ADDRESS_START, 2), scheduleCall]);

  // add DEX bytecodes
  const { deployedBytecode: dex } = require(`../build/contracts/DEX.json`);
  bytecodes.push(['DEX', address(PREDEPLOY_ADDRESS_START, 3), dex]);

  await writeFile(bytecodesFile, JSON.stringify(bytecodes, null, 2), 'utf8');

  // generate address constant for sol
  let tmpl = fs.readFileSync(path.resolve(__dirname, '../resources', 'address.sol.hbs'), 'utf8');
  let template = Handlebars.compile(tmpl);
  console.log(template(bytecodes));
  await writeFile(path.join(__dirname, '..', 'contracts/utils', 'Address.sol'), template(bytecodes), 'utf8');

  // generate address constant for js
  tmpl = fs.readFileSync(path.resolve(__dirname, '../resources', 'address.js.hbs'), 'utf8');
  template = Handlebars.compile(tmpl);
  console.log(template(bytecodes));
  await writeFile(path.join(__dirname, '..', 'contracts/utils', 'Address.js'), template(bytecodes), 'utf8');
};

const main = async () => {
  try {
    await generate();
  } catch (err) {
    console.log('>>> generating contracts bytecode failed: ', err);
  }
};

main();
