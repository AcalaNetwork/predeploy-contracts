// SPDX-License-Identifier: GPL-3.0-or-later

pragma solidity ^0.8.0;

interface IEVMAccounts {
    // Returns the AccountId used to generate the given EvmAddress.
    function getAccountId(address account) external view returns (bytes32);

    // Returns the EvmAddress associated with a given AccountId or the underlying EvmAddress of the AccountId.
    function getEvmAddress(bytes32 account) external view returns (address);
}
