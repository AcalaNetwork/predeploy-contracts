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
  const deployedBytecodesFile = path.join(__dirname, '../resources', 'deployedBytecodes.json');
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

  const { deployedBytecode: tokenDeployedBytecode } = await hre.artifacts.readArtifact("Token");
  const acalaTokenDeployedBytecodeList = acalaTokens.reduce((output, { symbol, address }) => {
    return [...output, [symbol, ethers.utils.getAddress(address), tokenDeployedBytecode]];
  }, []);
  const karuraTokenDeployedBytecodeList = karuraTokens.reduce((output, { symbol, address }) => {
    return [...output, [symbol, ethers.utils.getAddress(address), tokenDeployedBytecode]];
  }, []);
  const mandalaTokenDeployedBytecodeList = mandalaTokens.reduce((output, { symbol, address }) => {
    return [...output, [symbol, ethers.utils.getAddress(address), tokenDeployedBytecode]];
  }, []);

  let bytecodes = [];
  let deployedBytecodes = [];

  // add EVM bytecodes
  const { bytecode: evm, deployedBytecode: evmDeployedBytecode } = await hre.artifacts.readArtifact("EVM");
  bytecodes.push(['EVM', ethers.utils.getAddress('0x0000000000000000000000000000000000000800'), evm]);
  deployedBytecodes.push(['EVM', ethers.utils.getAddress('0x0000000000000000000000000000000000000800'), evmDeployedBytecode]);

  // add Oracle bytecodes
  const { bytecode: oracle, deployedBytecode: oracleDeployedBytecode } = await hre.artifacts.readArtifact("Oracle");
  bytecodes.push(['ORACLE', ethers.utils.getAddress('0x0000000000000000000000000000000000000801'), oracle]);
  deployedBytecodes.push(['ORACLE', ethers.utils.getAddress('0x0000000000000000000000000000000000000801'), oracleDeployedBytecode]);

  // add Schedule bytecodes
  const { bytecode: schedule, deployedBytecode: scheduleDeployedBytecode } = await hre.artifacts.readArtifact("Schedule");
  bytecodes.push(['SCHEDULE', ethers.utils.getAddress('0x0000000000000000000000000000000000000802'), schedule]);
  deployedBytecodes.push(['SCHEDULE', ethers.utils.getAddress('0x0000000000000000000000000000000000000802'), scheduleDeployedBytecode]);

  // add DEX bytecodes
  const { bytecode: dex, deployedBytecode: dexDeployedBytecode } = await hre.artifacts.readArtifact("DEX");
  bytecodes.push(['DEX', ethers.utils.getAddress('0x0000000000000000000000000000000000000803'), dex]);
  deployedBytecodes.push(['DEX', ethers.utils.getAddress('0x0000000000000000000000000000000000000803'), dexDeployedBytecode]);

  // add DEXV2 bytecodes
  const { bytecode: dexV2, deployedBytecode: dexV2DeployedBytecode } = await hre.artifacts.readArtifact("DEXV2");
  bytecodes.push(['DEXV2', ethers.utils.getAddress('0x0000000000000000000000000000000000000803'), dexV2]);
  deployedBytecodes.push(['DEXV2', ethers.utils.getAddress('0x0000000000000000000000000000000000000803'), dexV2DeployedBytecode]);

  // add StableAsset bytecodes
  const { bytecode: stableAsset, deployedBytecode: stableAssetDeployedBytecode } = await hre.artifacts.readArtifact("StableAsset");
  bytecodes.push(['STABLE_ASSET', ethers.utils.getAddress('0x0000000000000000000000000000000000000804'), stableAsset]);
  deployedBytecodes.push(['STABLE_ASSET', ethers.utils.getAddress('0x0000000000000000000000000000000000000804'), stableAssetDeployedBytecode]);

  // add Homa bytecodes
  const { bytecode: homa, deployedBytecode: homaDeployedBytecode } = await hre.artifacts.readArtifact("Homa");
  bytecodes.push(['HOMA', ethers.utils.getAddress('0x0000000000000000000000000000000000000805'), homa]);
  deployedBytecodes.push(['HOMA', ethers.utils.getAddress('0x0000000000000000000000000000000000000805'), homaDeployedBytecode]);

  // add EVMAccounts bytecodes
  const { bytecode: evmAccounts, deployedBytecode: evmAccountsDeployedBytecode } = await hre.artifacts.readArtifact("EVMAccounts");
  bytecodes.push(['EVM_ACCOUNTS', ethers.utils.getAddress('0x0000000000000000000000000000000000000806'), evmAccounts]);
  deployedBytecodes.push(['EVM_ACCOUNTS', ethers.utils.getAddress('0x0000000000000000000000000000000000000806'), evmAccountsDeployedBytecode]);

  // add Honzon bytecodes
  const { bytecode: honzon, deployedBytecode: honzonDeployedBytecode } = await hre.artifacts.readArtifact("Honzon");
  bytecodes.push(['HONZON', ethers.utils.getAddress('0x0000000000000000000000000000000000000807'), honzon]);
  deployedBytecodes.push(['HONZON', ethers.utils.getAddress('0x0000000000000000000000000000000000000807'), honzonDeployedBytecode]);

  // add Incentives bytecodes
  const { bytecode: incentives, deployedBytecode: incentivesDeployedBytecode } = await hre.artifacts.readArtifact("Incentives");
  bytecodes.push(['INCENTIVES', ethers.utils.getAddress('0x0000000000000000000000000000000000000808'), incentives]);
  deployedBytecodes.push(['INCENTIVES', ethers.utils.getAddress('0x0000000000000000000000000000000000000808'), incentivesDeployedBytecode]);

  // add Xtokens bytecodes
  const { bytecode: xtokens, deployedBytecode: xtokensDeployedBytecode } = await hre.artifacts.readArtifact("Xtokens");
  bytecodes.push(['XTOKENS', ethers.utils.getAddress('0x0000000000000000000000000000000000000809'), xtokens]);
  deployedBytecodes.push(['XTOKENS', ethers.utils.getAddress('0x0000000000000000000000000000000000000809'), xtokensDeployedBytecode]);

  // add LiquidCrowdloan bytecodes
  const { bytecode: liquidCrowdloan, deployedBytecode: liquidCrowdloanDeployedBytecode } = await hre.artifacts.readArtifact("LiquidCrowdloan");
  bytecodes.push(['LIQUID_CROWDLOAN', ethers.utils.getAddress('0x000000000000000000000000000000000000080a'), liquidCrowdloan]);
  deployedBytecodes.push(['LIQUID_CROWDLOAN', ethers.utils.getAddress('0x000000000000000000000000000000000000080a'), liquidCrowdloanDeployedBytecode]);

  // add Earning bytecodes
  const { bytecode: earning, deployedBytecode: earningDeployedBytecode } = await hre.artifacts.readArtifact("Earning");
  bytecodes.push(['EARNING', ethers.utils.getAddress('0x000000000000000000000000000000000000080b'), earning]);
  deployedBytecodes.push(['EARNING', ethers.utils.getAddress('0x000000000000000000000000000000000000080b'), earningDeployedBytecode]);

  // Maybe each nft will deploy a contract, like the mirrored token.
  // add NFT bytecodes
  // const { bytecode: nft } = require(`../build/contracts/NFT.json`);
  // bytecodes.push(['NFT', ethers.utils.getAddress('0x00000000000000000000000000000000000008XX'), nft]);

  await writeFile(bytecodesFile, JSON.stringify(acalaTokenList.concat(karuraTokenList).concat(bytecodes), null, 2), 'utf8');
  await writeFile(deployedBytecodesFile, JSON.stringify(acalaTokenDeployedBytecodeList.concat(karuraTokenDeployedBytecodeList).concat(deployedBytecodes), null, 2), 'utf8');

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
