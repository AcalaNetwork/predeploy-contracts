pragma solidity ^0.5.0;

import "./StateRentLib.sol";

contract StateRent {
    event AddStorageQuota(address indexed contract_address, uint256 value);
    event RemoveStorageQuota(address indexed contract_address, uint256 value);
    event RequestedTransferMaintainer(address indexed sender, address indexed contract_address);
    event CanceledTransferMaintainer(address indexed sender, address indexed contract_address);
    event ConfirmedTransferMaintainer(address indexed contract_address, address indexed new_maintainer);
    event RejectedTransferMaintainer(address indexed contract_address, address indexed invalid_maintainer);
    
    function contractExistentialDeposit() public view returns (uint256) {
        return StateRentLib.contractExistentialDeposit();
    }

    function transferMaintainerDeposit() public view returns (uint256) {
        return StateRentLib.transferMaintainerDeposit();
    }

    function storageDepositPerByte() public view returns (uint256) {
        return StateRentLib.storageDepositPerByte();
    }

    function storageDefaultQuota() public view returns (uint256) {
        return StateRentLib.storageDefaultQuota();
    }

    function maintainerOf(address contract_address)
        public
        view
        returns (address)
    {
        return StateRentLib.maintainerOf(contract_address);
    }

    function addStorageQuota(
        address contract_address,
        uint256 bytes_size
    ) public returns (bool) {
        _addStorageQuota(msg.sender, contract_address, bytes_size);
        return true;
    }

    function removeStorageQuota(
        address contract_address,
        uint256 bytes_size
    ) public returns (bool) {
        _removeStorageQuota(msg.sender, contract_address, bytes_size);
        return true;
    }

    function requestTransferMaintainer(
        address contract_address
    ) public returns (bool) {
        _requestTransferMaintainer(msg.sender, contract_address);
        return true;
    }

    function cancelTransferMaintainer(
        address contract_address
    ) public returns (bool) {
        _cancelTransferMaintainer(msg.sender, contract_address);
        return true;
    }

    function confirmTransferMaintainer(
        address contract_address,
        address new_maintainer
    ) public returns (bool) {
        _confirmTransferMaintainer(msg.sender, contract_address, new_maintainer);
        return true;
    }

    function rejectTransferMaintainer(
        address contract_address,
        address invalid_maintainer
    ) public returns (bool) {
        _rejectTransferMaintainer(msg.sender, contract_address, invalid_maintainer);
        return true;
    }
    
    function _addStorageQuota(
        address sender,
        address contract_address,
        uint256 bytes_size
    ) internal {
        require(sender != address(0), "StateRent: the sender is the zero address");
        require(contract_address != address(0), "StateRent: the contract_address is the zero address");

        StateRentLib.addStorageQuota(sender, contract_address, bytes_size);
        emit AddStorageQuota(contract_address, bytes_size);

    }
    
    function _removeStorageQuota(
        address sender,
        address contract_address,
        uint256 bytes_size
    ) internal {
        require(sender != address(0), "StateRent: the sender is the zero address");
        require(contract_address != address(0), "StateRent: the contract_address is the zero address");

        StateRentLib.removeStorageQuota(msg.sender, contract_address, bytes_size);
        emit RemoveStorageQuota(contract_address, bytes_size);
    }

    function _requestTransferMaintainer(
        address sender,
        address contract_address
    ) internal {
        require(sender != address(0), "StateRent: the sender is the zero address");
        require(contract_address != address(0), "StateRent: the contract_address is the zero address");
        
        StateRentLib.requestTransferMaintainer(msg.sender, contract_address);
        emit RequestedTransferMaintainer(sender, contract_address);
    }

    function _cancelTransferMaintainer(
        address sender,
        address contract_address
    ) internal {
        require(sender != address(0), "StateRent: the sender is the zero address");
        require(contract_address != address(0), "StateRent: the contract_address is the zero address");

        StateRentLib.cancelTransferMaintainer(msg.sender, contract_address);
        emit CanceledTransferMaintainer(sender, contract_address);
    }

    function _confirmTransferMaintainer(
        address sender,
        address contract_address,
        address new_maintainer
    ) internal {
        require(sender != address(0), "StateRent: the sender is the zero address");
        require(contract_address != address(0), "StateRent: the contract_address is the zero address");
        require(new_maintainer != address(0), "StateRent: the new_maintainer is the zero address");

        StateRentLib.confirmTransferMaintainer(msg.sender, contract_address, new_maintainer);
        emit ConfirmedTransferMaintainer(contract_address, new_maintainer);
    }
    
    function _rejectTransferMaintainer(
        address sender,
        address contract_address,
        address invalid_maintainer
    ) internal {
        require(sender != address(0), "StateRent: the sender is the zero address");
        require(contract_address != address(0), "StateRent: the contract_address is the zero address");
        require(invalid_maintainer != address(0), "StateRent: the invalid_maintainer is the zero address");

        StateRentLib.rejectTransferMaintainer(msg.sender, contract_address, invalid_maintainer);
        emit RejectedTransferMaintainer(contract_address, invalid_maintainer);
    }
}

