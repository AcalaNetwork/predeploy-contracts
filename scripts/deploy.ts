// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// When running the script with `npx hardhat run <script>` you'll find the Hardhat
// Runtime Environment's members available in the global scope.
import { ethers } from "hardhat";

async function main() {
  const hre = await import("hardhat");
  // Hardhat always runs the compile task when running scripts with its command
  // line interface.
  //
  // If this script is run directly using `node` you may want to call compile
  // manually to make sure everything is compiled
  // await hre.run('compile');

  // We get the contract to deploy
  const evm = await ethers.getContractFactory("EVM");
  //const e = await evm.deploy();

  //await e.deployed();

  //console.log("EVM deployed to:", e.address);

  const res = await hre.network.provider.send("hardhat_setCode", [
    "0x0d2026b3EE6eC71FC6746ADb6311F6d3Ba1C000B",
    evm.bytecode
  ]);

  console.log("EVM deployed to:", res);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
