// SPDX-License-Identifier: GPL-3.0-or-later

pragma solidity ^0.8.0;

import "./IEVMAccounts.sol";

contract EVMAccounts is IEVMAccounts {
    address constant private PRECOMPILE = address(0x0000000000000000000000000000000000000408);

    /**
     * @dev Get the AccountId used to generate the given EvmAddress.
     * Returns (accountId).
     */
    function getAccountId(address evmAddress) public view override returns (bytes32) {
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

    /**
     * @dev Get the EvmAddress associated with a given AccountId or the underlying EvmAddress of the AccountId.
     * Returns (evmAddress). Return address(0x0) if the AccountId is not mapped.
     */
    function getEvmAddress(bytes32 accountId) public view override returns (address) {
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

    /**
     * @dev Claim account mapping between AccountId and a generated EvmAddress based off of the AccountId.
     * Returns a boolean value indicating whether the operation succeeded.
     */
    function claimDefaultEvmAddress(bytes32 accountId) public override returns (bool) {
        (bool success, bytes memory returnData) = PRECOMPILE.call(
            abi.encodeWithSignature("claimDefaultEvmAddress(bytes32)", accountId)
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
