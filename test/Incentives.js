const { expect } = require('chai');
const { Contract, BigNumber } = require('ethers');
const { INCENTIVES, LDOT, ACA, LP_DOT_AUSD, LP_ACA_AUSD } = require('../contracts/utils/MandalaAddress');
const { getTestProvider, testPairs } = require('./util/utils');

const IncentivesContract = require('../artifacts/contracts/incentives/Incentives.sol/Incentives.json');
const ERC20Contract = require('../artifacts/contracts/token/Token.sol/Token.json');
// Value of 0 represents loans and value of 1 represents dex
const PoolId = {
    Loans: 0,
    Dex: 1,
};

const NULL_ADDRESS = '0x0000000000000000000000000000000000000000';

const formatAmount = (amount) => {
  return amount.replace(/_/g, '');
};

const FixedU128 = BigNumber.from(formatAmount('1_000_000_000_000_000_000'));

describe('Incentives Contract', function () {
    let instance;
    let LDOTinstance;
    let deployer;
    let user;
    let deployerAddress;
    let provider;

    beforeEach(async function () {
        [deployer, user] = await ethers.getSigners();
        userAddress  =await user.getAddress();
        deployerAddress = await deployer.getAddress();
        provider = await getTestProvider();
        instance = new Contract(INCENTIVES, IncentivesContract.abi, deployer);
        LDOTinstance = new Contract(LDOT, ERC20Contract.abi, deployer);
    });

    describe("Incentive Tests", function () {
        this.timeout(100000);

        describe("getIncentiveRewardAmount", function () {
            it("works", async function () {
                await provider.api.tx.sudo.sudo(
                    provider.api.tx.incentives.updateIncentiveRewards([[{Loans: {Token: 'ACA'}}, [[{ Token: 'ACA' }, 100]]]])
                )
                .signAndSend(testPairs.alice.address);
                const rewardAmount = await instance.getIncentiveRewardAmount(PoolId.Loans, ACA, ACA);

                expect(rewardAmount).to.be.equal(100);
            });

            it("reverts when input bad PoolId Value", async function () {
                expect(await instance.getIncentiveRewardAmount(2, ACA, ACA)).to.be.reverted;
            });
        });

        describe("getDexRewardRate", function () {
            it('empty storage returns 0', async function () {
                const rewardRate = await instance.getDexRewardRate(LP_DOT_AUSD);

                expect(rewardRate).to.be.equal(0);
            });

            it("works", async function () {
                const Rate = FixedU128.div(BigNumber.from('10')); // 1/10
                await provider.api.tx.sudo.sudo(
                    provider.api.tx.incentives.updateDexSavingRewards([[{Dex: {DexShare: [{Token: 'ACA'}, {Token: 'AUSD'}]}}, Rate]])
                )
                .signAndSend(testPairs.alice.address);
                const rewardRate = await instance.getDexRewardRate(LP_ACA_AUSD);

                expect(rewardRate).to.be.equal(Rate);
            });

            it("null currency reverts", async function () {
                expect(await instance.getDexRewardRate(NULL_ADDRESS)).to.be.reverted;
            });
        });
    });
});
