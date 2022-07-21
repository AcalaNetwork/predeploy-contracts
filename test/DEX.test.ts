import { expect, use } from "chai";
import { ethers, Contract } from "ethers";
import { solidity } from "ethereum-waffle";
import { TestProvider, Signer, evmChai } from "@acala-network/bodhi";
import { WsProvider } from "@polkadot/api";
import ADDRESS from "../contracts/utils/MandalaAddress";

use(solidity);
use(evmChai);

const provider = new TestProvider({
  provider: new WsProvider("ws://127.0.0.1:9944"),
});

const DEX_ABI = require("../artifacts/contracts/dex/DEX.sol/DEX.json").abi;
const ERC20_ABI = require("../artifacts/contracts/token/Token.sol/Token.json").abi;

describe("DEX", () => {
  let wallet: Signer;
  let walletTo: Signer;
  let dex: Contract;
  let tokenACA: Contract;
  let tokenAUSD: Contract;
  let tokenDOT: Contract;

  before(async () => {
    await provider.api.isReady;

    [wallet, walletTo] = await provider.getWallets();
    dex = new ethers.Contract(ADDRESS.DEX, DEX_ABI, wallet);
    tokenACA = new ethers.Contract(ADDRESS.ACA, ERC20_ABI, wallet as any);
    tokenAUSD = new ethers.Contract(ADDRESS.AUSD, ERC20_ABI, wallet as any);
    tokenDOT = new ethers.Contract(ADDRESS.DOT, ERC20_ABI, wallet as any);
  });

  after(async () => {
    provider.api.disconnect();
  });

  it("gets the liquidity pool for two tokens", async () => {
    const response = await dex.getLiquidityPool(ADDRESS.ACA, ADDRESS.AUSD);

    expect(response[0]).to.be.above(0);
    expect(response[1]).to.be.above(0);
  });

  it("reverts when trying to pass 0x0 as first token address when getting liquidity pool", async () => {
    await expect(dex.getLiquidityPool("0x0000000000000000000000000000000000000000", ADDRESS.AUSD))
      .to.be.revertedWith("DEX: tokenA is zero address");
  });

  it("reverts when trying to pass 0x0 as second token address when getting liquidity pool", async () => {
    await expect(dex.getLiquidityPool(ADDRESS.ACA, "0x0000000000000000000000000000000000000000"))
      .to.be.revertedWith("DEX: tokenB is zero address");
  });

  it("reverts when trying to pass 0x0 as both token addresses when getting liquidity pool", async () => {
    await expect(dex.getLiquidityPool("0x0000000000000000000000000000000000000000", "0x0000000000000000000000000000000000000000"))
      .to.be.reverted;
  });

  it("gets the liquidity token address", async () => {
    const response = await dex.getLiquidityTokenAddress(ADDRESS.ACA, ADDRESS.AUSD);

    expect(response).to.eq(ADDRESS.LP_ACA_AUSD);
  });

  it("reverts when trying to pass 0x0 as first token address when getting liquidity token address", async () => {
    await expect(dex.getLiquidityTokenAddress("0x0000000000000000000000000000000000000000", ADDRESS.AUSD))
      .to.be.revertedWith("DEX: tokenA is zero address");
  });

  it("reverts when trying to pass 0x0 as second token address when getting liquidity token address", async () => {
    await expect(dex.getLiquidityTokenAddress(ADDRESS.ACA, "0x0000000000000000000000000000000000000000"))
      .to.be.revertedWith("DEX: tokenB is zero address");
  });

  it("reverts when trying to pass 0x0 as both token addresses when getting liquidity token address", async () => {
    await expect(dex.getLiquidityTokenAddress("0x0000000000000000000000000000000000000000", "0x0000000000000000000000000000000000000000"))
      .to.be.reverted;
  });

  it("returns target amount when correctly calling get swap target amount with 2 path arguments", async () => {
    const path = [ADDRESS.ACA, ADDRESS.AUSD];
    const response = await dex.getSwapTargetAmount(path, 100);

    expect(response).to.be.above(0);
  });

  it("returns target amount when correctly calling get swap target amount with 3 path arguments", async () => {
    const path = [ADDRESS.ACA, ADDRESS.AUSD, ADDRESS.DOT];
    const response = await dex.getSwapTargetAmount(path, 100);

    expect(response).to.be.above(0);
  });

  it("reverts when trying to get swap target amount with 1 or 4 (or more) path arguments", async () => {
    const path1 = [ADDRESS.ACA];
    const path4 = [ADDRESS.ACA, ADDRESS.AUSD, ADDRESS.DOT, ADDRESS.KAR];

    await expect(dex.getSwapTargetAmount(path1, 100))
      .to.be.revertedWith("DEX: token path over the limit");
    await expect(dex.getSwapTargetAmount(path4, 100))
      .to.be.revertedWith("DEX: token path over the limit");
  });

  it("reverts when trying to pass 0x0 address as one of the path arguments when getting swap target amount", async () => {
    const path = [ADDRESS.ACA, ADDRESS.DOT, "0x0000000000000000000000000000000000000000"];

    await expect(dex.getSwapTargetAmount(path, 100))
      .to.be.revertedWith("DEX: token is zero address");
  });

  it("reverts when trying to pass empty supply amount when getting swap target amount", async () => {
    const path = [ADDRESS.ACA, ADDRESS.DOT];

    await expect(dex.getSwapTargetAmount(path, 0))
      .to.be.revertedWith("DEX: supplyAmount is zero");
  });

  it("returns supply amount when correctly calling get swap supply amount with 2 path arguments", async () => {
    const path = [ADDRESS.ACA, ADDRESS.AUSD];
    const response = await dex.getSwapSupplyAmount(path, 100);

    expect(response).to.be.above(0);
  });

  it("returns supply amount when correctly calling get swap supply amount with 3 path arguments", async () => {
    const path = [ADDRESS.ACA, ADDRESS.AUSD, ADDRESS.DOT];
    const response = await dex.getSwapSupplyAmount(path, 100);

    expect(response).to.be.above(0);
  });

  it("reverts when trying to get swap supply amount with 1 or 4 (or more) path arguments", async () => {
    const path1 = [ADDRESS.ACA];
    const path4 = [ADDRESS.ACA, ADDRESS.AUSD, ADDRESS.DOT, ADDRESS.KAR];

    await expect(dex.getSwapSupplyAmount(path1, 100))
      .to.be.revertedWith("DEX: token path over the limit");
    await expect(dex.getSwapSupplyAmount(path4, 100))
      .to.be.revertedWith("DEX: token path over the limit");
  });

  it("reverts when trying to pass 0x0 address as one of the path arguments when getting swap supply amount", async () => {
    const path = [ADDRESS.ACA, ADDRESS.DOT, "0x0000000000000000000000000000000000000000"];

    await expect(dex.getSwapSupplyAmount(path, 100))
      .to.be.revertedWith("DEX: token is zero address");
  });

  it("reverts when trying to pass empty supply amount when getting swap supply amount", async () => {
    const path = [ADDRESS.ACA, ADDRESS.DOT];

    await expect(dex.getSwapSupplyAmount(path, 0))
      .to.be.revertedWith("DEX: targetAmount is zero");
  });

  it("reduces the exact balance of the supply token from the sender when calling swap with exact supply", async () => {
    const initial_balance = await tokenDOT.balanceOf(await wallet.getAddress());
    const path = [ADDRESS.DOT, ADDRESS.AUSD];

    await dex.swapWithExactSupply(path, 100, 1);

    const final_balance = await tokenDOT.balanceOf(await wallet.getAddress());

    expect(final_balance).to.eq(initial_balance.sub(100));
  });

  it("allocates the expected amount of tokens to the caller when swapping with exact supply", async () =>{
    const initial_balance = await tokenAUSD.balanceOf(await wallet.getAddress());
    const path = [ADDRESS.ACA, ADDRESS.AUSD];
    const expected_target = await dex.getSwapTargetAmount(path, 100);

    await dex.swapWithExactSupply(path, 100, 1);

    const final_balance = await tokenAUSD.balanceOf(await wallet.getAddress());

    expect(final_balance).to.eq(initial_balance.add(expected_target));
  });

  it("emits Swaped event when swapping with exact supply", async () => {
    const path = [ADDRESS.ACA, ADDRESS.AUSD];
    const expected_target = await dex.getSwapTargetAmount(path, 100);

    await expect(dex.swapWithExactSupply(path, 100, 1))
      .to.emit(dex, "Swaped")
      .withArgs(await wallet.getAddress(), path, 100, expected_target);
  });

  it("reverts when trying to swap with exact supply with 1 or 4 (or more) path arguments", async () => {
    const path1 = [ADDRESS.ACA];
    const path4 = [ADDRESS.ACA, ADDRESS.AUSD, ADDRESS.DOT, ADDRESS.KAR];

    await expect(dex.swapWithExactSupply(path1, 100, 1))
      .to.be.revertedWith("DEX: token path over the limit");
    await expect(dex.swapWithExactSupply(path4, 100, 1))
      .to.be.revertedWith("DEX: token path over the limit");
  });

  it("reverts when trying to pass 0x0 address as one of the path arguments when swapping with exact supply", async () => {
    const path = [ADDRESS.ACA, ADDRESS.DOT, "0x0000000000000000000000000000000000000000"];

    await expect(dex.swapWithExactSupply(path, 100, 1))
      .to.be.revertedWith("DEX: token is zero address");
  });

  it("reverts when trying to pass empty supply amount when swapping with exact supply", async () => {
    const path = [ADDRESS.ACA, ADDRESS.DOT];

    await expect(dex.swapWithExactSupply(path, 0, 1))
      .to.be.revertedWith("DEX: supplyAmount is zero");
  });

  it("reduces the expected balance of the supply token from the sender when calling swap with exact target", async () => {
    const initial_balance = await tokenDOT.balanceOf(await wallet.getAddress());
    const path = [ADDRESS.DOT, ADDRESS.AUSD];
    const expected_supply = await dex.getSwapSupplyAmount(path, 100);

    await dex.swapWithExactTarget(path, 100, 1000);

    const final_balance = await tokenDOT.balanceOf(await wallet.getAddress());

    expect(final_balance).to.eq(initial_balance.sub(expected_supply));
  });

  it("allocates the expected amount of tokens to the caller when swapping with exact target", async () =>{
    const initial_balance = await tokenAUSD.balanceOf(await wallet.getAddress());
    const path = [ADDRESS.ACA, ADDRESS.AUSD];

    await dex.swapWithExactTarget(path, 100, 1000);

    const final_balance = await tokenAUSD.balanceOf(await wallet.getAddress());

    expect(final_balance).to.eq(initial_balance.add(100));
  });

  it("emits Swaped event when swapping with exact target", async () => {
    const path = [ADDRESS.DOT, ADDRESS.AUSD];
    const expected_supply = await dex.getSwapSupplyAmount(path, 100);

    await expect(dex.swapWithExactTarget(path, 100, 1000))
      .to.emit(dex, "Swaped")
      .withArgs(await wallet.getAddress(), path, expected_supply, 100);
  });

  it("reverts when trying to swap with exact target with 1 or 4 (or more) path arguments", async () => {
    const path1 = [ADDRESS.ACA];
    const path4 = [ADDRESS.ACA, ADDRESS.AUSD, ADDRESS.DOT, ADDRESS.KAR];

    await expect(dex.swapWithExactTarget(path1, 100, 1000))
      .to.be.revertedWith("DEX: token path over the limit");
    await expect(dex.swapWithExactTarget(path4, 100, 1000))
      .to.be.revertedWith("DEX: token path over the limit");
  });

  it("reverts when trying to pass 0x0 address as one of the path arguments when swapping with exact target", async () => {
    const path = [ADDRESS.ACA, ADDRESS.DOT, "0x0000000000000000000000000000000000000000"];

    await expect(dex.swapWithExactTarget(path, 100, 1000))
      .to.be.revertedWith("DEX: token is zero address");
  });

  it("reverts when trying to pass empty supply amount when swapping with exact target", async () => {
    const path = [ADDRESS.ACA, ADDRESS.DOT];

    await expect(dex.swapWithExactTarget(path, 0, 1000))
      .to.be.revertedWith("DEX: targetAmount is zero");
  });

  it("successfully adds liquidity and emits AddedLiquidity event", async () => {
    await expect(dex.addLiquidity(ADDRESS.ACA, ADDRESS.AUSD, 1000, 1000, 1))
      .to.emit(dex, "AddedLiquidity")
      .withArgs(await wallet.getAddress(), ADDRESS.ACA, ADDRESS.AUSD, 1000, 1000);
  });

  it("reverts when tokenA address for adding liquidity is 0x0", async () => {
    await expect(dex.addLiquidity("0x0000000000000000000000000000000000000000", ADDRESS.AUSD, 1000, 1000, 1))
      .to.be.revertedWith("DEX: tokenA is zero address");
  });

  it("reverts when tokenB address for adding liquidity is 0x0", async () => {
    await expect(dex.addLiquidity(ADDRESS.ACA, "0x0000000000000000000000000000000000000000", 1000, 1000, 1))
      .to.be.revertedWith("DEX: tokenB is zero address");
  });

  it("reverts when maxAmountA for adding liquidity is 0", async () => {
    await expect(dex.addLiquidity(ADDRESS.ACA, ADDRESS.AUSD, 0, 1000, 1))
      .to.be.revertedWith("DEX: maxAmountA is zero");
  });

  it("reverts when maxAmountB for adding liquidity is 0", async () => {
    await expect(dex.addLiquidity(ADDRESS.ACA, ADDRESS.AUSD, 1000, 0, 1))
      .to.be.revertedWith("DEX: maxAmountB is zero");
  });

  it("successfully removes liquidity and emits RemovedLiquidity event", async () => {
    await expect(dex.removeLiquidity(ADDRESS.ACA, ADDRESS.AUSD, 10, 1, 1))
      .to.emit(dex, "RemovedLiquidity")
      .withArgs(await wallet.getAddress(), ADDRESS.ACA, ADDRESS.AUSD, 10);
  });

  it("reverts when removeLiquidity is called with 0x0 value for tokenA", async () => {
    await expect(dex.removeLiquidity("0x0000000000000000000000000000000000000000", ADDRESS.AUSD, 10, 1, 1))
      .to.be.revertedWith("DEX: tokenA is zero address");
  });

  it("reverts when removeLiquidity is called with 0x0 value for tokenB", async () => {
    await expect(dex.removeLiquidity(ADDRESS.ACA, "0x0000000000000000000000000000000000000000", 10, 1, 1))
      .to.be.revertedWith("DEX: tokenB is zero address");
  });

  it("reverts when removeLiquidity is called with 0 value for removeShare", async () => {
    await expect(dex.removeLiquidity(ADDRESS.ACA, ADDRESS.AUSD, 0, 1, 1))
      .to.be.revertedWith("DEX: removeShare is zero");
  });
});
