pragma solidity ^0.5.0;

import "./ScheduleCallLib.sol";

contract ScheduleCall {
    event ScheduledCall(address indexed sender, address indexed contract_address, uint256 indexed min_delay);
    
    function scheduleCall(
        address contract_address,
        uint256 value,
        uint256 gas_limit,
        uint256 storage_limit,
        uint256 min_delay,
        bytes memory input_data
    ) public returns (bool) {
        _scheduleCall(msg.sender, contract_address, value, gas_limit, storage_limit, min_delay, input_data);
        return true;
    }

    function _scheduleCall(
        address sender,
        address contract_address,
        uint256 value,
        uint256 gas_limit,
        uint256 storage_limit,
        uint256 min_delay,
        bytes memory input_data
    ) internal {
        require(sender != address(0), "ScheduleCall: the sender is the zero address");
        require(contract_address != address(0), "ScheduleCall: the contract_address is the zero address");
        require(min_delay > 0, "ScheduleCall: min_delay is zero");
        require(input_data.length > 0, "ScheduleCall: input is null");

        ScheduleCallLib.scheduleCall(msg.sender, contract_address, value, gas_limit, storage_limit, min_delay, input_data);
        emit ScheduledCall(msg.sender, contract_address, min_delay);
    }
}

