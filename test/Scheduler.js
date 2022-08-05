const { createTestPairs } = require('@polkadot/keyring/testingPairs');
const { expect } = require('chai');
const { BigNumber, Contract } = require('ethers');
const { SCHEDULE, DOT, LDOT, } = require('../contracts/utils/MandalaAddress');
const { getTestProvider } = require('./utils/utils');

const testPairs = createTestPairs();
const next_block = async (block_number) => {
  return new Promise((resolve) => {
    provider.api.tx.system.remark(block_number.toString(16)).signAndSend(testPairs.alice.address, (result) => {
      if (result.status.isFinalized || result.status.isInBlock) {
        resolve(undefined);
      }
    });
  });
};

const SCHEDULER_ABI = require('../artifacts/contracts/schedule/Schedule.sol/Schedule.json').abi;
const ERC20_ABI = require('../artifacts/contracts/token/Token.sol/Token.json').abi;

describe('Schedule', () => {
    let instance;
    let provider;
    let deployer;
    let user;
    let deployerAddress;

    beforeEach(async function () {
        [deployer, user] = await ethers.getSigners();
        deployerAddress = await deployer.getAddress();
        provider = await getTestProvider();
        instance = new Contract(SCHEDULE, SCHEDULER_ABI, deployer);
        DOTInstance = new Contract(DOT, ERC20_ABI, deployer);
    });

    it('schedule call', async () => {
        const tx = DOTInstance.connect(user).transfer(deployerAddress, 1_000_000);
        await expect(instance.connect(deployer).scheduleCall(DOT, 0, 300000, 10000, 2, ethers.utils.hexlify(tx.data)))
            .to.emit(instance, "ScheduledCall")
            .withArgs(deployerAddress, DOT, 0)
    });

    it('cancel call', async () => {

    });

    it('reschedule call', () => {

    });
});