const { expect } = require("chai");
const { Contract, BigNumber } = require("ethers");
const { HOMA, LDOT } = require("../contracts/utils/MandalaAddress");
const { getTestProvider, testPairs } = require("./utils/utils");

const HomaContract = require("../artifacts/contracts/homa/Homa.sol/Homa.json");
const ERC20Contract = require("../artifacts/contracts/token/Token.sol/Token.json");

describe("Homa Contract", function () {
  let instance;
  let LDOTinstance;
  let deployer;
  let user;
  let deployerAddress;
  let provider;

  beforeEach(async function () {
    [deployer, user] = await ethers.getSigners();
    userAddress = await user.getAddress();
    deployerAddress = await deployer.getAddress();
    provider = await getTestProvider();
    instance = new Contract(HOMA, HomaContract.abi, deployer);
    LDOTinstance = new Contract(LDOT, ERC20Contract.abi, deployer);

    // update homa params
    await provider.api.tx.sudo
      .sudo(
        provider.api.tx.homa.updateHomaParams(
          1_000_000_000_000_000,
          BigNumber.from("100000000000000000"),
          BigNumber.from("100000000000000000"),
          BigNumber.from("100000000000000000")
        )
      )
      .signAndSend(testPairs.alice.address);
  });

  describe("HomaTests", function () {
    this.timeout(100000);

    describe("mint", function () {
      it("reverts when mint amount is zero", async function () {
        await expect(instance.connect(user).mint(0)).to.be.revertedWith(
          "Homa: mintAmount is zero"
        );
      });

      it("reverts when mint amount is too low", async function () {
        await expect(instance.connect(user).mint(1)).to.be.revertedWith(
          "BelowMintThreshold"
        );
      });

      it("mint works", async function () {
        const amount = 100_000_000_000;
        const initialBalance = await LDOTinstance.balanceOf(userAddress);

        await expect(instance.connect(user).mint(amount))
          .to.emit(instance, "Minted")
          .withArgs(userAddress, amount);

        const afterMintBalance = await LDOTinstance.balanceOf(userAddress);
        expect(afterMintBalance - initialBalance).to.be.above(0);
      });
    });

    describe("requestRedeem", function () {
      it("reverts when redeemAmount is zero", async function () {
        await expect(
          instance.connect(user).requestRedeem(0, false)
        ).to.be.revertedWith("Homa: redeemAmount is zero");
      });

      it("reverts when redeemAmount is to small", async function () {
        await expect(
          instance.connect(user).requestRedeem(100, true)
        ).to.be.revertedWith("BelowRedeemThreshol");
      });

      it("request redeem works", async function () {
        const amount = 100_000_000_000;
        const fastMatch = false;
        const initialBalance = await LDOTinstance.balanceOf(userAddress);

        await expect(instance.connect(user).requestRedeem(amount, fastMatch))
          .to.emit(instance, "RequestedRedeem")
          .withArgs(userAddress, amount, fastMatch);

        const afterRedeemBalance = await LDOTinstance.balanceOf(userAddress);
        // Note: This check will only work once before state has to be reset
        expect(initialBalance - afterRedeemBalance).to.be.equal(amount);
      });
    });

    describe("getExchangeRate", function () {
      it("gets exchange rate", async function () {
        const rate = await instance.getExchangeRate();
        // The exchange rate of (staking:liquid) starts as 1/10
        expect(rate).to.be.equal(BigNumber.from("100000000000000000"));
      });
    });

    describe("getEstimatedRewardRate", function () {
      it("gets estimated reward rate", async function () {
        const rate = await instance.getEstimatedRewardRate();
        expect(rate).to.be.equal(BigNumber.from("100000000000000000"));
      });
    });

    describe("getCommissionRate", function () {
      it("get commission rate", async function () {
        const rate = await instance.getCommissionRate();
        expect(rate).to.be.equal(BigNumber.from("100000000000000000"));
      });
    });

    describe("getFastMatchFee", function () {
      it("get fast match fee", async function () {
        const rate = await instance.getFastMatchFee();
        expect(rate).to.be.equal(BigNumber.from("100000000000000000"));
      });
    });
  });
});
