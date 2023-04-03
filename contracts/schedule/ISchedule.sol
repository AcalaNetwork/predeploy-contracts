// SPDX-License-Identifier: GPL-3.0-or-later

pragma solidity ^0.8.0;

/// @title Schedule Predeploy Contract Interface
/// @author Acala Developers
/// @notice You can use this predeploy contract to call idle-schedule pallet
/// @dev The interface through which solidity contracts will interact with idle-schedule pallet
interface ISchedule {
    /// @notice The scheduled call event.
    /// @param sender The sender of the transaction.
    /// @param contractAddress The scheduled contract address.
    /// @param taskId The scheduled task id.
    event ScheduledCall(
        address indexed sender,
        address indexed contractAddress,
        bytes taskId
    );

    /// @notice The canceled call event.
    /// @param sender The sender of the transaction.
    /// @param taskId The scheduled task id.
    event CanceledCall(address indexed sender, bytes taskId);

    /// @notice The rescheduled call event.
    /// @param sender The sender of the transaction.
    /// @param taskId The scheduled task id.
    event RescheduledCall(address indexed sender, bytes taskId);

    /// @notice Schedule call the contract.
    /// @dev It'll emit an {ScheduledCall} event.
    /// @param contractAddress The contract address to be called in future.
    /// @param value How much native token to send alone with the call.
    /// @param gasLimit The gas limit for the call. Corresponding fee will be reserved upfront and refunded after call.
    /// @param storageLimit The storage limit for the call.
    /// Corresponding fee will be reserved upfront and refunded after call.
    /// @param minDelay Minimum number of blocks before the scheduled call will be called.
    /// @param inputData The input data to the call.
    /// @return Returns a bytes value equal to the taskId of the task created.
    function scheduleCall(
        address contractAddress,
        uint256 value,
        uint256 gasLimit,
        uint256 storageLimit,
        uint256 minDelay,
        bytes calldata inputData
    ) external returns (bytes memory);

    /// @notice Cancel schedule call the contract.
    /// @dev It'll emit an {CanceledCall} event.
    /// @param taskId The task id of the scheduler. Get it from the `ScheduledCall` event.
    /// @return Returns a boolean value indicating whether the operation succeeded.
    function cancelCall(bytes calldata taskId) external returns (bool);

    /// @notice Reschedule call the contract.
    /// @dev It'll emit an {RescheduledCall} event.
    /// @param minDelay The Minimum number of blocks before the scheduled call will be called.
    /// @param taskId The task id of the scheduler. Get it from the `ScheduledCall` event.
    /// @return Returns a boolean value indicating whether the operation succeeded.
    function rescheduleCall(
        uint256 minDelay,
        bytes calldata taskId
    ) external returns (bool);
}
