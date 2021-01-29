pragma solidity ^0.5.0;

import "./ScheduleCallLib.sol";

contract ScheduleCall {
    event ScheduledCall(address indexed sender, address indexed contract_address, uint256 indexed block_number, uint256 index);
    
    function scheduleCall(
        address contract_address,
        uint256 value,
        uint256 gas_limit,
        uint256 storage_limit,
        uint256 min_delay,
        bytes memory input_data
    ) public returns (uint256, uint256) {
        (uint256 block_number, uint256 index) = _scheduleCall(msg.sender, contract_address, value, gas_limit, storage_limit, min_delay, input_data);
        return (block_number, index);
    }

    function _scheduleCall(
        address sender,
        address contract_address,
        uint256 value,
        uint256 gas_limit,
        uint256 storage_limit,
        uint256 min_delay,
        bytes memory input_data
    ) internal returns (uint256, uint256) {
        require(sender != address(0), "ScheduleCall: the sender is the zero address");
        require(contract_address != address(0), "ScheduleCall: the contract_address is the zero address");
        require(min_delay > 0, "ScheduleCall: min_delay is zero");
        require(input_data.length > 0, "ScheduleCall: input is null");

        (uint256 block_number, uint256 index) = ScheduleCallLib.scheduleCall(msg.sender, contract_address, value, gas_limit, storage_limit, min_delay, input_data);

        emit ScheduledCall(msg.sender, contract_address, block_number, index);
        return (block_number, index);
    }
}

