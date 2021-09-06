// SPDX-License-Identifier: GPL-3.0-or-later

pragma solidity ^0.7.0;

import "./ISchedule.sol";

contract Schedule is ISchedule {
    /**
     * @dev Schedule call the contract.
     * Returns a bytes value equal to the task_id of the task created.
     */
    function scheduleCall(
        address contract_address,
        uint256 value,
        uint256 gas_limit,
        uint256 storage_limit,
        uint256 min_delay,
        bytes memory input_data
    ) public override returns (bytes memory) {
        require(contract_address != address(0), "ScheduleCall: the contract_address is the zero address");
        require(input_data.length > 0, "ScheduleCall: input is null");

        bytes memory input = abi.encodeWithSignature("scheduleCall(address,address,uint256,uint256,uint256,bytes)", msg.sender, contract_address, value, gas_limit, storage_limit, min_delay, input_data);

        // Dynamic arrays will add the array size to the front of the array, so need extra 32 bytes.
        uint input_size = input.length + 32;

        uint256[4] memory output;

        assembly {
            if iszero(
                staticcall(gas(), 0x0000000000000000404, input, input_size, output, 0x80)
            ) {
                revert(0, 0)
            }
        }

        bytes memory result = abi.encodePacked(output);
        (bytes memory task_id) = abi.decode(result, (bytes));

        emit ScheduledCall(msg.sender, contract_address, task_id);
        return task_id;
    }

    /**
     * @dev Cancel schedule call the contract.
     * Returns a boolean value indicating whether the operation succeeded.
     */
    function cancelCall(
        bytes memory task_id
    ) public override returns (bool) {
        bytes memory input = abi.encodeWithSignature("cancelCall(address,bytes)", msg.sender, task_id);

        // Dynamic arrays will add the array size to the front of the array, so need extra 32 bytes.
        uint input_size = input.length + 32;

        assembly {
            if iszero(
                staticcall(gas(), 0x0000000000000000404, input, input_size, 0x00, 0x00)
            ) {
                revert(0, 0)
            }
        }

        emit CanceledCall(msg.sender, task_id);
        return true;
    }

    /**
     * @dev Reschedule call the contract.
     * Returns a boolean value indicating whether the operation succeeded.
     */
    function rescheduleCall(
        uint256 min_delay,
        bytes memory task_id
    ) public override returns (bool) {
        bytes memory input = abi.encodeWithSignature("rescheduleCall(address,uint256,bytes)", msg.sender, min_delay, task_id);

        // Dynamic arrays will add the array size to the front of the array, so need extra 32 bytes.
        uint input_size = input.length + 32;

        assembly {
            if iszero(
                staticcall(gas(), 0x0000000000000000404, input, input_size, 0x00, 0x00)
            ) {
                revert(0, 0)
            }
        }

        emit RescheduledCall(msg.sender, task_id);
        return true;
    }
}
