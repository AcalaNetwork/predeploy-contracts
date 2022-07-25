const { expect } = require('chai');
const { Contract, BigNumber } = require('ethers');
const { AUSD, DOT, ACA, HONZON, LDOT } = require('../contracts/utils/MandalaAddress');
const { getTestProvider, feedTestOraclePrices} = require('./util/utils');

const HonzonContract = require('../artifacts/contracts/honzon/Honzon.sol/Honzon.json');

describe('Honzon Contract', function () {
    let instance;
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

            it('fails when trying to add too much debit', async function () {
                await expect(instance.connect(user).adjustLoan(LDOT, 100, 1_000_000_000_000))
                    .to.be.revertedWith("BelowRequiredCollateralRatio");
            })
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
            });


            it('gets open cdp postion correctly', async function () {
                // set position
                await instance.connect(user).adjustLoan(DOT, 100_000_000_000_000, 10_000_000_000_000);
                const response = await instance.getPosition(userAddress, DOT);
                const collateral = response[0];
                const debit = response[1];

                expect(collateral).to.be.equal(BigNumber.from("100000000000000"));
                expect(debit).to.be.equal(BigNumber.from("10000000000000"));
            });
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

        describe('getCurrentCollateralRatio', function () {
            it('returns max u128 for nonexistent storage', async function () {
                const response = await instance.getCurrentCollateralRatio(deployerAddress, ACA);

                // Returns max value for ratio of non existent storage so value is FixedU128::max_value
                expect(response).to.be.equal(BigNumber.from("0xffffffffffffffffffffffffffffffff"));
            });

            it('returns collateral ratio for cdp position', async function () {
                const response = await instance.getCurrentCollateralRatio(userAddress, DOT);

                // ratio of dot(priced as ausd) to ausd of open position. Is represented by FixedU128
                expect(response).to.be.equal(BigNumber.from("173870000000000000000000"));
            });
        });

        describe('getDebitExchangeRate', function () {
            it('token will returns default of 0.1', async function () {
                const response = await instance.getDebitExchangeRate(ACA);

                expect(response).to.be.equal(BigNumber.from("100000000000000000"));
            });
        })
    });
});
