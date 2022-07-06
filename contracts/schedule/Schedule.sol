// SPDX-License-Identifier: GPL-3.0-or-later

pragma solidity ^0.7.0;

import "./ISchedule.sol";

contract Schedule is ISchedule {
    address constant private PRECOMPILE = address(0x0000000000000000000000000000000000000404);

    /**
     * @dev Schedule call the contract.
     * Returns a bytes value equal to the taskId of the task created.
     */
    function scheduleCall(
        address contractAddress,
        uint256 value,
        uint256 gasLimit,
        uint256 storageLimit,
        uint256 minDelay,
        bytes memory inputData
    ) public override returns (bytes memory) {
        require(contractAddress != address(0), "ScheduleCall: the contractAddress is the zero address");
        require(inputData.length > 0, "ScheduleCall: input is null");

        (bool success, bytes memory returnData) = PRECOMPILE.call(
            abi.encodeWithSignature(
                "scheduleCall(address,address,uint256,uint256,uint256,bytes)",
                msg.sender, contractAddress, value, gasLimit, storageLimit, minDelay, inputData
            )
        );
        assembly {
            if eq(success, 0) {
                revert(add(returnData, 0x20), returndatasize())
            }
        }

        (bytes memory taskId) = abi.decode(returnData, (bytes));

        emit ScheduledCall(msg.sender, contractAddress, taskId);
        return taskId;
    }

    /**
     * @dev Cancel schedule call the contract.
     * Returns a boolean value indicating whether the operation succeeded.
     */
    function cancelCall(
        bytes memory taskId
    ) public override returns (bool) {
        (bool success, bytes memory returnData) = PRECOMPILE.call(
            abi.encodeWithSignature("cancelCall(address,bytes)", msg.sender, taskId)
        );
        assembly {
            if eq(success, 0) {
                revert(add(returnData, 0x20), returndatasize())
            }
        }

        emit CanceledCall(msg.sender, taskId);
        return true;
    }

    /**
     * @dev Reschedule call the contract.
     * Returns a boolean value indicating whether the operation succeeded.
     */
    function rescheduleCall(
        uint256 minDelay,
        bytes memory taskId
    ) public override returns (bool) {
        (bool success, bytes memory returnData) = PRECOMPILE.call(
            abi.encodeWithSignature("rescheduleCall(address,uint256,bytes)", msg.sender, minDelay, taskId)
        );
        assembly {
            if eq(success, 0) {
                revert(add(returnData, 0x20), returndatasize())
            }
        }

        emit RescheduledCall(msg.sender, taskId);
        return true;
    }
}
