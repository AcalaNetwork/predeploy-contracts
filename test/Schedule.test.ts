import { expect, use } from "chai";
import { ethers, Contract } from "ethers";
import { solidity } from "ethereum-waffle";
import { evmChai } from "@acala-network/bodhi/evmChai";
import { TestProvider, Signer } from "@acala-network/bodhi";
import { WsProvider } from "@polkadot/api";
import { createTestPairs } from "@polkadot/keyring/testingPairs";
import ADDRESS from "@acala-network/contracts/utils/Address";

use(solidity);
use(evmChai);

const provider = new TestProvider({
  provider: new WsProvider("ws://127.0.0.1:9944"),
});

const testPairs = createTestPairs();

const empty_block = async (block_number: number) => {
  return new Promise((resolve) => {
    provider.api.tx.system.remark(block_number.toString(16)).signAndSend(testPairs.alice.address, (result) => {
      if (result.status.isInBlock) {
        resolve(undefined);
      }
    });
  });
};

const SCHEDULE_ABI = require("../build/Schedule.json").abi;
const DEX_ABI = require("../build/DEX.json").abi;
const ERC20_ABI = require("../build/Token.json").abi;

describe("Schedule", () => {
  let wallet: Signer;
  let walletTo: Signer;
  let schedule: Contract;
  let dex: Contract;
  let tokenDOT: Contract;
  let tokenAUSD: Contract;

  before(async () => {
    await provider.api.isReady;

    [wallet, walletTo] = await provider.getWallets();
    schedule = new ethers.Contract(ADDRESS.Schedule, SCHEDULE_ABI, wallet);
    dex = new ethers.Contract(ADDRESS.DEX, DEX_ABI, wallet as any);
    tokenDOT = new ethers.Contract(ADDRESS.DOT, ERC20_ABI, wallet as any);
    tokenAUSD = new ethers.Contract(ADDRESS.AUSD, ERC20_ABI, wallet as any);
  });

  after(async () => {
    provider.api.disconnect();
  });

  it("emits ScheduledCall event when scheduling a call", async () => {
    const call = await dex.populateTransaction.swapWithExactSupply([ADDRESS.DOT, ADDRESS.AUSD], 100, 1);

    await expect(schedule.scheduleCall(ADDRESS.DEX, 0, 300000, 10000, 1, ethers.utils.hexlify(call.data as string)))
      .to.emit(schedule, "ScheduledCall");
  });

  it("returns a hexadecimal value corresponding to task_id when scheduling a call", async () => {
    const call = await dex.populateTransaction.swapWithExactSupply([ADDRESS.DOT, ADDRESS.AUSD], 100, 1);
    const result = await schedule.callStatic.scheduleCall(ADDRESS.DEX, 0, 300000, 10000, 1, ethers.utils.hexlify(call.data as string));

    expect(result.length).to.equal(84);
    expect(result.substring(0,2)).to.equal("0x");
  });

  it("executes a scheduled call", async () => {
    const target_block_number = Number(await provider.api.query.system.number()) + 2;

    const initial_balance_DOT = await tokenDOT.balanceOf(await wallet.getAddress());
    const initial_balance_AUSD = await tokenAUSD.balanceOf(await wallet.getAddress());
    const call = await dex.populateTransaction.swapWithExactSupply([ADDRESS.DOT, ADDRESS.AUSD], 1000, 1);

    await schedule.scheduleCall(ADDRESS.DEX, 0, 300000, 10000, 1, ethers.utils.hexlify(call.data as string));

    let current_block_number = Number(await provider.api.query.system.number());

    while (current_block_number < target_block_number) {
      await empty_block(current_block_number);
      current_block_number = Number(await provider.api.query.system.number());
    };

    const final_balance_DOT = await tokenDOT.balanceOf(await wallet.getAddress());
    const final_balance_AUSD = await tokenAUSD.balanceOf(await wallet.getAddress());

    expect(final_balance_DOT).to.be.below(initial_balance_DOT);
    expect(final_balance_AUSD).to.be.above(initial_balance_AUSD);
  });

  it("executes a scheduled call only once", async () => {
    const first_target_block_number = Number(await provider.api.query.system.number()) + 3;
    const second_target_block_number = Number(await provider.api.query.system.number()) + 5;

    const call = await dex.populateTransaction.swapWithExactSupply([ADDRESS.DOT, ADDRESS.AUSD], 1000, 1);

    await schedule.scheduleCall(ADDRESS.DEX, 0, 300000, 10000, 1, ethers.utils.hexlify(call.data as string));

    let current_block_number = Number(await provider.api.query.system.number());

    while (current_block_number < first_target_block_number) {
      await empty_block(current_block_number);
      current_block_number = Number(await provider.api.query.system.number());
    };

    const initial_balance_DOT = await tokenDOT.balanceOf(await wallet.getAddress());
    const initial_balance_AUSD = await tokenAUSD.balanceOf(await wallet.getAddress());

    while (current_block_number < second_target_block_number) {
      await empty_block(current_block_number);
      current_block_number = Number(await provider.api.query.system.number());
    };


    const final_balance_DOT = await tokenDOT.balanceOf(await wallet.getAddress());
    const final_balance_AUSD = await tokenAUSD.balanceOf(await wallet.getAddress());

    expect(final_balance_DOT).to.equal(initial_balance_DOT);
    expect(final_balance_AUSD).to.equal(initial_balance_AUSD);
  });

  it("doesn't execute a scheduled call before the min_delay has passed", async () => {
    const target_block_number = Number(await provider.api.query.system.number()) + 1;

    const call = await dex.populateTransaction.swapWithExactSupply([ADDRESS.DOT, ADDRESS.AUSD], 1000, 1);
    const initial_balance_DOT = await tokenDOT.balanceOf(await wallet.getAddress());
    const initial_balance_AUSD = await tokenAUSD.balanceOf(await wallet.getAddress());

    await schedule.scheduleCall(ADDRESS.DEX, 0, 300000, 10000, 2, ethers.utils.hexlify(call.data as string));

    let current_block_number = Number(await provider.api.query.system.number());

    while (current_block_number < target_block_number) {
      await empty_block(current_block_number);
      current_block_number = Number(await provider.api.query.system.number());
    };

    const final_balance_DOT = await tokenDOT.balanceOf(await wallet.getAddress());
    const final_balance_AUSD = await tokenAUSD.balanceOf(await wallet.getAddress());

    expect(final_balance_DOT).to.equal(initial_balance_DOT);
    expect(final_balance_AUSD).to.equal(initial_balance_AUSD);
  });

  it("emits CanceledCall event when cancelling a call and doesn't execute it", async () => {
    const call = await dex.populateTransaction.swapWithExactSupply([ADDRESS.DOT, ADDRESS.AUSD], 100, 1);
    const initial_balance = await tokenDOT.balanceOf(await wallet.getAddress());
    let current_block_number = Number(await provider.api.query.system.number());
    const target_block_number = Number(await provider.api.query.system.number()) + 5;
    let iface = new ethers.utils.Interface(SCHEDULE_ABI);

    await schedule.scheduleCall(ADDRESS.DOT, 0, 300000, 10000, 5, ethers.utils.hexlify(call.data as string));

    let block_hash = await provider.api.query.system.blockHash(current_block_number);
    const data = await provider.api.derive.tx.events(block_hash);
    let event = data.events.filter(item => item.event.data.some(data => data.address == ADDRESS.Schedule && data.topics[0] == iface.getEventTopic(iface.getEvent("ScheduledCall"))));

    if (event.length > 0) {
      let log = {
        topics: [event[0].event.data[0].topics[0].toString(), event[0].event.data[0].topics[1].toString(), event[0].event.data[0].topics[2].toString()], data: event[0].event.data[0].data.toString()
      };
      let decode_log = await iface.parseLog(log);
      await expect(schedule.cancelCall(ethers.utils.hexlify(decode_log.args.task_id)))
        .to.emit(schedule, "CanceledCall")
        .withArgs(await wallet.getAddress(), ethers.utils.hexlify(decode_log.args.task_id));
    } else {
      expect(false).to.be.ok;
    };

    while (current_block_number < target_block_number) {
      await empty_block(current_block_number);
      current_block_number = Number(await provider.api.query.system.number());
    };

    const final_balance = await tokenDOT.balanceOf(await wallet.getAddress());

    expect(final_balance).to.equal(initial_balance);
  });

  it("emits RescheduledCall event when rescheduling a call and executes it at a new time", async () => {
    const call = await dex.populateTransaction.swapWithExactSupply([ADDRESS.DOT, ADDRESS.AUSD], 200, 1);
    const first_target_block_number = Number(await provider.api.query.system.number()) + 5;
    const second_target_block_number = Number(await provider.api.query.system.number()) + 10;
    let iface = new ethers.utils.Interface(SCHEDULE_ABI);

    let current_block_number = Number(await provider.api.query.system.number());
    await schedule.scheduleCall(ADDRESS.DOT, 0, 300000, 10000, 5, ethers.utils.hexlify(call.data as string));

    let block_hash = await provider.api.query.system.blockHash(current_block_number);
    const data = await provider.api.derive.tx.events(block_hash);
    let event = data.events.filter(item => item.event.data.some(data => data.address == ADDRESS.Schedule && data.topics[0] == iface.getEventTopic(iface.getEvent("ScheduledCall"))));

    if (event.length > 0) {
      let log = {
        topics: [event[0].event.data[0].topics[0].toString(), event[0].event.data[0].topics[1].toString(), event[0].event.data[0].topics[2].toString()], data: event[0].event.data[0].data.toString()
      };
      let decode_log = await iface.parseLog(log);
      await expect(schedule.rescheduleCall(7, ethers.utils.hexlify(decode_log.args.task_id)))
        .to.emit(schedule, "RescheduledCall")
        .withArgs(await wallet.getAddress(), ethers.utils.hexlify(decode_log.args.task_id));
    } else {
      expect(false).to.be.ok;
    };

    while (current_block_number < first_target_block_number) {
      await empty_block(current_block_number);
      current_block_number = Number(await provider.api.query.system.number());
    };

    const initial_balance = await tokenDOT.balanceOf(await wallet.getAddress());

    while (current_block_number < second_target_block_number) {
      await empty_block(current_block_number);
      current_block_number = Number(await provider.api.query.system.number());
    };

    const final_balance = await tokenDOT.balanceOf(await wallet.getAddress());

    expect(final_balance).to.not.be.below(initial_balance);
  });
});
