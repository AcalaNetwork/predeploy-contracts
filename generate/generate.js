const fs = require('fs');
const path = require('path');
const util = require('util');
const childProcess = require('child_process');
const Handlebars = require("handlebars");
const { ethers, BigNumber } = require("ethers");

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
// 0x010000000000000000
// Mirrored LP Tokens
// 0x020000000000000000
// Mirrored NFT
// 0x030000000000000000
const PREDEPLOY_ADDRESS_START = 0x800;
const MIRRORED_TOKENS_ADDRESS_START = "0x010000000000000000";
const MIRRORED_LP_TOKENS_ADDRESS_START = "0x020000000000000000";

function address(start, offset) {
  const address = BigNumber.from(start).add(offset).toHexString().slice(2).padStart(40,0);
  // Returns address as a Checksum Address.
  return ethers.utils.getAddress(address);
}

const generate = async () => {
  const tokensFile = path.join(__dirname, '../resources', 'tokens.json');
  const bytecodesFile = path.join(__dirname, '../resources', 'bytecodes.json');
  const addressDir = path.join(__dirname, '../contracts/utils');

  const tokens = require(tokensFile);

  await exec('yarn truffle-compile');

  const bytecodes = tokens.tokens.reduce((output, { symbol, currency_id }) => {
    return [...output, [symbol, address(MIRRORED_TOKENS_ADDRESS_START, currency_id), ""]];
  }, []);

  const lpbytecodes = tokens.lp_tokens.reduce((output, { symbol, currency_id }) => {
    return [...output, [symbol, address(MIRRORED_LP_TOKENS_ADDRESS_START, currency_id), ""]];
  }, []);
  bytecodes.push.apply(bytecodes, lpbytecodes);
  //console.log(bytecodes);

  const { deployedBytecode: token } = require(`../build/contracts/Token.json`);
  bytecodes.push(['Token', address(PREDEPLOY_ADDRESS_START, 0), token]);

  // add StateRent bytecodes
  const { deployedBytecode: stateRent } = require(`../build/contracts/StateRent.json`);
  bytecodes.push(['StateRent', address(PREDEPLOY_ADDRESS_START, 1), stateRent]);

  // add Oracle bytecodes
  const { deployedBytecode: oracle } = require(`../build/contracts/Oracle.json`);
  bytecodes.push(['Oracle', address(PREDEPLOY_ADDRESS_START, 2), oracle]);

  // add Schedule bytecodes
  const { deployedBytecode: schedule } = require(`../build/contracts/Schedule.json`);
  bytecodes.push(['Schedule', address(PREDEPLOY_ADDRESS_START, 3), schedule]);

  // add DEX bytecodes
  const { deployedBytecode: dex } = require(`../build/contracts/DEX.json`);
  bytecodes.push(['DEX', address(PREDEPLOY_ADDRESS_START, 4), dex]);

  await writeFile(bytecodesFile, JSON.stringify(bytecodes, null, 2), 'utf8');

  // generate address constant for sol
  let tmpl = fs.readFileSync(path.resolve(__dirname, '../resources', 'address.sol.hbs'), 'utf8');
  let template = Handlebars.compile(tmpl);
  await writeFile(path.join(addressDir, 'Address.sol'), template(bytecodes), 'utf8');

  // generate address constant for js
  tmpl = fs.readFileSync(path.resolve(__dirname, '../resources', 'address.js.hbs'), 'utf8');
  template = Handlebars.compile(tmpl);
  await writeFile(path.join(addressDir, 'Address.js'), template(bytecodes), 'utf8');

  // recompile Address.sol
  await exec('yarn truffle-compile');

  // generate Address.d.ts
  await exec('tsc contracts/utils/Address.js --declaration --allowJs --emitDeclarationOnly');
};

const main = async () => {
  try {
    await generate();
  } catch (err) {
    console.log('>>> generating contracts bytecode failed: ', err);
  }
};

main();
