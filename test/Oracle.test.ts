import { expect, use } from "chai";
import { ethers, Contract, BigNumber } from "ethers";
import { solidity } from "ethereum-waffle";
import { evmChai } from "@acala-network/bodhi/evmChai";
import { TestProvider, Signer } from "@acala-network/bodhi";
import { WsProvider } from "@polkadot/api";
import { createTestPairs } from "@polkadot/keyring/testingPairs";
import ADDRESS from "@acala-network/contracts/utils/Address";

use(solidity)
use(evmChai);

const provider = new TestProvider({
  provider: new WsProvider("ws://127.0.0.1:9944"),
});

const testPairs = createTestPairs();

const feedValues = async (token: string, price: number) => {
  return new Promise((resolve) => {
    provider.api.tx.acalaOracle
      .feedValues([[{ Token: token }, price]])
      .signAndSend(testPairs.alice.address, (result) => {
        if (result.status.isInBlock) {
          resolve(undefined);
        }
      });
  });
};

const ORACLE_ABI = require("../build/Oracle.json").abi;

describe("Oracle", () => {
  let wallet: Signer;
  let oracle: Contract;

  before(async () => {
    await provider.api.isReady;

    [wallet] = await provider.getWallets();
    oracle = new ethers.Contract(ADDRESS.Oracle, ORACLE_ABI, wallet as any);
  });

  after(async () => {
    provider.api.disconnect();
  });

  it("should show the current price with getPrice", async () => {
      await feedValues("ACA", BigNumber.from(12_345).mul(BigNumber.from(10).pow(18)).toString());
      expect(
        await oracle.getPrice(ADDRESS.ACA)
      ).to.equal(BigNumber.from(12_345).mul(BigNumber.from(10).pow(18)).toString());

      await feedValues("ACA", BigNumber.from(123_456).mul(BigNumber.from(10).pow(18)).toString());
      expect(
        await oracle.getPrice(ADDRESS.ACA)
      ).to.equal(BigNumber.from(123_456).mul(BigNumber.from(10).pow(18)).toString());

      await feedValues("AUSD", BigNumber.from(12_345).mul(BigNumber.from(10).pow(18)).toString());
      expect(
        await oracle.getPrice(ADDRESS.AUSD)
      ).to.equal(BigNumber.from(1).mul(BigNumber.from(10).pow(18)).toString());

      await feedValues("AUSD", BigNumber.from(123_456).mul(BigNumber.from(10).pow(18)).toString());
      expect(
        await oracle.getPrice(ADDRESS.AUSD)
      ).to.equal(BigNumber.from(1).mul(BigNumber.from(10).pow(18)).toString());

      await feedValues("DOT", BigNumber.from(12_345).mul(BigNumber.from(10).pow(18)).toString());
      expect(
        await oracle.getPrice(ADDRESS.DOT)
      ).to.equal(BigNumber.from(12_345).mul(BigNumber.from(10).pow(18)).toString());
      expect(
        await oracle.getPrice(ADDRESS.LDOT)
      ).to.equal(BigNumber.from(12_345).mul(BigNumber.from(10).pow(17)).toString());

      await feedValues("DOT", BigNumber.from(123_456).mul(BigNumber.from(10).pow(18)).toString());
      expect(
        await oracle.getPrice(ADDRESS.DOT)
      ).to.equal(BigNumber.from(123_456).mul(BigNumber.from(10).pow(18)).toString());
      expect(
        await oracle.getPrice(ADDRESS.LDOT)
      ).to.equal(BigNumber.from(123_456).mul(BigNumber.from(10).pow(17)).toString());

      await feedValues("RENBTC", BigNumber.from(12_345).mul(BigNumber.from(10).pow(18)).toString());
      expect(
        await oracle.getPrice(ADDRESS.RENBTC)
      ).to.equal(BigNumber.from(12_345).mul(BigNumber.from(10).pow(18)).toString());

      await feedValues("RENBTC", BigNumber.from(123_456).mul(BigNumber.from(10).pow(18)).toString());
      expect(
        await oracle.getPrice(ADDRESS.RENBTC)
      ).to.equal(BigNumber.from(123_456).mul(BigNumber.from(10).pow(18)).toString());

      await feedValues("KAR", BigNumber.from(12_345).mul(BigNumber.from(10).pow(18)).toString());
      expect(
        await oracle.getPrice(ADDRESS.KAR)
      ).to.equal(BigNumber.from(12_345).mul(BigNumber.from(10).pow(18)).toString());

      await feedValues("KAR", BigNumber.from(123_456).mul(BigNumber.from(10).pow(18)).toString());
      expect(
        await oracle.getPrice(ADDRESS.KAR)
      ).to.equal(BigNumber.from(123_456).mul(BigNumber.from(10).pow(18)).toString());

      await feedValues("KUSD", BigNumber.from(12_345).mul(BigNumber.from(10).pow(18)).toString());
      expect(
        await oracle.getPrice(ADDRESS.KUSD)
      ).to.equal(BigNumber.from(12_345).mul(BigNumber.from(10).pow(18)).toString());

      await feedValues("KUSD", BigNumber.from(123_456).mul(BigNumber.from(10).pow(18)).toString());
      expect(
        await oracle.getPrice(ADDRESS.KUSD)
      ).to.equal(BigNumber.from(123_456).mul(BigNumber.from(10).pow(18)).toString());

      await feedValues("KSM", BigNumber.from(12_345).mul(BigNumber.from(10).pow(18)).toString());
      expect(
        await oracle.getPrice(ADDRESS.KSM)
      ).to.equal(BigNumber.from(12_345).mul(BigNumber.from(10).pow(18)).toString());

      await feedValues("KSM", BigNumber.from(123_456).mul(BigNumber.from(10).pow(18)).toString());
      expect(
        await oracle.getPrice(ADDRESS.KSM)
      ).to.equal(BigNumber.from(123_456).mul(BigNumber.from(10).pow(18)).toString());

      await feedValues("LKSM", BigNumber.from(12_345).mul(BigNumber.from(10).pow(18)).toString());
      expect(
        await oracle.getPrice(ADDRESS.LKSM)
      ).to.equal(BigNumber.from(12_345).mul(BigNumber.from(10).pow(18)).toString());

      await feedValues("LKSM", BigNumber.from(123_456).mul(BigNumber.from(10).pow(18)).toString());
      expect(
        await oracle.getPrice(ADDRESS.LKSM)
      ).to.equal(BigNumber.from(123_456).mul(BigNumber.from(10).pow(18)).toString());
  });

  it("reverts when passing an address that is not system contract to Oracle", async () => {
    await expect(oracle.getPrice("0x123456789000000000000000000000000000000"))
      .to.be.reverted;
  });

  it("reverts when passing 0x0 to Oracle", async () => {
    await expect(oracle.getPrice("0x0000000000000000000000000000000000000000"))
      .to.be.reverted;
  });
});
