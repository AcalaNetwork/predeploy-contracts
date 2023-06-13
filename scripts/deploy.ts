import { ethers } from "hardhat";

async function main() {
  const [deployer] = await ethers.getSigners();
  console.log(`Deploying contracts with the account: ${deployer.address}`);

  // We get the contract to deploy
  const xtokens = await ethers.getContractFactory("Xtokens", deployer);
  const res = await xtokens.deploy();

  console.log('XTOKEN address: ' + res.address);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
