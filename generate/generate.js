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
  const acalaTokensFile = path.join(__dirname, '../resources', 'acala_tokens.json');
  const karuraTokensFile = path.join(__dirname, '../resources', 'karura_tokens.json');
  const mandalaTokensFile = path.join(__dirname, '../resources', 'mandala_tokens.json');
  const bytecodesFile = path.join(__dirname, '../resources', 'bytecodes.json');
  const addressDir = path.join(__dirname, '../contracts/utils');

  const acalaTokens = require(acalaTokensFile);
  const karuraTokens = require(karuraTokensFile);
  const mandalaTokens = require(mandalaTokensFile);

  // compile to generate contracts json.
  await exec('yarn build');

  const { bytecode: token } = await hre.artifacts.readArtifact("Token");
  const acalaTokenList = acalaTokens.reduce((output, { symbol, address }) => {
    return [...output, [symbol, ethers.utils.getAddress(address), token]];
  }, []);
  const karuraTokenList = karuraTokens.reduce((output, { symbol, address }) => {
    return [...output, [symbol, ethers.utils.getAddress(address), token]];
  }, []);
  const mandalaTokenList = mandalaTokens.reduce((output, { symbol, address }) => {
    return [...output, [symbol, ethers.utils.getAddress(address), token]];
  }, []);

  let bytecodes = [];

  // add EVM bytecodes
  const { bytecode: evm } = await hre.artifacts.readArtifact("EVM");
  bytecodes.push(['EVM', ethers.utils.getAddress('0x0000000000000000000000000000000000000800'), evm]);

  // add Oracle bytecodes
  const { bytecode: oracle } = await hre.artifacts.readArtifact("Oracle");
  bytecodes.push(['ORACLE', ethers.utils.getAddress('0x0000000000000000000000000000000000000801'), oracle]);

  // add Schedule bytecodes
  const { bytecode: schedule } = await hre.artifacts.readArtifact("Schedule");
  bytecodes.push(['SCHEDULE', ethers.utils.getAddress('0x0000000000000000000000000000000000000802'), schedule]);

  // add DEX bytecodes
  const { bytecode: dex } = await hre.artifacts.readArtifact("DEX");
  bytecodes.push(['DEX', ethers.utils.getAddress('0x0000000000000000000000000000000000000803'), dex]);

  // add StableAsset bytecodes
  const { bytecode: stableAsset } = await hre.artifacts.readArtifact("StableAsset");
  bytecodes.push(['STABLE_ASSET', ethers.utils.getAddress('0x0000000000000000000000000000000000000804'), stableAsset]);

  // add Homa bytecodes
  const { bytecode: homa } = await hre.artifacts.readArtifact("Homa");
  bytecodes.push(['HOMA', ethers.utils.getAddress('0x0000000000000000000000000000000000000805'), homa]);

  // add EVMAccounts bytecodes
  const { bytecode: evmAccounts } = await hre.artifacts.readArtifact("EVMAccounts");
  bytecodes.push(['EVM_ACCOUNTS', ethers.utils.getAddress('0x0000000000000000000000000000000000000806'), evmAccounts]);

  // add Honzon bytecodes
  const { bytecode: honzon } = await hre.artifacts.readArtifact("Honzon");
  bytecodes.push(['HONZON', ethers.utils.getAddress('0x0000000000000000000000000000000000000807'), honzon]);

  // add Incentives bytecodes
  const { bytecode: incentives } = await hre.artifacts.readArtifact("Incentives");
  bytecodes.push(['INCENTIVES', ethers.utils.getAddress('0x0000000000000000000000000000000000000808'), incentives]);

  // add Xtokens bytecodes
  const { bytecode: xtokens } = await hre.artifacts.readArtifact("Xtokens");
  bytecodes.push(['XTOKENS', ethers.utils.getAddress('0x0000000000000000000000000000000000000809'), xtokens]);

  // add LiquidCrowdloan bytecodes
  const { bytecode: liquidCrowdloan } = await hre.artifacts.readArtifact("LiquidCrowdloan");
  bytecodes.push(['LIQUID_CROWDLOAN', ethers.utils.getAddress('0x000000000000000000000000000000000000080a'), liquidCrowdloan]);

  // Maybe each nft will deploy a contract, like the mirrored token.
  // add NFT bytecodes
  // const { bytecode: nft } = require(`../build/contracts/NFT.json`);
  // bytecodes.push(['NFT', ethers.utils.getAddress('0x00000000000000000000000000000000000008XX'), nft]);

  await writeFile(bytecodesFile, JSON.stringify(acalaTokenList.concat(karuraTokenList).concat(bytecodes), null, 2), 'utf8');

  // generate address constant for sol
  let tmpl = fs.readFileSync(path.resolve(__dirname, '../resources', 'tokens.sol.hbs'), 'utf8');
  let template = Handlebars.compile(tmpl);
  await writeFile(path.join(addressDir, 'AcalaTokens.sol'), template(acalaTokenList), 'utf8');
  await writeFile(path.join(addressDir, 'KaruraTokens.sol'), template(karuraTokenList), 'utf8');
  await writeFile(path.join(addressDir, 'MandalaTokens.sol'), template(mandalaTokenList), 'utf8');

  tmpl = fs.readFileSync(path.resolve(__dirname, '../resources', 'predeploy.sol.hbs'), 'utf8');
  template = Handlebars.compile(tmpl);
  await writeFile(path.join(addressDir, 'Predeploy.sol'), template(bytecodes), 'utf8');

  // generate address constant for js
  tmpl = fs.readFileSync(path.resolve(__dirname, '../resources', 'address.js.hbs'), 'utf8');
  template = Handlebars.compile(tmpl);
  await writeFile(path.join(addressDir, 'AcalaTokens.js'), template(acalaTokenList), 'utf8');
  await writeFile(path.join(addressDir, 'KaruraTokens.js'), template(karuraTokenList), 'utf8');
  await writeFile(path.join(addressDir, 'MandalaTokens.js'), template(mandalaTokenList), 'utf8');
  await writeFile(path.join(addressDir, 'Predeploy.js'), template(bytecodes), 'utf8');

  // recompile Address.sol
  await exec('yarn build');

  // generate Address.d.ts
  await exec('tsc contracts/utils/AcalaTokens.js --declaration --allowJs --emitDeclarationOnly');
  await exec('tsc contracts/utils/KaruraTokens.js --declaration --allowJs --emitDeclarationOnly');
  await exec('tsc contracts/utils/MandalaTokens.js --declaration --allowJs --emitDeclarationOnly');
  await exec('tsc contracts/utils/Predeploy.js --declaration --allowJs --emitDeclarationOnly');
};

const main = async () => {
  try {
    await generate();
  } catch (err) {
    console.log('>>> generating contracts bytecode failed: ', err);
  }
};

main();
