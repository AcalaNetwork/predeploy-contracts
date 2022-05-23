// SPDX-License-Identifier: GPL-3.0-or-later

pragma solidity ^0.8.0;

interface IEVMAccounts {
    event ClaimAccount(address indexed sender, bytes32 indexed accountId, address indexed evmAddress);

    // Returns the AccountId used to generate the given EvmAddress.
    function getAccountId(address evmAddress) external view returns (bytes32);

    // Returns the EvmAddress associated with a given AccountId or the underlying EvmAddress of the AccountId.
    function getEvmAddress(bytes32 accountId) external view returns (address);

    // Claim account mapping between AccountId and a generated EvmAddress based off of the AccountId.
    function claimDefaultEvmAddress(bytes32 accountId) external returns (bool);
}
