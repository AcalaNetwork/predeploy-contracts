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

const generate = async () => {
  const tokensFile = path.join(__dirname, '../resources', 'tokens.json');
  const bytecodesFile = path.join(__dirname, '../resources', 'bytecodes.json');
  const addressDir = path.join(__dirname, '../contracts/utils');

  const tokens = require(tokensFile);

  // compile to generate contracts json.
  await exec('yarn truffle-compile');

  const tokenList = tokens.reduce((output, { symbol, address }) => {
    return [...output, [symbol, ethers.utils.getAddress(address), ""]];
  }, []);

  let bytecodes = [];
  const { bytecode: token } = require(`../build/contracts/Token.json`);
  bytecodes.push(['Token', ethers.utils.getAddress('0x0000000000000000000000000000000000000800'), token]);

  // add NFT bytecodes
  const { bytecode: nft } = require(`../build/contracts/NFT.json`);
  bytecodes.push(['NFT', ethers.utils.getAddress('0x0000000000000000000000000000000000000801'), nft]);

  // add EVM bytecodes
  const { bytecode: evm } = require(`../build/contracts/EVM.json`);
  bytecodes.push(['EVM', ethers.utils.getAddress('0x0000000000000000000000000000000000000802'), evm]);

  // add Oracle bytecodes
  const { bytecode: oracle } = require(`../build/contracts/Oracle.json`);
  bytecodes.push(['Oracle', ethers.utils.getAddress('0x0000000000000000000000000000000000000803'), oracle]);

  // add Schedule bytecodes
  const { bytecode: schedule } = require(`../build/contracts/Schedule.json`);
  bytecodes.push(['Schedule', ethers.utils.getAddress('0x0000000000000000000000000000000000000804'), schedule]);

  // add DEX bytecodes
  const { bytecode: dex } = require(`../build/contracts/DEX.json`);
  bytecodes.push(['DEX', ethers.utils.getAddress('0x0000000000000000000000000000000000000805'), dex]);

  // merge tokenList into bytecodes
  bytecodes = tokenList.concat(bytecodes);

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
