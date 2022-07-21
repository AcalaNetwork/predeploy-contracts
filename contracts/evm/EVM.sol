// SPDX-License-Identifier: GPL-3.0-or-later

pragma solidity ^0.8.0;

import "./IEVM.sol";

contract EVM is IEVM {
    address constant private PRECOMPILE = address(0x0000000000000000000000000000000000000402);

    /**
     * @dev Returns the const of NewContractExtraBytes.
     */
    function newContractExtraBytes() public view override returns (uint256) {
        (bool success, bytes memory returnData) = PRECOMPILE.staticcall(
            abi.encodeWithSignature("newContractExtraBytes()")
        );
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
        (bool success, bytes memory returnData) = PRECOMPILE.staticcall(
            abi.encodeWithSignature("storageDepositPerByte()")
        );
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
    function maintainerOf(address contractAddress)
        public
        view
        override
        returns (address)
    {
        (bool success, bytes memory returnData) = PRECOMPILE.staticcall(
            abi.encodeWithSignature("maintainerOf(address)", contractAddress)
        );
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
        (bool success, bytes memory returnData) = PRECOMPILE.staticcall(
            abi.encodeWithSignature("developerDeposit()")
        );
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
        (bool success, bytes memory returnData) = PRECOMPILE.staticcall(abi.encodeWithSignature("publicationFee()"));
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
        address contractAddress,
        address newMaintainer
    ) public override returns (bool) {
        require(contractAddress != address(0), "EVM: the contractAddress is the zero address");
        require(newMaintainer != address(0), "EVM: the newMaintainer is the zero address");

        (bool success, bytes memory returnData) = PRECOMPILE.call(
            abi.encodeWithSignature(
                "transferMaintainer(address,address,address)",
                msg.sender, contractAddress, newMaintainer
            )
        );
        assembly {
            if eq(success, 0) {
                revert(add(returnData, 0x20), returndatasize())
            }
        }

        emit TransferredMaintainer(contractAddress, newMaintainer);
        return true;
    }

    /**
     * @dev Publishes contract from development mode to production.
     * Returns a boolean value indicating whether the operation succeeded.
     */
    function publishContract(
        address contractAddress
    ) public override returns (bool) {
        require(contractAddress != address(0), "EVM: the contractAddress is the zero address");

        (bool success, bytes memory returnData) = PRECOMPILE.call(
            abi.encodeWithSignature("publishContract(address,address)", msg.sender, contractAddress)
        );
        assembly {
            if eq(success, 0) {
                revert(add(returnData, 0x20), returndatasize())
            }
        }

        emit ContractPublished(contractAddress);
        return true;
    }

    /**
     * @dev Returns whether the account is enabled for contract development
     */
    function developerStatus(
        address account
    ) public view override returns (bool) {
        (bool success, bytes memory returnData) = PRECOMPILE.staticcall(
            abi.encodeWithSignature("developerStatus(address)", account)
        );
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
        (bool success, bytes memory returnData) = PRECOMPILE.call(
            abi.encodeWithSignature("developerEnable(address)", msg.sender)
        );
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
        (bool success, bytes memory returnData) = PRECOMPILE.call(
            abi.encodeWithSignature("developerDisable(address)", msg.sender)
        );
        assembly {
            if eq(success, 0) {
                revert(add(returnData, 0x20), returndatasize())
            }
        }

        emit DeveloperDisabled(msg.sender);
        return true;
    }
}
