const { createTestPairs } = require('@polkadot/keyring/testingPairs');
const { expect } = require('chai');
const { Contract, BigNumber } = require('ethers');
const { RENBTC, DOT, AUSD, LP_ACA_AUSD, ORACLE} = require('../contracts/utils/MandalaAddress');
const { getTestProvider } = require('./utils/utils');

const testPairs = createTestPairs();
const OracleABI = require('../artifacts/contracts/oracle/Oracle.sol/Oracle.json').abi;

describe('Prices', () => {
  let prices;
  let deployer;
  let user;
  let provider;
  let feedValues;

  beforeEach(async function () {
    provider = await getTestProvider();
    [deployer, user] = await ethers.getSigners();
    prices = new Contract(ORACLE, OracleABI, deployer);

    feedValues = async (token, price) => {
        return new Promise((resolve) => {
            provider.api.tx.acalaOracle
            .feedValues([[{ Token: token }, price]])
            .signAndSend(testPairs.alice.address, (result) => {
                if (result.status.isFinalized || result.status.isInBlock) {
                resolve(undefined);
                }
            });
        });
    };
  });

  it('getPrice works', async () => {
    await feedValues('RENBTC', BigNumber.from(34_500).mul(BigNumber.from(10).pow(18)).toString());
    expect(await prices.getPrice(RENBTC)).to.equal(
      BigNumber.from(34_500).mul(BigNumber.from(10).pow(18)).toString()
    );

    await feedValues('RENBTC', BigNumber.from(33_800).mul(BigNumber.from(10).pow(18)).toString());
    expect(await prices.getPrice(RENBTC)).to.equal(
      BigNumber.from(33_800).mul(BigNumber.from(10).pow(18)).toString()
    );

    await feedValues('DOT', BigNumber.from(15).mul(BigNumber.from(10).pow(18)).toString());
    expect(await prices.getPrice(DOT)).to.equal(BigNumber.from(15).mul(BigNumber.from(10).pow(18)).toString());

    await feedValues('DOT', BigNumber.from(16).mul(BigNumber.from(10).pow(18)).toString());
    expect(await prices.getPrice(DOT)).to.equal(BigNumber.from(16).mul(BigNumber.from(10).pow(18)).toString());

    expect(await prices.getPrice(AUSD)).to.equal(BigNumber.from(1).mul(BigNumber.from(10).pow(18)).toString());

    expect(await prices.getPrice(LP_ACA_AUSD)).to.equal(0);
  });

  it('ignores invalid address as CurrencyId::erc20', async () => {
    // not system contract
    expect(await prices.getPrice('0x1000000000000000000000000000000000000000')).to.equal(0);
    // Zero address
    await expect(prices.getPrice('0x0000000000000000000000000000000000000000')).to.be.reverted;
  });
});