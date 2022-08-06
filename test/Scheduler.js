const { createTestPairs } = require("@polkadot/keyring/testingPairs");
const { expect } = require("chai");
const { Contract } = require("ethers");
const { ethers } = require("hardhat");
const { SCHEDULE, DOT } = require("../contracts/utils/MandalaAddress");
const { getTestProvider, sleep, nextBlock } = require("./utils/utils");

const testPairs = createTestPairs();

const SCHEDULER_ABI =
  require("../artifacts/contracts/schedule/Schedule.sol/Schedule.json").abi;
const ERC20_ABI =
  require("../artifacts/contracts/token/Token.sol/Token.json").abi;

describe("Schedule", () => {
  let schedule;
  let provider;
  let deployer;
  let user;
  let wallet;
  let walletTo;
  let instance;
  let DOTInstance;
  let erc20;

  beforeEach(async function () {
    [deployer, user] = await ethers.getSigners();
    provider = await getTestProvider();
    [wallet, walletTo] = await provider.getWallets();
    schedule = new Contract(SCHEDULE, SCHEDULER_ABI, wallet);
    instance = new Contract(SCHEDULE, SCHEDULER_ABI, deployer);
    DOTInstance = new Contract(DOT, ERC20_ABI, deployer);
    erc20 = new Contract(DOT, ERC20_ABI, walletTo);
  });

  it("schedule call", async () => {
    const tx = await erc20.populateTransaction.transfer(
      walletTo.getAddress(),
      1_000_000
    );
    const txData = ethers.utils.hexlify(tx.data.toString());
    //console.log(tx, txData);

    await schedule.scheduleCall(DOT, 0, 300000, 10000, 1, txData);
    const initialBalance = await DOTInstance.balanceOf(walletTo.getAddress());

    for (let i = 0; i < 5; i++) {
      await sleep(100);
      await nextBlock(i, provider);
    }

    const afterBalance = await DOTInstance.balanceOf(walletTo.getAddress());
    expect(afterBalance).to.be.equal(initialBalance.add(1000000));
  });

  it("cancel call", async () => {
    const tx = await erc20.populateTransaction.transfer(
      walletTo.getAddress(),
      1_000_000
    );
    const txData = ethers.utils.hexlify(tx.data.toString());
    //console.log(tx, txData);

    let iface = new ethers.utils.Interface(SCHEDULER_ABI);

    let current_block_number = Number(await provider.api.query.system.number());
    await schedule.scheduleCall(
      DOT,
      0,
      300000,
      10000,
      2,
      ethers.utils.hexlify(txData)
    );

    let block_hash = await provider.api.rpc.chain.getBlockHash(
      current_block_number + 1
    );
    const data = await provider.api.derive.tx.events(block_hash);

    let event = data.events.filter((item) =>
      provider.api.events.evm.Executed.is(item.event)
    );
    expect(event.length).above(0);

    let decode_log = iface.parseLog(
      event[event.length - 1].event.data.toJSON()[2][0]
    );

    await expect(
      instance
        .connect(wallet)
        .cancelCall(ethers.utils.hexlify(decode_log.args.taskId))
    )
      .to.emit(instance, "CanceledCall")
      .withArgs(
        await wallet.getAddress(),
        ethers.utils.hexlify(decode_log.args.taskId)
      );
  });

  it("reschedule call", async () => {
    const tx = await erc20.populateTransaction.transfer(
      walletTo.getAddress(),
      1_000_000
    );
    const txData = ethers.utils.hexlify(tx.data.toString());
    //console.log(tx, txData);

    let iface = new ethers.utils.Interface(SCHEDULER_ABI);

    let current_block_number = Number(await provider.api.query.system.number());
    await schedule.scheduleCall(DOT, 0, 300000, 10000, 2, txData);

    let block_hash = await provider.api.rpc.chain.getBlockHash(
      current_block_number + 1
    );
    const data = await provider.api.derive.tx.events(block_hash);

    let event = data.events.filter((item) =>
      provider.api.events.evm.Executed.is(item.event)
    );
    expect(event.length).above(0);

    let decode_log = iface.parseLog(
      event[event.length - 1].event.data.toJSON()[2][0]
    );
    await expect(
      instance
        .connect(wallet)
        .rescheduleCall(5, ethers.utils.hexlify(decode_log.args.taskId))
    )
      .to.emit(instance, "RescheduledCall")
      .withArgs(
        await wallet.getAddress(),
        ethers.utils.hexlify(decode_log.args.taskId)
      );
  });
});
