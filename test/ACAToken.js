const { expect } = require("chai");
const { Contract, BigNumber } = require("ethers");
const { ACA } = require("../contracts/utils/MandalaAddress");
const { getTestProvider } = require("./utils/utils");

const ERC20_ABI =
  require("../artifacts/contracts/token/Token.sol/Token.json").abi;

describe("ACAToken", () => {
  let provider;
  let wallet;
  let walletTo;
  let token;
  let walletAddress;
  let walletToAddress;

  beforeEach(async () => {
    provider = await getTestProvider();
    [wallet, walletTo] = await ethers.getSigners();
    token = new Contract(ACA, ERC20_ABI, wallet);
    walletAddress = await wallet.getAddress();
    walletToAddress = await walletTo.getAddress();
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

  it("Transfer adds amount to destination account", async () => {
    const balance = await token.balanceOf(walletToAddress);
    await token.transfer(walletToAddress, 7);
    expect((await token.balanceOf(walletToAddress)).sub(balance)).to.equal(7);
  });

  it("Transfer emits event", async () => {
    await expect(token.transfer(walletToAddress, 7))
      .to.emit(token, "Transfer")
      .withArgs(walletAddress, walletToAddress, 7);
  });

  it("Can not transfer above the amount", async () => {
    const balance = await token.balanceOf(walletAddress);
    await expect(token.transfer(walletToAddress, balance.add(7))).to.be
      .reverted;
  });
});
