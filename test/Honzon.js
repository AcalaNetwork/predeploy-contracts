const { expect } = require('chai');
const { Contract, BigNumber } = require('ethers');
const { AUSD, DOT, ACA, HONZON } = require('../contracts/utils/MandalaAddress');
const { getTestProvider, feedTestOraclePrices} = require('./utils');

const HonzonContract = require('../artifacts/contracts/honzon/Honzon.sol/Honzon.json');
const TokenContract = require('../artifacts/contracts/token/Token.sol/Token.json');

describe('Honzon Contract', function () {
    let instance;
    let DOTinstance;
    let AUSDinstance;
    let deployer;
    let user;
    let deployerAddress;
    let provider;

    beforeEach(async function () {
        [deployer, user] = await ethers.getSigners();
        userAddress  =await user.getAddress();
        deployerAddress = await deployer.getAddress();
        provider = await getTestProvider();
        await feedTestOraclePrices(provider);
        instance = new Contract(HONZON, HonzonContract.abi, deployer);
        AUSDinstance = new Contract(AUSD, TokenContract.abi, deployer);
        DOTinstance = new Contract(DOT, TokenContract.abi, deployer);
    });

    describe('Operation', function () {
        this.timeout(100000);

        describe('adjustLoan', function () {
            it('can add collateral successfully', async function () {
                await expect(instance.connect(user).adjustLoan(DOT, 10_000_000_000, 0))
                    .to.emit(instance, 'AdjustedLoan')
                    .withArgs(userAddress, DOT, 10_000_000_000, 0);

               await expect(instance.connect(user).adjustLoan(DOT, 100_000_000_000_000, 10_000_000_000_000))
                    .to.emit(instance, 'AdjustedLoan')
                    .withArgs(userAddress, DOT, 100_000_000_000_000, 10_000_000_000_000);

            });
        });

        describe('closeLoanByDex', function () {
            it('can close loan by dex', async function () {
                await expect(instance.connect(user).closeLoanByDex(DOT, 100_000_000_000_000))
                    .to.emit(instance, 'ClosedLoanByDex')
                    .withArgs(userAddress, DOT);
            });

            it('fails to close empty position', async function () {
                await expect(instance.connect(user).closeLoanByDex(ACA, 100_000_000_000_000))
                    .to.be.revertedWith("NoDebitValue");


            });
        })

        describe('getPosition', function () {
            it('getPosition returns (0,0) for nonexistent storage', async function () {
                const response = await instance.getPosition(deployerAddress, ACA);

                const collateral = response[0];
                const debit = response[1];

                expect(collateral).to.be.equal(BigNumber.from("0"));
                expect(debit).to.be.equal(BigNumber.from("0"));
            })

        })

        describe('getLiquidationRatio',  function () {
            it('token that is not enabled as collateral returns zero', async function () {
                const response = await instance.getLiquidationRatio(AUSD);

                expect(response).to.be.equal(0);
            });

            it('returns liquidation ratio', async function () {
                const response = await instance.getLiquidationRatio(DOT);

                expect(response).to.be.equal(BigNumber.from('1500000000000000000'));
            });
        });

        describe('getDebitExchangeRate', function() {
            it('token will returns default of 0.1 if not initialized', async function () {
                const response = await instance.getDebitExchangeRate(ACA);

                expect(response).to.be.equal(BigNumber.from("100000000000000000"));
            });

            it('debit exchange rate is not the default for enabled collateral currency', async function () {
                const response = await instance.getDebitExchangeRate(DOT);

                expect(response).to.be.equal(BigNumber.from("100000000000000000"));
            });
        })
    });
});