const { expect } = require('chai');
const { Contract, BigNumber } = require('ethers');
const { HOMA, LDOT } = require('../contracts/utils/MandalaAddress');
const { getTestProvider, testPairs } = require('./util/utils');

const HomaContract = require('../artifacts/contracts/homa/Homa.sol/Homa.json');
const ERC20Contract = require('../artifacts/contracts/token/Token.sol/Token.json');
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
        instance = new Contract(HOMA, HomaContract.abi, deployer);
        LDOTinstance = new Contract(LDOT, ERC20Contract.abi, deployer);
    });

    describe("getIncentivesRewardAmount", async function () {

    })
});
