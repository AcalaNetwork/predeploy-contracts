// SPDX-License-Identifier: GPL-3.0-or-later

pragma solidity ^0.8.0;

/// @title EVM Predeploy Contract Interface
/// @author Acala Developers
/// @notice You can use this predeploy contract to call evm pallet
/// @dev The interface through which solidity contracts will interact with evm pallet
interface IEVM {
    /// @notice Transferred maintainer event.
    /// @param contractAddress The contract address of the transferred maintainer.
    /// @param newMaintainer The new maintainer.
    event TransferredMaintainer(
        address indexed contractAddress,
        address indexed newMaintainer
    );

    /// @notice Contract published event.
    /// @param contractAddress The published contract address.
    event ContractPublished(address indexed contractAddress);

    /// @notice Enabled developer event.
    /// @param accountAddress The enabled developer account address.
    event DeveloperEnabled(address indexed accountAddress);

    /// @notice Disabled developer event.
    /// @param accountAddress The disabled developer account address.
    event DeveloperDisabled(address indexed accountAddress);

    /// @notice Get the extra bytes for creating a contract.
    /// @return Returns the const of NewContractExtraBytes.
    function newContractExtraBytes() external view returns (uint256);

    /// @notice Get the storage required for per byte.
    /// @return Returns the const of StorageDepositPerByte.
    function storageDepositPerByte() external view returns (uint256);

    /// @notice Get the maintainer of the contract.
    /// @param contractAddress The contract address.
    /// @return Returns the maintainer of the contract.
    function maintainerOf(
        address contractAddress
    ) external view returns (address);

    /// @notice Get deposit for the developer.
    /// @return Returns the const of DeveloperDeposit.
    function developerDeposit() external view returns (uint256);

    /// @notice Get the fee for publishing the contract.
    /// @return Returns the const of PublicationFee.
    function publicationFee() external view returns (uint256);

    /// @notice Transfer the maintainer of the contract.
    /// @dev It'll emit an {TransferredMaintainer} event.
    /// @param contractAddress The contract address of the transfer maintainer.
    /// It cannot be the zero address. The caller must be the contract's maintainer.
    /// @param newMaintainer The address of the new maintainer.
    /// @return Returns a boolean value indicating whether the operation succeeded.
    function transferMaintainer(
        address contractAddress,
        address newMaintainer
    ) external returns (bool);

    /// @notice Publish contract.
    /// @dev It'll emit an {ContractPublished} event.
    /// @param contractAddress The contract address.
    /// @return Returns a boolean value indicating whether the operation succeeded.
    function publishContract(address contractAddress) external returns (bool);

    /// @notice Get developer status.
    /// @param account The developer account.
    /// @return Returns if the account is enabled for developer mode.
    function developerStatus(address account) external view returns (bool);

    /// @notice Enables account for development mode, taking a deposit.
    /// @dev It'll emit an {DeveloperEnabled} event.
    /// @return Returns a boolean value indicating whether the operation succeeded.
    function developerEnable() external returns (bool);

    /// @notice Disables account for development mode, returns deposit.
    /// @dev It'll emit an {DeveloperDisabled} event.
    /// @return Returns a boolean value indicating whether the operation succeeded.
    function developerDisable() external returns (bool);
}
