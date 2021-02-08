pragma solidity ^0.5.0;

import "./ScheduleCallLib.sol";

contract ScheduleCall {
    event ScheduledCall(address indexed sender, address indexed contract_address, uint256 indexed task_id);
    event CanceledCall(address indexed sender, uint256 indexed task_id);
    event RescheduledCall(address indexed sender, uint256 indexed task_id);
    
    /**
     * @dev Schedule call the contract.
     * Returns the task_id.
     */
    function scheduleCall(
        address contract_address,
        uint256 value,
        uint256 gas_limit,
        uint256 storage_limit,
        uint256 min_delay,
        bytes memory input_data
    ) public returns (uint256) {
        uint256 task_id = _scheduleCall(msg.sender, contract_address, value, gas_limit, storage_limit, min_delay, input_data);
        return task_id;
    }

    /**
     * @dev Cancel schedule call the contract.
     * Returns a boolean value indicating whether the operation succeeded.
     */
    function cancelCall(
        uint256 task_id
    ) public returns (bool) {
        _cancelCall(msg.sender, task_id);
        return true;
    }

    /**
     * @dev Reschedule call the contract.
     * Returns a boolean value indicating whether the operation succeeded.
     */
    function rescheduleCall(
        uint256 task_id,
        uint256 min_delay
    ) public returns (bool) {
        _rescheduleCall(msg.sender, task_id, min_delay);
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
    ) internal returns (uint256) {
        require(sender != address(0), "ScheduleCall: the sender is the zero address");
        require(contract_address != address(0), "ScheduleCall: the contract_address is the zero address");
        require(min_delay > 0, "ScheduleCall: min_delay is zero");
        require(input_data.length > 0, "ScheduleCall: input is null");

        uint256 task_id = ScheduleCallLib.scheduleCall(msg.sender, contract_address, value, gas_limit, storage_limit, min_delay, input_data);

        emit ScheduledCall(msg.sender, contract_address, task_id);
        return task_id;
    }

    function _cancelCall(
        address sender,
        uint256 task_id
    ) internal {
        require(sender != address(0), "ScheduleCall: the sender is the zero address");

        ScheduleCallLib.cancelCall(msg.sender, task_id);
        emit CanceledCall(msg.sender, task_id);
    }

    function _rescheduleCall(
        address sender,
        uint256 task_id,
        uint256 min_delay
    ) internal {
        require(sender != address(0), "ScheduleCall: the sender is the zero address");

        ScheduleCallLib.rescheduleCall(msg.sender, task_id, min_delay);
        emit RescheduledCall(msg.sender, task_id);
    }
}

