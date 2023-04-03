// SPDX-License-Identifier: GPL-3.0-or-later

pragma solidity ^0.8.0;

import {IEVM} from "./IEVM.sol";

/// @title EVM Predeploy Contract
/// @author Acala Developers
/// @notice You can use this predeploy contract to call evm pallet
/// @dev This contracts will interact with evm pallet
contract EVM is IEVM {
    /// @dev The EVM precompile address.
    address private constant PRECOMPILE =
        address(0x0000000000000000000000000000000000000402);

    /// @inheritdoc IEVM
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

    /// @inheritdoc IEVM
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

    /// @inheritdoc IEVM
    function maintainerOf(
        address contractAddress
    ) public view override returns (address) {
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

    /// @inheritdoc IEVM
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

    /// @inheritdoc IEVM
    function publicationFee() public view override returns (uint256) {
        (bool success, bytes memory returnData) = PRECOMPILE.staticcall(
            abi.encodeWithSignature("publicationFee()")
        );
        assembly {
            if eq(success, 0) {
                revert(add(returnData, 0x20), returndatasize())
            }
        }

        return abi.decode(returnData, (uint256));
    }

    /// @inheritdoc IEVM
    function transferMaintainer(
        address contractAddress,
        address newMaintainer
    ) public override returns (bool) {
        require(
            contractAddress != address(0),
            "EVM: the contractAddress is the zero address"
        );
        require(
            newMaintainer != address(0),
            "EVM: the newMaintainer is the zero address"
        );

        (bool success, bytes memory returnData) = PRECOMPILE.call(
            abi.encodeWithSignature(
                "transferMaintainer(address,address,address)",
                msg.sender,
                contractAddress,
                newMaintainer
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

    /// @inheritdoc IEVM
    function publishContract(
        address contractAddress
    ) public override returns (bool) {
        require(
            contractAddress != address(0),
            "EVM: the contractAddress is the zero address"
        );

        (bool success, bytes memory returnData) = PRECOMPILE.call(
            abi.encodeWithSignature(
                "publishContract(address,address)",
                msg.sender,
                contractAddress
            )
        );
        assembly {
            if eq(success, 0) {
                revert(add(returnData, 0x20), returndatasize())
            }
        }

        emit ContractPublished(contractAddress);
        return true;
    }

    /// @inheritdoc IEVM
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

    /// @inheritdoc IEVM
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

    /// @inheritdoc IEVM
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
