const { expect } = require('chai');
const { Contract, BigNumber } = require('ethers');
const { INCENTIVES, LDOT, ACA, AUSD, LP_DOT_AUSD, LP_ACA_AUSD } = require('../contracts/utils/MandalaAddress');
const { getTestProvider, testPairs } = require('./utils/utils');

const IncentivesContract = require('../artifacts/contracts/incentives/Incentives.sol/Incentives.json');
const NULL_ADDRESS = '0x0000000000000000000000000000000000000000';

// Value of 0 represents loans and value of 1 represents dex
const PoolId = {
    Loans: 0,
    Dex: 1,
};

const formatAmount = (amount) => {
  return amount.replace(/_/g, '');
};

const FixedU128 = BigNumber.from(formatAmount('1_000_000_000_000_000_000'));

const send = async (extrinsic, sender) => {
  return new Promise(async (resolve) => {
    extrinsic.signAndSend(sender, (result) => {
      if (result.status.isFinalized || result.status.isInBlock) {
        resolve(undefined);
      }
    });
  });
};

describe('Incentives Contract', function () {
    let instance;
    let deployer;
    let user;
    let deployerAddress;
    let provider;
    let wallet;

    beforeEach(async function () {
        [deployer, user] = await ethers.getSigners();
        userAddress  =await user.getAddress();
        deployerAddress = await deployer.getAddress();
        provider = await getTestProvider();
        instance = new Contract(INCENTIVES, IncentivesContract.abi, deployer);
        [wallet] = await provider.getWallets();
    });

    describe("Incentive Tests", function () {
        this.timeout(100000);

        describe("getIncentiveRewardAmount", function () {
            it("works", async function () {
                const updateRewards = provider.api.tx.sudo.sudo(
                    provider.api.tx.incentives.updateIncentiveRewards([[{Loans: {Token: 'ACA'}}, [[{ Token: 'ACA' }, 100]]]])
                )
                await send(updateRewards, testPairs.alice.address);
                const rewardAmount = await instance.getIncentiveRewardAmount(PoolId.Loans, ACA, ACA);

                expect(rewardAmount).to.be.equal(100);
            });

            it("non existent reward is zero", function () {
                it("", async function () {
                    const rewardAmount = await instance.getIncentiveRewardAmount(PoolId.Loans, LDOT, ACA);

                    expect(rewardAmount).to.be.equal(0);
                });
            });

            // Hardhat errors out issue: https://github.com/AcalaNetwork/bodhi.js/issues/523
            /*it("reverts when input bad PoolId Value", async function () {
                expect(await instance.getIncentiveRewardAmount(2, ACA, ACA)).to.be.reverted;
            });*/
        });

        describe("getDexRewardRate", function () {
            it("empty storage returns 0", async function () {
                const rewardRate = await instance.getDexRewardRate(LP_DOT_AUSD);

                expect(rewardRate).to.be.equal(0);
            });

            it("works", async function () {
                const Rate = FixedU128.div(BigNumber.from('10')); // 1/10
                const updateRewards = provider.api.tx.sudo.sudo(
                    provider.api.tx.incentives.updateDexSavingRewards([[{Dex: {DexShare: [{Token: 'ACA'}, {Token: 'AUSD'}]}}, Rate]])
                )

                await send(updateRewards, testPairs.alice.address);
                const rewardRate = await instance.getDexRewardRate(LP_ACA_AUSD);

                expect(rewardRate).to.be.equal(Rate);
            });

            // Hardhat errors out issue: https://github.com/AcalaNetwork/bodhi.js/issues/523
            /*it("null currency reverts", async function () {
                expect(await instance.getDexRewardRate(NULL_ADDRESS)).to.be.reverted;
            });*/
        });

        describe("getClaimRewardDeductionRate", function () {
            it("empty storage returns 0", async function () {
                const rewardDeductionRate = await instance.getClaimRewardDeductionRate(PoolId.Dex, LP_DOT_AUSD);

                expect(rewardDeductionRate).to.be.equal(0);
            });

            it("works", async function () {
                const Rate = FixedU128.div(BigNumber.from('10')); // 1/10
                const updateRewards = provider.api.tx.sudo.sudo(
                    provider.api.tx.incentives.updateClaimRewardDeductionRates([[{Loans: {Token: 'ACA'}}, Rate]])
                )

                await send(updateRewards, testPairs.alice.address);
                const rewardDeductionRate = await instance.getClaimRewardDeductionRate(PoolId.Loans, ACA);

                expect(rewardDeductionRate).to.be.equal(Rate);
            });
        });

        describe("getPendingRewards", function () {
            it("empty storage returns 0", async function () {
                const Rate = FixedU128.div(BigNumber.from('10')); // 1/10
                const updateRewards = provider.api.tx.sudo.sudo(
                    provider.api.tx.incentives.updateClaimRewardDeductionRates([[{Loans: {Token: 'ACA'}}, Rate]])
                )
                await send(updateRewards, testPairs.alice.address);

                const pendingRewards = await instance.getPendingRewards([ACA, AUSD, LDOT], PoolId.Loans, ACA, userAddress);
                pendingRewards.forEach(element => {
                    expect(element).to.be.equal(0);
                });
            });

            it("returns values", async function () {
                const Rate = FixedU128.div(BigNumber.from('10')); // 1/10
                const updateRewardsDeduction = provider.api.tx.sudo.sudo(
                    provider.api.tx.incentives.updateClaimRewardDeductionRates([[{Dex: {DexShare: [{Token: 'ACA'}, {Token: 'AUSD'}]}}, Rate]])
                )
                await send(updateRewardsDeduction, testPairs.alice.address);

                const updateDexRewards = provider.api.tx.sudo.sudo(
                    provider.api.tx.incentives.updateDexSavingRewards([[{Dex: {DexShare: [{Token: 'ACA'}, {Token: 'AUSD'}]}}, Rate]])
                )
                await send(updateDexRewards, testPairs.alice.address);

                const updateBalance = provider.api.tx.sudo.sudo(
                    provider.api.tx.currencies.updateBalance(
                      { id: await wallet.getSubstrateAddress() },
                      {
                        DexShare: [{ Token: 'ACA' }, { Token: 'AUSD' }]
                      },
                      1_000_000_000_000_000
                    )
                );
                await send(updateBalance, testPairs.alice.address);

                await expect(instance.connect(wallet).depositDexShare(LP_ACA_AUSD, 1_000_000_000))
                    .to.emit(instance, 'DepositedShare')
                    .withArgs(wallet.getAddress, LP_ACA_AUSD, 1_000_000_000);

                for (let i = 0; i < 10; i++) {
                    await provider.api.rpc.engine.createBlock(true /* create empty */, true /* finalize it*/);
                }

                await expect(instance.connect(wallet).withdrawDexShare(LP_ACA_AUSD, 1_000_000_000))
                    .to.emit(instance, 'WithdrewShare')
                    .withArgs(wallet.getAddress, LP_ACA_AUSD, 1_000_000_000);

                /// Note will fail on second attempt need to reset state each time
                const pendingRewards = await instance.getPendingRewards([LP_ACA_AUSD, ACA, AUSD], PoolId.Dex, LP_ACA_AUSD, wallet.getAddress());
                expect(pendingRewards[0]).to.be.equal(0);
                expect(pendingRewards[1]).to.be.equal(0);
                expect(pendingRewards[2]).to.be.equal(BigNumber.from("400000000000000000"));

                await expect(instance.connect(wallet).claimRewards(PoolId.Dex, LP_ACA_AUSD))
                    .to.emit(instance, 'ClaimedRewards')
                    .withArgs(wallet.getAddress, PoolId.Dex, LP_ACA_AUSD);
            });
         });

        describe("depositDexShare", function () {
            it("works", async function () {
                const updateBalance = provider.api.tx.sudo.sudo(
                    provider.api.tx.currencies.updateBalance(
                      { id: await wallet.getSubstrateAddress() },
                      {
                        DexShare: [{ Token: 'ACA' }, { Token: 'AUSD' }]
                      },
                      1_000_000_000_000_000
                    )
                );
                await send(updateBalance, testPairs.alice.address);

                await expect(instance.connect(wallet).depositDexShare(LP_ACA_AUSD, 1_000_000_000))
                    .to.emit(instance, 'DepositedShare')
                    .withArgs(wallet.getAddress, LP_ACA_AUSD, 1_000_000_000);
            });
        });

        describe("withdrawDexShare", function () {
            it("works", async function () {
                const updateBalance = provider.api.tx.sudo.sudo(
                    provider.api.tx.currencies.updateBalance(
                      { id: await wallet.getSubstrateAddress() },
                      {
                        DexShare: [{ Token: 'ACA' }, { Token: 'AUSD' }]
                      },
                      1_000_000_000_000_000
                    )
                );
                await send(updateBalance, testPairs.alice.address);

                await expect(instance.connect(wallet).depositDexShare(LP_ACA_AUSD, 1_000_000_000))
                    .to.emit(instance, 'DepositedShare')
                    .withArgs(wallet.getAddress, LP_ACA_AUSD, 1_000_000_000);

                await expect(instance.connect(wallet).withdrawDexShare(LP_ACA_AUSD, 1_000_000_000))
                    .to.emit(instance, 'WithdrewShare')
                    .withArgs(wallet.getAddress, LP_ACA_AUSD, 1_000_000_000);
            });
        });

        describe("claimRewards", function () {
            it("works", async function () {
                const updateBalance = provider.api.tx.sudo.sudo(
                    provider.api.tx.currencies.updateBalance(
                      { id: await wallet.getSubstrateAddress() },
                      {
                        DexShare: [{ Token: 'ACA' }, { Token: 'AUSD' }]
                      },
                      1_000_000_000_000_000
                    )
                );
                await send(updateBalance, testPairs.alice.address);

                await expect(instance.connect(wallet).depositDexShare(LP_ACA_AUSD, 1_000_000_000))
                    .to.emit(instance, 'DepositedShare')
                    .withArgs(wallet.getAddress, LP_ACA_AUSD, 1_000_000_000);

                await expect(instance.connect(wallet).claimRewards(PoolId.Dex, LP_ACA_AUSD))
                    .to.emit(instance, 'ClaimedRewards')
                    .withArgs(wallet.getAddress, PoolId.Dex, LP_ACA_AUSD);
            });
        });
    });
});
