// SPDX-License-Identifier: GPL-3.0-or-later

pragma solidity ^0.8.0;

import "./ISchedule.sol";

/// @title Schedule Predeploy Contract
/// @author Acala Developers
/// @notice You can use this predeploy contract to call idle-schedule pallet
/// @dev This contracts will interact with idle-schedule pallet
contract Schedule is ISchedule {
    /// @dev The Schedule precompile address.
    address constant private PRECOMPILE = address(0x0000000000000000000000000000000000000404);

    /// @inheritdoc ISchedule
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

    /// @inheritdoc ISchedule
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

    /// @inheritdoc ISchedule
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
