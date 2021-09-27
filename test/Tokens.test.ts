import { expect, use } from "chai";
import { ethers, Contract, BigNumber } from "ethers";
import { deployContract, solidity } from "ethereum-waffle";
import { evmChai } from "@acala-network/bodhi/evmChai";
import { TestAccountSigningKey, TestProvider, Signer } from "@acala-network/bodhi";
import { WsProvider } from "@polkadot/api";
import { createTestPairs } from "@polkadot/keyring/testingPairs";
import ADDRESS from "@acala-network/contracts/utils/Address";

use(solidity)
use(evmChai);

const provider = new TestProvider({
  provider: new WsProvider("ws://127.0.0.1:9944"),
});

const ERC20_ABI = require("../build/Token.json").abi;

describe("Token", () => {
  let wallet: Signer;
  let walletTo: Signer;
  let token: Contract;

  before(async () => {
    await provider.api.isReady;

    [wallet, walletTo] = await provider.getWallets();
    token = new ethers.Contract(ADDRESS.ACA, ERC20_ABI, wallet as any);
  });

  after(async () => {
    provider.api.disconnect();
  });

  it("get token name", async () => {
    const name = await token.name();
    expect(name).to.equal("Acala");
  });

  it("get token symbol", async () => {
    const symbol = await token.symbol();
    expect(symbol).to.equal("ACA");
  });

  it("get token decimals", async () => {
    const decimals = await token.decimals();
    expect(decimals).to.equal(12);
  });

  it("get total supply", async () => {
    const supply = await token.totalSupply();
    expect(supply).to.be.above(0);
  });

  it("get balance", async () => {
    const balance = await token.balanceOf(await wallet.getAddress());
    expect(balance).to.be.above(0);
  });

  it("transfer adds amount to destination account", async () => {
    const balance = (await token.balanceOf(await walletTo.getAddress())).toString();
    await token.transfer((await walletTo.getAddress()), 10000);
    expect((await token.balanceOf(await walletTo.getAddress())).sub(balance)).to.equal(10000);
  });

  it("transfer reverts if recipient is 0 address", async () => {
     await expect(token.transfer("0x0000000000000000000000000000000000000000", 10))
      .to.be.revertedWith("ERC20: transfer to the zero address");
  });

  it("transfer emits event", async () => {
    await expect(token.transfer(await walletTo.getAddress(), 7))
      .to.emit(token, "Transfer")
      .withArgs(await wallet.getAddress(), await walletTo.getAddress(), 7);
  });

  it("can not transfer above the balance", async () => {
    const balance = await token.balanceOf(await wallet.getAddress());
    await expect(token.transfer(await walletTo.getAddress(), balance.add(7))).to.be
      .reverted;
  });

  it("emits Approval event when calling approve", async () => {
    await expect(token.approve(await walletTo.getAddress(), 1))
      .to.emit(token, "Approval")
      .withArgs(await wallet.getAddress(), await walletTo.getAddress(), 1);
  });

  it("correctly saves allowance", async () => {
    await token.approve(await walletTo.getAddress(), 123);
    const allowance = await token.allowance(await wallet.getAddress(), await walletTo.getAddress());
    expect(allowance).to.eq(123);
  });

  it("reverts when calling transferFrom if the allowance is not given", async () => {
    await expect(token.transferFrom(await walletTo.getAddress(), await wallet.getAddress(), 1))
      .to.be.revertedWith("ERC20: transfer amount exceeds allowance");
  });

  it("reverts when calling transferFrom if the allowance is exceeded", async () => {
    await token.approve(await walletTo.getAddress(), 10);
    await expect(token.transferFrom(await wallet.getAddress(), await walletTo.getAddress(), 100))
      .to.be.revertedWith("ERC20: transfer amount exceeds allowance");
  });

  it("emits Transfer when calling transferFrom if the allowance is not exceeded", async () => {
    await token.approve(await wallet.getAddress(), 100);
    await expect(token.transferFrom(await wallet.getAddress(), await walletTo.getAddress(), 10))
      .to.emit(token, "Transfer")
      .withArgs(await wallet.getAddress(), await walletTo.getAddress(), 10);
  });

  it("increases allowance when calling increaseAllowance", async () => {
    await token.approve(await walletTo.getAddress(), 100);
    await expect(token.increaseAllowance(await walletTo.getAddress(), 10))
      .to.emit(token, "Approval")
      .withArgs(await wallet.getAddress(), await walletTo.getAddress(), 110);
    const allowance = await token.allowance(await wallet.getAddress(), await walletTo.getAddress());
    expect(allowance).to.eq(110);
  });

  it("decreases allowance when calling decreaseAllowance", async () => {
    await token.approve(await walletTo.getAddress(), 100);
    await expect(token.decreaseAllowance(await walletTo.getAddress(), 10))
      .to.emit(token, "Approval")
      .withArgs(await wallet.getAddress(), await walletTo.getAddress(), 90);
    const allowance = await token.allowance(await wallet.getAddress(), await walletTo.getAddress());
    expect(allowance).to.eq(90);
  });
});
