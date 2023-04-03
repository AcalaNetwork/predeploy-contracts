// SPDX-License-Identifier: GPL-3.0-or-later

pragma solidity ^0.8.0;

import {IEVMAccounts} from "./IEVMAccounts.sol";

/// @title EVMAccounts Predeploy Contract
/// @author Acala Developers
/// @notice You can use this predeploy contract to call evm-accounts pallet
/// @dev This contracts will interact with evm-accounts pallet
contract EVMAccounts is IEVMAccounts {
    /// @dev The EVMAccounts precompile address.
    address private constant PRECOMPILE =
        address(0x0000000000000000000000000000000000000408);

    /// @inheritdoc IEVMAccounts
    function getAccountId(
        address evmAddress
    ) public view override returns (bytes32) {
        (bool success, bytes memory returnData) = PRECOMPILE.staticcall(
            abi.encodeWithSignature("getAccountId(address)", evmAddress)
        );
        assembly {
            if eq(success, 0) {
                revert(add(returnData, 0x20), returndatasize())
            }
        }

        return abi.decode(returnData, (bytes32));
    }

    /// @inheritdoc IEVMAccounts
    function getEvmAddress(
        bytes32 accountId
    ) public view override returns (address) {
        (bool success, bytes memory returnData) = PRECOMPILE.staticcall(
            abi.encodeWithSignature("getEvmAddress(bytes32)", accountId)
        );
        assembly {
            if eq(success, 0) {
                revert(add(returnData, 0x20), returndatasize())
            }
        }

        return abi.decode(returnData, (address));
    }

    /// @inheritdoc IEVMAccounts
    function claimDefaultEvmAddress(
        bytes32 accountId
    ) public override returns (bool) {
        (bool success, bytes memory returnData) = PRECOMPILE.call(
            abi.encodeWithSignature(
                "claimDefaultEvmAddress(bytes32)",
                accountId
            )
        );
        assembly {
            if eq(success, 0) {
                revert(add(returnData, 0x20), returndatasize())
            }
        }

        address evmAddress = abi.decode(returnData, (address));
        emit ClaimAccount(msg.sender, accountId, evmAddress);
        return true;
    }
}
