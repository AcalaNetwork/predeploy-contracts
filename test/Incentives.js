const { expect } = require('chai');
const { Contract, BigNumber } = require('ethers');
const { INCENTIVES, LDOT, ACA } = require('../contracts/utils/MandalaAddress');
const { getTestProvider, testPairs } = require('./util/utils');

const IncentivesContract = require('../artifacts/contracts/incentives/Incentives.sol/Incentives.json');
const ERC20Contract = require('../artifacts/contracts/token/Token.sol/Token.json');
const { idText } = require('typescript');
// Value of 0 represents loans and value of 1 represents dex
const PoolId = {
    Loans: 0,
    Dex: 1,
};

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
                const rewardAmount = await instance.getIncentiveRewardAmount(PoolId.Loans, ACA, ACA);

                expect(rewardAmount).to.be.equal(100);
            });
        });
    });
});
