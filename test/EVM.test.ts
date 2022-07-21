import { expect, use } from "chai";
import { ethers, Contract } from "ethers";
import { solidity, deployMockContract } from "ethereum-waffle";
import { TestProvider, Signer, evmChai } from "@acala-network/bodhi";
import { WsProvider } from "@polkadot/api";
import ADDRESS from "../contracts/utils/MandalaAddress";

use(solidity);
use(evmChai);

const provider = new TestProvider({
  provider: new WsProvider("ws://127.0.0.1:9944"),
});

const EVM_ABI = require("../artifacts/contracts/evm/EVM.sol/EVM.json").abi;
// Used as dummy contract to test evm predeploy functionality on
const Dummy_ABI = require("../artifacts/contracts/token/MultiCurrency.sol/MultiCurrency.json").abi;

describe("Evm", () => {
  let wallet: Signer;
  let walletTo: Signer;
  let evm_contract: Contract;
  let token: Contract;
  let instance: Contract;

  before(async () => {
    await provider.api.isReady;

    [wallet, walletTo] = await provider.getWallets();
    evm_contract = new ethers.Contract(ADDRESS.EVM, EVM_ABI, wallet);
    token = await deployMockContract(wallet, Dummy_ABI);
    instance = await deployMockContract(wallet, Dummy_ABI);
  });

  after(async () => {
    provider.api.disconnect();
  });

  it("returns new contract extra bytes", async () => {
    const response = await evm_contract.newContractExtraBytes();

    expect(response).to.be.above(0);
  });

  it("returns storage deposit per byte", async () => {
    const response = await evm_contract.storageDepositPerByte();

    expect(response).to.be.above(0);
  });

  it("returns the maintainer of the contract", async () => {
    const response = await evm_contract.maintainerOf(instance.address);

    expect(response).to.equal(await wallet.getAddress());
  });

  it("returns the developer deposit", async () => {
    const response = await evm_contract.developerDeposit();

    expect(response).to.be.above(0);
  });

  it("returns the deployment fee", async () => {
    const response = await evm_contract.publicationFee();

    expect(response).to.be.above(0);
  });

  it("reverts when trying to transfer maintainer of the contract the address is not maintaining", async () => {
    await expect(evm_contract.transferMaintainer(ADDRESS.EVM, await walletTo.getAddress()))
      .to.be.reverted;
  });

  it("reverts when trying to transfer maintainer to 0x0", async () => {
    await expect(evm_contract.transferMaintainer(instance.address, "0x0000000000000000000000000000000000000000"))
      .to.be.revertedWith("EVM: the newMaintainer is the zero address");
  });

  it("reverts when trying to transfer maintainer of 0x0", async () => {
    await expect(evm_contract.transferMaintainer("0x0000000000000000000000000000000000000000", await wallet.getAddress()))
      .to.be.revertedWith("EVM: the contractAddress is the zero address");
  });

  it("emits TransferredMaintainer and assigns new maintainer when transferring the maintainer", async () => {
    await expect(evm_contract.transferMaintainer(instance.address, await walletTo.getAddress()))
      .to.emit(evm_contract, "TransferredMaintainer")
      .withArgs(instance.address, await walletTo.getAddress());

    expect(await evm_contract.maintainerOf(instance.address)).to.equal(await walletTo.getAddress());
  });
});
