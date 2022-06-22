// SPDX-License-Identifier: GPL-3.0-or-later

pragma solidity ^0.8.0;

interface ISchedule {
    event ScheduledCall(address indexed sender, address indexed contractAddress, bytes taskId);
    event CanceledCall(address indexed sender, bytes taskId);
    event RescheduledCall(address indexed sender, bytes taskId);

    // Schedule call the contract.
    // Returns a boolean value indicating whether the operation succeeded.
    function scheduleCall(
        address contractAddress, // The contract address to be called in future.
        uint256 value, // How much native token to send alone with the call.
        // The gas limit for the call. Corresponding fee will be reserved upfront and refunded after call.
        uint256 gasLimit,
        // The storage limit for the call. Corresponding fee will be reserved upfront and refunded after call.
        uint256 storageLimit,
        uint256 minDelay, // Minimum number of blocks before the scheduled call will be called.
        bytes calldata inputData // The input data to the call.
    )
    external
    returns (bytes memory); // Returns a bytes value equal to the taskId of the task created.

    // Cancel schedule call the contract.
    // Returns a boolean value indicating whether the operation succeeded.
    function cancelCall(
        bytes calldata taskId // The task id of the scheduler. Get it from the `ScheduledCall` event.
    )
    external
    returns (bool); // Returns a boolean value indicating whether the operation succeeded.

    // Reschedule call the contract.
    // Returns a boolean value indicating whether the operation succeeded.
    function rescheduleCall(
        uint256 minDelay, // Minimum number of blocks before the scheduled call will be called.
        bytes calldata taskId // The task id of the scheduler. Get it from the `ScheduledCall` event.
    )
    external
    returns (bool); // Returns a boolean value indicating whether the operation succeeded.
}
