// SPDX-License-Identifier: GPL-3.0-or-later

pragma solidity ^0.6.0;

interface IStateRent {
    event TransferredMaintainer(address indexed contract_address, address indexed new_maintainer);

    event ContractPublished(address indexed contract_address);

    event DeveloperEnabled(address indexed account_address);

    event DeveloperDisabled(address indexed account_address);

    // Returns the const of NewContractExtraBytes.
    function newContractExtraBytes() external view returns (uint256);

    // Returns the const of StorageDepositPerByte.
    function storageDepositPerByte() external view returns (uint256);

    // Returns the maintainer of the contract.
    function maintainerOf(address contract_address) external view returns (address);

    // Returns the const of DeveloperDeposit.
    function developerDeposit() external view returns (uint256);

    // Returns the const of PublicationFee.
    function publicationFee() external view returns (uint256);

    // Transfer the maintainer of the contract.
    // Returns a boolean value indicating whether the operation succeeded.
    function transferMaintainer(address contract_address, address new_maintainer) external returns (bool);

    // Publish contract
    // Returns a boolean value indicating whether the operation succeeded.
    function publishContract(address contract_address) external returns (bool);

    // Returns if the account is enabled for developer mode
    function developerStatus(address account) external view returns (bool);

    // Enables account for development mode, taking a deposit
    // Returns a boolean value indicating whether the operation succeeded.
    function developerEnable() external returns (bool);

    // Disables account for development mode, returns deposit
    // Returns a boolean value indicating whether the operation succeeded.
    function developerDisable() external returns (bool);
}
