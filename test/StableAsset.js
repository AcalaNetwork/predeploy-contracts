const { createTestPairs } = require("@polkadot/keyring/testingPairs");
const { expect } = require("chai");
const { BigNumber, Contract } = require("ethers");
const {
  STABLE_ASSET,
  DOT,
  LDOT,
} = require("../contracts/utils/MandalaAddress");
const { getTestProvider } = require("./utils/utils");

const testPairs = createTestPairs();
const StableAssetABI =
  require("../artifacts/contracts/stable-asset/StableAsset.sol/StableAsset.json").abi;

const formatAmount = (amount) => {
  return amount.replace(/_/g, "");
};
const dollar = BigNumber.from(formatAmount("1_000_000_000_000"));

const send = async (extrinsic, sender) => {
  return new Promise(async (resolve) => {
    extrinsic.signAndSend(sender, (result) => {
      if (result.status.isFinalized || result.status.isInBlock) {
        resolve(undefined);
      }
    });
  });
};

describe("stable asset", () => {
  let stableAssetPredeployed;
  let provider;
  let deployer;
  let wallet;
  let walletTo;

  beforeEach(async function () {
    [deployer, user] = await ethers.getSigners();
    provider = await getTestProvider();
    [wallet, walletTo] = await provider.getWallets();
    stableAssetPredeployed = new Contract(
      STABLE_ASSET,
      StableAssetABI,
      deployer
    );
  });

  afterEach(async function () {
    provider.api.disconnect();
  });

  describe("getStableAsset functions", function () {
    it("stable asset get function works", async () => {
      expect(
        await stableAssetPredeployed.getStableAssetPoolTokens(0)
      ).to.deep.eq([false, []]);
      expect(
        (
          await stableAssetPredeployed.getStableAssetPoolTotalSupply(0)
        ).toString()
      ).to.deep.eq("false,0");
      expect(
        (await stableAssetPredeployed.getStableAssetPoolPrecision(0)).toString()
      ).to.deep.eq("false,0");
      expect(
        (await stableAssetPredeployed.getStableAssetPoolMintFee(0)).toString()
      ).to.deep.eq("false,0");
      expect(
        (await stableAssetPredeployed.getStableAssetPoolSwapFee(0)).toString()
      ).to.deep.eq("false,0");
      expect(
        (await stableAssetPredeployed.getStableAssetPoolRedeemFee(0)).toString()
      ).to.deep.eq("false,0");

      const poolAsset = { StableAssetPoolToken: 0 };
      const assets = [{ Token: "DOT" }, { Token: "LDOT" }];
      const precisions = [1, 1];
      const mintFee = 0;
      const swapFee = 25_000_000;
      const redeemFee = 30_000_000;
      const initialA = 3000;
      const feeRecipient = testPairs.alice.address;
      const yieldRecipient = testPairs.alice.address;
      const precision = 10_000_000_000;

      const createPool = provider.api.tx.sudo.sudo(
        provider.api.tx.stableAsset.createPool(
          poolAsset,
          assets,
          precisions,
          mintFee,
          swapFee,
          redeemFee,
          initialA,
          feeRecipient,
          yieldRecipient,
          precision
        )
      );
      await send(createPool, testPairs.alice.address);

      expect(
        await stableAssetPredeployed.getStableAssetPoolTokens(0)
      ).to.deep.eq([true, [DOT, LDOT]]);
      expect(
        (
          await stableAssetPredeployed.getStableAssetPoolTotalSupply(0)
        ).toString()
      ).to.deep.eq("true,0");
      expect(
        (await stableAssetPredeployed.getStableAssetPoolPrecision(0)).toString()
      ).to.deep.eq("true,10000000000");
      expect(
        (await stableAssetPredeployed.getStableAssetPoolMintFee(0)).toString()
      ).to.deep.eq("true,0");
      expect(
        (await stableAssetPredeployed.getStableAssetPoolSwapFee(0)).toString()
      ).to.deep.eq("true,25000000");
      expect(
        (await stableAssetPredeployed.getStableAssetPoolRedeemFee(0)).toString()
      ).to.deep.eq("true,30000000");
    });
  });

  describe("Stable asset signed calls work", function () {
    it("stable asset stableAssetMint/stableAssetRedeem/stableAssetSwap works", async () => {
      const substrateAddress = await wallet.getSubstrateAddress();

      const updateBalanceDOT = provider.api.tx.sudo.sudo(
        provider.api.tx.currencies.updateBalance(
          substrateAddress,
          { Token: "DOT" },
          dollar.mul(1_000_000)
        )
      );
      await send(updateBalanceDOT, testPairs.alice.address);

      const updateBalanceLDOT = provider.api.tx.sudo.sudo(
        provider.api.tx.currencies.updateBalance(
          substrateAddress,
          { Token: "LDOT" },
          dollar.mul(100_000_000_000)
        )
      );
      await send(updateBalanceLDOT, testPairs.alice.address);

      const assetRegistry = provider.api.tx.sudo.sudo(
        provider.api.tx.assetRegistry.registerStableAsset({
          name: "taiga DOT",
          symbol: "tDOT",
          decimals: 10,
          minimalBalance: 1,
        })
      );
      await send(assetRegistry, testPairs.alice.address);

      await expect(
        stableAssetPredeployed
          .connect(wallet)
          .stableAssetMint(0, [dollar.mul(1), dollar.mul(2)], 1)
      )
        .to.emit(stableAssetPredeployed, "StableAssetMinted")
        .withArgs(
          await wallet.getAddress(),
          0,
          [dollar.mul(1), dollar.mul(2)],
          1
        );

      await expect(
        stableAssetPredeployed
          .connect(wallet)
          .stableAssetRedeem(0, 500000, [1, 2])
      )
        .to.emit(stableAssetPredeployed, "StableAssetRedeemed")
        .withArgs(await wallet.getAddress(), 0, 500000, [1, 2]);

      await expect(
        stableAssetPredeployed
          .connect(wallet)
          .stableAssetSwap(0, 0, 1, 500000, 0, 2)
      )
        .to.emit(stableAssetPredeployed, "StableAssetSwapped")
        .withArgs(await wallet.getAddress(), 0, 0, 1, 500000, 0, 2);
    });
  });
});
