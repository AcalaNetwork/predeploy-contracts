const { createTestPairs } = require("@polkadot/keyring/testingPairs");
const { expect } = require("chai");
const { BigNumber, Contract } = require("ethers");
const { SCHEDULE, DOT, LDOT } = require("../contracts/utils/MandalaAddress");
const { getTestProvider } = require("./utils/utils");

const testPairs = createTestPairs();

const SCHEDULER_ABI =
  require("../artifacts/contracts/schedule/Schedule.sol/Schedule.json").abi;
const ERC20_ABI =
  require("../artifacts/contracts/token/Token.sol/Token.json").abi;

describe("Schedule", () => {
  let instance;
  let provider;
  let deployer;
  let user;
  let deployerAddress;
  let userAddress;
  let next_block;

  beforeEach(async function () {
    [deployer, user] = await ethers.getSigners();
    deployerAddress = await deployer.getAddress();
    userAddress = await deployer.getAddress();
    provider = await getTestProvider();
    instance = new Contract(SCHEDULE, SCHEDULER_ABI, deployer);
    DOTInstance = new Contract(DOT, ERC20_ABI, deployer);

    next_block = async (block_number) => {
      return new Promise((resolve) => {
        provider.api.tx.system
          .remark(block_number.toString(16))
          .signAndSend(testPairs.alice.address, (result) => {
            if (result.status.isFinalized || result.status.isInBlock) {
              resolve(undefined);
            }
          });
      });
    };
  });

  it("schedule call", async () => {
    const tx = await DOTInstance.connect(deployer).transfer(
      userAddress,
      1_000_000_000
    );
    await instance
      .connect(deployer)
      .scheduleCall(DOT, 0, 300000, 10000, 2, ethers.utils.hexlify(tx.data));
    const initialBalance = await DOTInstance.balanceOf(userAddress);
    let current_block_number = await provider.api.query.system.number();
    const target_block_number = current_block_number + 5;

    while (current_block_number < target_block_number) {
      await next_block(current_block_number);
      current_block_number = await provider.api.query.system.number();
    }

    const afterBalance = await DOTInstance.balanceOf(userAddress);
    expect(afterBalance).to.be.equal(initialBalance.add(1000000));
  });

  it("cancel call", async () => {});

  it("reschedule call", () => {});
});
