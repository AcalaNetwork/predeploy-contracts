// SPDX-License-Identifier: GPL-3.0-or-later

pragma solidity ^0.6.0;

interface IEVMAccounts {
    event ClaimAccount(address indexed sender, bytes32 indexed accountId, address indexed evmAddress);

    // Get the AccountId used to generate the given EvmAddress.
    // Returns (accountId).
    function getAccountId(address evmAddress) external view returns (bytes32);

    // Returns the EvmAddress associated with a given AccountId or the underlying EvmAddress of the AccountId.
    // Returns (evmAddress). Return address(0x0) if the AccountId is not mapped.
    function getEvmAddress(bytes32 accountId) external view returns (address);

    // Claim account mapping between AccountId and a generated EvmAddress based off of the AccountId.
    // Returns a boolean value indicating whether the operation succeeded.
    function claimDefaultEvmAddress(bytes32 accountId) external returns (bool);
}
