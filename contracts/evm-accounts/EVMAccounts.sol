// SPDX-License-Identifier: GPL-3.0-or-later

pragma solidity ^0.8.0;

import "./IEVMAccounts.sol";

contract EVMAccounts is IEVMAccounts {
    address constant private precompile = address(0x0000000000000000000000000000000000000408);

    /**
     * @dev Returns the AccountId used to generate the given EvmAddress.
     */
    function getAccountId(address evmAddress) public view override returns (bytes32) {
        (bool success, bytes memory returnData) = precompile.staticcall(abi.encodeWithSignature("getAccountId(address)", evmAddress));
        assembly {
            if eq(success, 0) {
                revert(add(returnData, 0x20), returndatasize())
            }
        }

        return abi.decode(returnData, (bytes32));
    }

    /**
     * @dev Returns the EvmAddress associated with a given AccountId or the underlying EvmAddress of the AccountId.
     */
    function getEvmAddress(bytes32 accountId) public view override returns (address) {
        (bool success, bytes memory returnData) = precompile.staticcall(abi.encodeWithSignature("getEvmAddress(bytes32)", accountId));
        assembly {
            if eq(success, 0) {
                revert(add(returnData, 0x20), returndatasize())
            }
        }

        return abi.decode(returnData, (address));
    }

    /**
     * @dev Claim account mapping between AccountId and a generated EvmAddress based off of the AccountId.
     */
    function claimDefaultEvmAddress(bytes32 accountId) public override returns (bool) {
        (bool success, bytes memory returnData) = precompile.call(abi.encodeWithSignature("claimDefaultEvmAddress(bytes32)", accountId));
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
