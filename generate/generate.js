const fs = require('fs');
const path = require('path');
const util = require('util');
const childProcess = require('child_process');
const Handlebars = require("handlebars");
const { ethers, BigNumber } = require("hardhat");
const hre = require("hardhat")

const writeFile = util.promisify(fs.writeFile);
const exec = util.promisify(childProcess.exec);

const generate = async () => {
  const tokensFile = path.join(__dirname, '../resources', 'tokens.json');
  const bytecodesFile = path.join(__dirname, '../resources', 'bytecodes.json');
  const addressDir = path.join(__dirname, '../contracts/utils');

  const tokens = require(tokensFile);

  // compile to generate contracts json.
  await exec('yarn build');

  const { bytecode: token } = await hre.artifacts.readArtifact("Token");
  const tokenList = tokens.reduce((output, { symbol, address }) => {
    return [...output, [symbol, ethers.utils.getAddress(address), token]];
  }, []);

  let bytecodes = [];

  // add EVM bytecodes
  const { bytecode: evm } = await hre.artifacts.readArtifact("EVM");
  bytecodes.push(['EVM', ethers.utils.getAddress('0x0000000000000000000000000000000000000800'), evm]);

  // add Oracle bytecodes
  const { bytecode: oracle } = await hre.artifacts.readArtifact("Oracle");
  bytecodes.push(['Oracle', ethers.utils.getAddress('0x0000000000000000000000000000000000000801'), oracle]);

  // add Schedule bytecodes
  const { bytecode: schedule } = await hre.artifacts.readArtifact("Schedule");
  bytecodes.push(['Schedule', ethers.utils.getAddress('0x0000000000000000000000000000000000000802'), schedule]);

  // add DEX bytecodes
  const { bytecode: dex } = await hre.artifacts.readArtifact("DEX");
  bytecodes.push(['DEX', ethers.utils.getAddress('0x0000000000000000000000000000000000000803'), dex]);

  // add StableAsset bytecodes
  // const { bytecode: stableAsset } = await hre.artifacts.readArtifact("StableAsset");
  // bytecodes.push(['StableAsset', ethers.utils.getAddress('0x0000000000000000000000000000000000000804'), stableAsset]);

  // add Homa bytecodes
  const { bytecode: homa } = await hre.artifacts.readArtifact("Homa");
  bytecodes.push(['Homa', ethers.utils.getAddress('0x0000000000000000000000000000000000000805'), homa]);

  // add EVMAccounts bytecodes
  const { bytecode: evmAccounts } = await hre.artifacts.readArtifact("EVMAccounts");
  bytecodes.push(['EVMAccounts', ethers.utils.getAddress('0x0000000000000000000000000000000000000806'), evmAccounts]);

  // add Honzon bytecodes
  const { bytecode: honzon } = await hre.artifacts.readArtifact("Honzon");
  bytecodes.push(['Honzon', ethers.utils.getAddress('0x0000000000000000000000000000000000000807'), honzon]);

  // Maybe each nft will deploy a contract, like the mirrored token.
  // add NFT bytecodes
  // const { bytecode: nft } = require(`../build/contracts/NFT.json`);
  // bytecodes.push(['NFT', ethers.utils.getAddress('0x00000000000000000000000000000000000008XX'), nft]);

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
  await exec('yarn build');

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
