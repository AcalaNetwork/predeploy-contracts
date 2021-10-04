import { expect, use } from "chai";
import { ethers, Contract } from "ethers";
import { solidity, deployMockContract } from "ethereum-waffle";
import { evmChai } from "@acala-network/bodhi/evmChai";
import { TestProvider, Signer } from "@acala-network/bodhi";
import { WsProvider } from "@polkadot/api";
import IERC20 from "../build/IERC20.json";
import ADDRESS from "@acala-network/contracts/utils/Address";

use(solidity);
use(evmChai);

const provider = new TestProvider({
  provider: new WsProvider("ws://127.0.0.1:9944"),
});

const STATE_RENT_ABI = require("../build/StateRent.json").abi;

describe("StateRent", () => {
  let wallet: Signer;
  let walletTo: Signer;
  let state_rent: Contract;
  let token: Contract;
  let instance: Contract;

  before(async () => {
    await provider.api.isReady;

    [wallet, walletTo] = await provider.getWallets();
    state_rent = new ethers.Contract(ADDRESS.StateRent, STATE_RENT_ABI, wallet);
    token = await deployMockContract(wallet, IERC20.abi);
    instance = await deployMockContract(wallet, IERC20.abi);
  });

  after(async () => {
    provider.api.disconnect();
  });

  it("returns new contract extra bytes", async () => {
    const response = await state_rent.newContractExtraBytes();

    expect(response).to.be.above(0);
  });

  it("returns storage deposit per byte", async () => {
    const response = await state_rent.storageDepositPerByte();

    expect(response).to.be.above(0);
  });

  it("returns the maintainer of the contract", async () => {
    const response = await state_rent.maintainerOf(instance.address);

    expect(response).to.equal(await wallet.getAddress());
  });

  it("returns the developer deposit", async () => {
    const response = await state_rent.developerDeposit();

    expect(response).to.be.above(0);
  });

  it("returns the deployment fee", async () => {
    const response = await state_rent.deploymentFee();

    expect(response).to.be.above(0);
  });

  it("reverts when trying to transfer maintainer of the contract the address is not maintaining", async () => {
    await expect(state_rent.transferMaintainer(ADDRESS.StateRent, await walletTo.getAddress()))
      .to.be.reverted;
  });

  it("reverts when trying to transfer maintainer to 0x0", async () => {
    await expect(state_rent.transferMaintainer(instance.address, "0x0000000000000000000000000000000000000000"))
      .to.be.revertedWith("StateRent: the new_maintainer is the zero address");
  });

  it("reverts when trying to transfer maintainer of 0x0", async () => {
    await expect(state_rent.transferMaintainer("0x0000000000000000000000000000000000000000", await wallet.getAddress()))
      .to.be.revertedWith("StateRent: the contract_address is the zero address");
  });

  it("emits TransferredMaintainer and assigns new maintainer when transferring the maintainer", async () => {
    await expect(state_rent.transferMaintainer(instance.address, await walletTo.getAddress()))
      .to.emit(state_rent, "TransferredMaintainer")
      .withArgs(instance.address, await walletTo.getAddress());

    expect(await state_rent.maintainerOf(instance.address)).to.equal(await walletTo.getAddress());
  });
});
