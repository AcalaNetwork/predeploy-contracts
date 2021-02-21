const fs = require('fs');
const path = require('path');
const util = require('util');
const childProcess = require('child_process');


const copyFile = util.promisify(fs.copyFile);
const readFile = util.promisify(fs.readFile);
const writeFile = util.promisify(fs.writeFile);
const exec = util.promisify(childProcess.exec);

const generate = async () => {
  const tokensFile = (process.argv[2] === undefined) ? path.join(__dirname, '..', 'resources', 'example_tokens.json'): process.argv[2];
  const bytecodesFile = (process.argv[3] === undefined) ? path.join(__dirname, '..', 'resources', 'bytecodes.json'): process.argv[3];

  const tokens = require(tokensFile);

  const contractsDirectoryComponents = [__dirname, '..', 'contracts', 'tmp'];
  const contractsDirectory = path.join(...contractsDirectoryComponents);

  if (!fs.existsSync(contractsDirectory)) {
    fs.mkdirSync(contractsDirectory);
  }

  const templatePath = path.join(__dirname, '..', 'contracts', 'Token.sol');

  for (const token of tokens) {
    const { name, symbol, currencyId } = token;
    const contractPath = path.join(...contractsDirectoryComponents, `${name}ERC20.sol`);

    await copyFile(templatePath, contractPath);

    const fileData = await readFile(contractPath, 'utf8');
    const replaced = fileData
      .replace(/contract ERC20 is IERC20/g, `contract ${name}ERC20 is IERC20`)
      .replace(/import "\.\/MultiCurrency.sol";/g, `import "../MultiCurrency.sol";`)
      .replace(/uint256 private constant _currencyId = 0xffff;/, `uint256 private constant _currencyId = ${currencyId};`)
      .replace(/string private constant _name = "TEMPLATE";/g, `string private constant _name = "${name}";`)
      .replace(/string private constant _symbol = "TEMP";/g, `string private constant _symbol = "${symbol}";`);
    await writeFile(contractPath, replaced, 'utf8');
  }

  await exec('yarn truffle-compile');

  const bytecodes = tokens.reduce((output, { name, currencyId }) => {
    const { deployedBytecode } = require(`../build/contracts/${name}ERC20.json`);
    return [...output, [name, "0x" + (2048 + Number(currencyId)).toString(16).padStart(40,0), deployedBytecode]];
  }, []);

  // add StateRent bytecodes
  const { deployedBytecode: stateRent } = require(`../build/contracts/StateRent.json`);
  bytecodes.push(['StateRent', '', stateRent]);

  // add Oracle bytecodes
  const { deployedBytecode: oracle } = require(`../build/contracts/Oracle.json`);
  bytecodes.push(['Oracle', '', oracle]);

  // add ScheduleCall bytecodes
  const { deployedBytecode: scheduleCall } = require(`../build/contracts/ScheduleCall.json`);
  bytecodes.push(['ScheduleCall', '', scheduleCall]);

  // add DEX bytecodes
  const { deployedBytecode: dex } = require(`../build/contracts/DEX.json`);
  bytecodes.push(['DEX', '', dex]);

  await writeFile(bytecodesFile, JSON.stringify(bytecodes, null, 2), 'utf8');
};

const main = async () => {
  try {
    await generate();
  } catch (err) {
    console.log('>>> generating contracts bytecode failed: ', err);
  }
};

main();
