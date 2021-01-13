pragma solidity ^0.5.0;

import "./StateRentLib.sol";

contract StateRent {
    event TransferedMaintainer(address indexed contract_address, address indexed new_maintainer);
    
    function newContractExtraBytes() public view returns (uint256) {
        return StateRentLib.newContractExtraBytes();
    }

    function storageDepositPerByte() public view returns (uint256) {
        return StateRentLib.storageDepositPerByte();
    }

    function maintainerOf(address contract_address)
        public
        view
        returns (address)
    {
        return StateRentLib.maintainerOf(contract_address);
    }

    function developerDeposit() public view returns (uint256) {
        return StateRentLib.developerDeposit();
    }

    function deploymentFee() public view returns (uint256) {
        return StateRentLib.deploymentFee();
    }

    function transferMaintainer(
        address contract_address,
        address new_maintainer
    ) public returns (bool) {
        _transferMaintainer(msg.sender, contract_address, new_maintainer);
        return true;
    }

    function _transferMaintainer(
        address sender,
        address contract_address,
        address new_maintainer
    ) internal {
        require(sender != address(0), "StateRent: the sender is the zero address");
        require(contract_address != address(0), "StateRent: the contract_address is the zero address");
        require(new_maintainer != address(0), "StateRent: the new_maintainer is the zero address");

        StateRentLib.transferMaintainer(msg.sender, contract_address, new_maintainer);
        emit TransferedMaintainer(contract_address, new_maintainer);
    }
}

