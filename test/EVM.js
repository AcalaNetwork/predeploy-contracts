const { expect } = require('chai');
const { Contract, BigNumber, Wallet } = require('ethers');
const { EVM } = require('../contracts/utils/MandalaAddress');

const { txParams } = require('./utils/transactionHelper');

const EVMContract = require('../artifacts/contracts/evm/EVM.sol/EVM.json');
const TokenContract = require('../artifacts/contracts/token/Token.sol/Token.json');
const NULL_ADDRESS = '0x0000000000000000000000000000000000000000';

describe('EVM contract', function () {
  let instance;
  let contract;
  let deployer;
  let user;
  let deployerAddress;
  let userAddress;

  beforeEach(async function () {
    const ethParams = await txParams();
    [deployer, user] = await ethers.getSigners();
    deployerAddress = await deployer.getAddress();
    userAddress = await user.getAddress();
    instance = new Contract(EVM, EVMContract.abi, deployer);
    const Token = new ethers.ContractFactory(TokenContract.abi, TokenContract.bytecode, deployer);
    contract = await Token.deploy({
      gasPrice: ethParams.txGasPrice,
      gasLimit: ethParams.txGasLimit
    });
  });

  describe('Operation', function () {
    this.timeout(50000);

    describe('newContractExtraBytes()', function () {
      it('should return the new contract extra bytes', async function () {
        const response = await instance.newContractExtraBytes();

        expect(response).to.be.above(BigNumber.from('0'));
      });
    });

    describe('storageDepositPerByte()', function () {
      it('should return the storage deposit', async function () {
        const response = await instance.storageDepositPerByte();

        expect(response).to.be.above(BigNumber.from('0'));
      });
    });

    describe('maintainerOf()', function () {
      it('should return the maintainer of the contract', async function () {
        const owner = await instance.maintainerOf(contract.address);

        expect(owner).to.equal(deployerAddress);
      });
    });

    describe('developerDeposit()', function () {
      it('should return the developer deposit', async function () {
        const response = await instance.developerDeposit();

        expect(response).to.be.above(BigNumber.from('0'));
      });
    });

    describe('publicationFee()', function () {
      it('should return the publication fee', async function () {
        const response = await instance.publicationFee();

        expect(response).to.be.above(BigNumber.from('0'));
      });
    });

    describe('transferMaintainter()', function () {
      it('should transfer the maintainer of the contract', async function () {
        const initialOwner = await instance.maintainerOf(contract.address);

        await instance.connect(deployer).transferMaintainer(contract.address, userAddress);

        const finalOwner = await instance.maintainerOf(contract.address);

        expect(initialOwner).to.equal(deployerAddress);
        expect(finalOwner).to.equals(userAddress);
      });

      it('should emit TransferredMaintainer when maintainer role of the contract is transferred', async function () {
        await expect(instance.connect(deployer).transferMaintainer(contract.address, userAddress))
          .to.emit(instance, 'TransferredMaintainer')
          .withArgs(contract.address, userAddress);
      });

      it('should revert if the caller is not the maintainer of the contract', async function () {
        await expect(instance.connect(user).transferMaintainer(contract.address, deployerAddress)).to.be.reverted;
      });

      it('should revert if trying to transfer maintainer of 0x0', async function () {
        await expect(instance.connect(deployer).transferMaintainer(NULL_ADDRESS, userAddress)).to.be.revertedWith(
          'EVM: the contractAddress is the zero address'
        );
      });

      it('should revert when trying to transfer maintainer to 0x0 address', async function () {
        await expect(instance.connect(deployer).transferMaintainer(contract.address, NULL_ADDRESS)).to.be.revertedWith(
          'EVM: the newMaintainer is the zero address'
        );
      });
    });

    describe('publishContract()', function () {
      it('should emit ContractPublished event', async function () {
        await expect(instance.connect(deployer).publishContract(contract.address))
          .to.emit(instance, 'ContractPublished')
          .withArgs(contract.address);
      });

      it('should revert when caller is not the maintainer of the contract', async function () {
        await expect(instance.connect(user).publishContract(contract.address)).to.be.reverted;
      });

      it('should revert when trying to publish 0x0 contract', async function () {
        await expect(instance.connect(deployer).publishContract(NULL_ADDRESS)).to.be.revertedWith(
          'EVM: the contractAddress is the zero address'
        );
      });
    });

    describe('developerStatus()', function () {
      it('should return the status of the development account', async function () {
        const randomSigner = new Wallet.createRandom();

        const responseTrue = await instance.developerStatus(deployerAddress);
        const responseFalse = await instance.developerStatus(await randomSigner.getAddress());

        expect(responseTrue).to.be.true;
        expect(responseFalse).to.be.false;
      });
    });

    describe('developerDisable()', function () {
      it('should disable development mode', async function () {
        const setupStatus = await instance.developerStatus(userAddress);

        if (!setupStatus) {
          await instance.connect(user).developerEnable();
        }

        const initialStatus = await instance.developerStatus(userAddress);

        await instance.connect(user).developerDisable();

        const finalStatus = await instance.developerStatus(userAddress);

        expect(initialStatus).to.be.true;
        expect(finalStatus).to.be.false;
      });

      it('should emit DeveloperDisabled', async function () {
        const initialStatus = await instance.developerStatus(userAddress);

        if (!initialStatus) {
          await instance.connect(user).developerEnable();
        }

        await expect(instance.connect(user).developerDisable())
          .to.emit(instance, 'DeveloperDisabled')
          .withArgs(userAddress);
      });

      it('should revert if the development account is not enabled', async function () {
        const setupStatus = await instance.developerStatus(userAddress);

        if (setupStatus) {
          await instance.connect(user).developerDisable();
        }

        await expect(instance.connect(user).developerDisable()).to.be.reverted;
      });
    });

    describe('developerEnable()', function () {
      it('should enable development mode', async function () {
        const setupStatus = await instance.developerStatus(userAddress);

        if (setupStatus) {
          await instance.connect(user).developerDisable();
        }

        const initialStatus = await instance.developerStatus(userAddress);

        await instance.connect(user).developerEnable();

        const finalStatus = await instance.developerStatus(userAddress);

        expect(initialStatus).to.be.false;
        expect(finalStatus).to.be.true;
      });

      it('should emit DeveloperEnabled event', async function () {
        const setupStatus = await instance.developerStatus(userAddress);

        if (setupStatus) {
          await instance.connect(user).developerDisable();
        }

        await expect(instance.connect(user).developerEnable())
          .to.emit(instance, 'DeveloperEnabled')
          .withArgs(userAddress);
      });

      it('should revert if the development mode is already enabled', async function () {
        const setupStatus = await instance.developerStatus(userAddress);

        if (!setupStatus) {
          await instance.connect(user).developerEnable();
        }

        await expect(instance.connect(user).developerEnable()).to.be.reverted;
      });
    });
  });
});
