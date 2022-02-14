// SPDX-License-Identifier: GPL-3.0-or-later

pragma solidity ^0.6.0;

import "./IEVM.sol";

contract EVM is IEVM {
    address constant private precompile = address(0x0000000000000000000000000000000000000402);

    /**
     * @dev Returns the const of NewContractExtraBytes.
     */
    function newContractExtraBytes() public view override returns (uint256) {
        (bool success, bytes memory returnData) = precompile.staticcall(abi.encodeWithSignature("newContractExtraBytes()"));
        assembly {
            if eq(success, 0) {
                revert(add(returnData, 0x20), returndatasize())
            }
        }

        return abi.decode(returnData, (uint256));
    }

    /**
     * @dev Returns the const of StorageDepositPerByte.
     */
    function storageDepositPerByte() public view override returns (uint256) {
        (bool success, bytes memory returnData) = precompile.staticcall(abi.encodeWithSignature("storageDepositPerByte()"));
        assembly {
            if eq(success, 0) {
                revert(add(returnData, 0x20), returndatasize())
            }
        }

        return abi.decode(returnData, (uint256));
    }

    /**
     * @dev Returns the maintainer of the contract.
     */
    function maintainerOf(address contract_address)
        public
        view
        override
        returns (address)
    {
        (bool success, bytes memory returnData) = precompile.staticcall(abi.encodeWithSignature("maintainerOf(address)", contract_address));
        assembly {
            if eq(success, 0) {
                revert(add(returnData, 0x20), returndatasize())
            }
        }

        return abi.decode(returnData, (address));
    }

    /**
     * @dev Returns the const of DeveloperDeposit.
     */
    function developerDeposit() public view override returns (uint256) {
        (bool success, bytes memory returnData) = precompile.staticcall(abi.encodeWithSignature("developerDeposit()"));
        assembly {
            if eq(success, 0) {
                revert(add(returnData, 0x20), returndatasize())
            }
        }

        return abi.decode(returnData, (uint256));
    }

    /**
     * @dev Returns the const of PublicationFee.
     */
    function publicationFee() public view override returns (uint256) {
        (bool success, bytes memory returnData) = precompile.staticcall(abi.encodeWithSignature("publicationFee()"));
        assembly {
            if eq(success, 0) {
                revert(add(returnData, 0x20), returndatasize())
            }
        }

        return abi.decode(returnData, (uint256));
    }

    /**
     * @dev Transfer the maintainer of the contract.
     * Returns a boolean value indicating whether the operation succeeded.
     */
    function transferMaintainer(
        address contract_address,
        address new_maintainer
    ) public override returns (bool) {
        require(contract_address != address(0), "EVM: the contract_address is the zero address");
        require(new_maintainer != address(0), "EVM: the new_maintainer is the zero address");

        (bool success, bytes memory returnData) = precompile.call(abi.encodeWithSignature("transferMaintainer(address,address,address)", msg.sender, contract_address, new_maintainer));
        assembly {
            if eq(success, 0) {
                revert(add(returnData, 0x20), returndatasize())
            }
        }

        emit TransferredMaintainer(contract_address, new_maintainer);
        return true;
    }

    /**
     * @dev Publishes contract from development mode to production.
     * Returns a boolean value indicating whether the operation succeeded.
     */
    function publishContract(
        address contract_address
    ) public override returns (bool) {
        require(contract_address != address(0), "EVM: the contract_address is the zero address");

        (bool success, bytes memory returnData) = precompile.call(abi.encodeWithSignature("publishContract(address,address)", msg.sender, contract_address));
        assembly {
            if eq(success, 0) {
                revert(add(returnData, 0x20), returndatasize())
            }
        }

        emit ContractPublished(contract_address);
        return true;
    }

    /**
     * @dev Returns whether the account is enabled for contract development
     */
    function developerStatus(
        address account
    ) public view override returns (bool) {
        (bool success, bytes memory returnData) = precompile.staticcall(abi.encodeWithSignature("developerStatus(address)", account));
        assembly {
            if eq(success, 0) {
                revert(add(returnData, 0x20), returndatasize())
            }
        }

        return abi.decode(returnData, (bool));
    }

    /**
     * @dev Enables account for development mode, taking a deposit
     * Returns a boolean value indicating whether the operation succeeded.
     */
    function developerEnable() public override returns (bool) {
        (bool success, bytes memory returnData) = precompile.call(abi.encodeWithSignature("developerEnable(address)", msg.sender));
        assembly {
            if eq(success, 0) {
                revert(add(returnData, 0x20), returndatasize())
            }
        }

        emit DeveloperEnabled(msg.sender);
        return true;
    }

    /**
     * @dev Disables account for development mode, returns deposit
     * Returns a boolean value indicating whether the operation succeeded.
     */
    function developerDisable() public override returns (bool) {
        (bool success, bytes memory returnData) = precompile.call(abi.encodeWithSignature("developerDisable(address)", msg.sender));
        assembly {
            if eq(success, 0) {
                revert(add(returnData, 0x20), returndatasize())
            }
        }

        emit DeveloperDisabled(msg.sender);
        return true;
    }
}
