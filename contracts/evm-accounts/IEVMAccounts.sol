// SPDX-License-Identifier: GPL-3.0-or-later

pragma solidity ^0.8.0;

/// @title EVMAccounts Predeploy Contract Interface
/// @author Acala Developers
/// @notice You can use this predeploy contract to call evm-accounts pallet
/// @dev The interface through which solidity contracts will interact with evm-accounts pallet
interface IEVMAccounts {
    /// @notice Mapping between Substrate accounts and EVM accounts claim account event.
    /// @param sender The sender of the transaction.
    /// @param accountId The substrate account.
    /// @param evmAddress The mapped EVM accounts.
    event ClaimAccount(
        address indexed sender,
        bytes32 indexed accountId,
        address indexed evmAddress
    );

    /// @notice Get the AccountId used to generate the given EvmAddress.
    /// @param evmAddress The EVM address.
    /// @return Returns (accountId).
    function getAccountId(address evmAddress) external view returns (bytes32);

    /// @notice Get the EvmAddress associated with a given AccountId or the underlying EvmAddress of the AccountId.
    /// @param accountId The substrate account.
    /// @return Returns (evmAddress). Return address(0x0) if the AccountId is not mapped.
    function getEvmAddress(bytes32 accountId) external view returns (address);

    /// @notice Claim account mapping between AccountId and a generated EvmAddress based off of the AccountId.
    /// @dev It'll emit an {ClaimAccount} event.
    /// @param accountId The substrate account.
    /// @return Returns a boolean value indicating whether the operation succeeded.
    function claimDefaultEvmAddress(bytes32 accountId) external returns (bool);
}
