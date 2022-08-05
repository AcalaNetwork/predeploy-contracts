const { createTestPairs } = require("@polkadot/keyring/testingPairs");
const { expect } = require("chai");
const { Contract } = require("ethers");
const { EVM_ACCOUNTS } = require("../contracts/utils/MandalaAddress");
const { getTestProvider } = require("./utils/utils");
const { Keyring } = require("@polkadot/keyring");
const { randomAsHex, blake2AsU8a } = require("@polkadot/util-crypto");
const {
  hexToU8a,
  u8aConcat,
  stringToU8a,
  u8aToHex,
} = require("@polkadot/util");

const testPairs = createTestPairs();
const EVMAccountsABI =
  require("../artifacts/contracts/evm-accounts/EVMAccounts.sol/EVMAccounts.json").abi;

describe("EVM Accounts", () => {
  let deployer;
  let user;
  let wallet;
  let walletTo;
  let evmAccountsPredeployed;
  let provider;

  beforeEach(async function () {
    provider = await getTestProvider();
    [deployer, user] = await ethers.getSigners();
    [wallet, walletTo] = await provider.getWallets();
    evmAccountsPredeployed = new Contract(
      EVM_ACCOUNTS,
      EVMAccountsABI,
      deployer
    );
  });

  it("evm accounts works", async () => {
    const evmAddress = ethers.Wallet.createRandom().address;
    const evmAccountId = await evmAccountsPredeployed.getAccountId(evmAddress);

    const keyring = new Keyring();
    const randomMini = randomAsHex(32);
    const randPublicKey = u8aToHex(
      keyring.createFromUri(`${randomMini}//hard`).addressRaw
    );
    const alicePublicKey = u8aToHex(testPairs.alice.addressRaw);

    expect(
      (await evmAccountsPredeployed.getEvmAddress(evmAccountId)).toString()
    ).to.equal(evmAddress);

    // mapped
    expect(
      (await evmAccountsPredeployed.getEvmAddress(alicePublicKey)).toString()
    ).to.equal("0x82A258cb20E2ADB4788153cd5eb5839615EcE9a0");

    // mapped revert
    await expect(
      evmAccountsPredeployed.claimDefaultEvmAddress(alicePublicKey)
    ).to.be.revertedWith("AccountIdHasMapped");

    // not mapped return 0x0 address
    expect(
      (await evmAccountsPredeployed.getEvmAddress(randPublicKey)).toString()
    ).to.equal("0x0000000000000000000000000000000000000000");

    await evmAccountsPredeployed.claimDefaultEvmAddress(randPublicKey);

    // let payload = (b"evm:", account_id);
    // EvmAddress::from_slice(&payload.using_encoded(blake2_256)[0..20])
    const address = blake2AsU8a(
      u8aConcat(stringToU8a("evm:"), randPublicKey),
      256
    );
    expect(
      (await evmAccountsPredeployed.getEvmAddress(randPublicKey))
        .toString()
        .toLocaleUpperCase()
    ).to.equal(
      u8aToHex(address.subarray(0, 20)).toString().toLocaleUpperCase()
    );
  });

  it("evm accounts in solidity works", async () => {
    const evmAddress = ethers.Wallet.createRandom().address;
    const evmAccountId = await evmAccountsPredeployed.getAccountId(evmAddress);

    const keyring = new Keyring();
    const randomMini = randomAsHex(32);
    const randPublicKey = u8aToHex(
      keyring.createFromUri(`${randomMini}//hard`).addressRaw
    );
    const alicePublicKey = u8aToHex(testPairs.alice.addressRaw);

    expect(
      (await evmAccountsPredeployed.getEvmAddress(evmAccountId)).toString()
    ).to.equal(evmAddress);

    // mapped
    expect(
      (await evmAccountsPredeployed.getEvmAddress(alicePublicKey)).toString()
    ).to.equal("0x82A258cb20E2ADB4788153cd5eb5839615EcE9a0");

    // mapped revert
    await expect(
      evmAccountsPredeployed.claimDefaultEvmAddress(alicePublicKey)
    ).to.be.revertedWith("AccountIdHasMapped");

    // not mapped return 0x0 address
    expect(
      (await evmAccountsPredeployed.getEvmAddress(randPublicKey)).toString()
    ).to.equal("0x0000000000000000000000000000000000000000");

    await evmAccountsPredeployed.claimDefaultEvmAddress(randPublicKey);

    // let payload = (b"evm:", account_id);
    // EvmAddress::from_slice(&payload.using_encoded(blake2_256)[0..20])
    const address = blake2AsU8a(
      u8aConcat(stringToU8a("evm:"), randPublicKey),
      256
    );
    expect(
      (await evmAccountsPredeployed.getEvmAddress(randPublicKey))
        .toString()
        .toLocaleUpperCase()
    ).to.equal(
      u8aToHex(address.subarray(0, 20)).toString().toLocaleUpperCase()
    );
  });
});
