const { expect } = require('chai');
const { Contract, BigNumber } = require('ethers');
const { AUSD, DOT, ACA, HONZON } = require('../contracts/utils/MandalaAddress');

const HonzonContract = require('../artifacts/contracts/honzon/Honzon.sol/Honzon.json');
const TokenContract = require('../artifacts/contracts/token/Token.sol/Token.json');

describe('Honzon Contract', function () {
    let instance;
    let ACAinstance;
    let AUSDinstance;
    let deployer;
    let deployerAddress;

    beforeEach(async function () {
        [deployer] = await ethers.getSigners();
        deployerAddress = await deployer.getAddress();
        instance = new Contract(HONZON, HonzonContract.abi, deployer);
        ACAinstance = new Contract(AUSD, TokenContract.abi, deployer);
        AUSDinstance = new Contract(DOT, TokenContract.abi, deployer);
    });

    describe('Operation', function () {
        this.timeout(50000);

        describe('adjustLoan', function () {
            it('can add collateral successfully', async function () {
                expect(await instance.adjustLoan())
            });
        });

        describe('getLiquidationRatio',  function () {
            it('token that is not enabled as collateral returns zero', async function () {
                expect(await instance.getLiquidationRatio(AUSD)).to.be.equal(0);
            });

            it('returns liquidation ratio', async function () {
                expect(await instance.getLiquidationRatio(DOT)).to.be.equal(BigNumber.from('1500000000000000000'));
            });
        });

        describe('getDebitExchangeRate', function() {
            it('token will returns default of 0.1 if not initialized', async function () {
                expect(await instance.getDebitExchangeRate(ACA)).to.be.equal(BigNumber.from("100000000000000000"));
            });

            it('debit exchange rate is not the default for enabled collateral currency', async function () {
                expect(await instance.getDebitExchangeRate(DOT)).to.be.equal(BigNumber.from("100000000000000000"));
            });
        })
    });
});