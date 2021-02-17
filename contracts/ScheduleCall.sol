pragma solidity ^0.5.0;

import "./ScheduleCallLib.sol";

contract ScheduleCall {
    event ScheduledCall(address indexed sender, address indexed contract_address, bytes task_id);
    event CanceledCall(address indexed sender, bytes task_id);
    event RescheduledCall(address indexed sender, bytes task_id);
    
    event Test(uint256 indexed _1, uint256 indexed _2, uint256 indexed _3);
    event Test2(bytes task_id);
    event Test3(bytes _1, bytes _2);
    /**
     * @dev Schedule call the contract.
     * Returns a boolean value indicating whether the operation succeeded.
     */
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

    /**
     * @dev Cancel schedule call the contract.
     * Returns a boolean value indicating whether the operation succeeded.
     */
    function cancelCall(
        bytes memory task_id
    ) public returns (bool) {
        _cancelCall(msg.sender, task_id);
        return true;
    }

    /**
     * @dev Reschedule call the contract.
     * Returns a boolean value indicating whether the operation succeeded.
     */
    function rescheduleCall(
        uint256 min_delay,
        bytes memory task_id
    ) public returns (bool) {
        _rescheduleCall(msg.sender, min_delay, task_id);
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
        require(input_data.length > 0, "ScheduleCall: input is null");

        //bytes memory task_id = ScheduleCallLib.scheduleCall(msg.sender, contract_address, value, gas_limit, storage_limit, min_delay, input_data);
        uint256[3] memory output = ScheduleCallLib.scheduleCall(msg.sender, contract_address, value, gas_limit, storage_limit, min_delay, input_data);
        emit Test(output[0], output[1], output[2]);
        bytes memory task_id = abi.encodePacked(output[0], output[1]);
        emit Test2(task_id);
        emit Test3(abi.encodePacked(output[0]), abi.encodePacked(output[1]));

        //emit ScheduledCall(msg.sender, contract_address, task_id);
    }

    function _cancelCall(
        address sender,
        bytes memory task_id
    ) internal {
        require(sender != address(0), "ScheduleCall: the sender is the zero address");

        ScheduleCallLib.cancelCall(msg.sender, task_id);
        emit CanceledCall(msg.sender, task_id);
    }

    function _rescheduleCall(
        address sender,
        uint256 min_delay,
        bytes memory task_id
    ) internal {
        require(sender != address(0), "ScheduleCall: the sender is the zero address");

        ScheduleCallLib.rescheduleCall(msg.sender, min_delay, task_id);
        emit RescheduledCall(msg.sender, task_id);
    }
}

