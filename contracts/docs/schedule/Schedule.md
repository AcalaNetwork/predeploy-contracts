# Schedule

*Acala Developers*

> Schedule Predeploy Contract

You can use this predeploy contract to call idle-schedule pallet

*This contracts will interact with idle-schedule pallet*

## Methods

### cancelCall

```solidity
function cancelCall(bytes taskId) external nonpayable returns (bool)
```

Cancel schedule call the contract.

*It&#39;ll emit an {CanceledCall} event.*

#### Parameters

| Name | Type | Description |
|---|---|---|
| taskId | bytes | The task id of the scheduler. Get it from the `ScheduledCall` event. |

#### Returns

| Name | Type | Description |
|---|---|---|
| _0 | bool | Returns a boolean value indicating whether the operation succeeded. |

### rescheduleCall

```solidity
function rescheduleCall(uint256 minDelay, bytes taskId) external nonpayable returns (bool)
```

Reschedule call the contract.

*It&#39;ll emit an {RescheduledCall} event.*

#### Parameters

| Name | Type | Description |
|---|---|---|
| minDelay | uint256 | The Minimum number of blocks before the scheduled call will be called. |
| taskId | bytes | The task id of the scheduler. Get it from the `ScheduledCall` event. |

#### Returns

| Name | Type | Description |
|---|---|---|
| _0 | bool | Returns a boolean value indicating whether the operation succeeded. |

### scheduleCall

```solidity
function scheduleCall(address contractAddress, uint256 value, uint256 gasLimit, uint256 storageLimit, uint256 minDelay, bytes inputData) external nonpayable returns (bytes)
```

Schedule call the contract.

*It&#39;ll emit an {ScheduledCall} event.*

#### Parameters

| Name | Type | Description |
|---|---|---|
| contractAddress | address | The contract address to be called in future. |
| value | uint256 | How much native token to send alone with the call. |
| gasLimit | uint256 | The gas limit for the call. Corresponding fee will be reserved upfront and refunded after call. |
| storageLimit | uint256 | The storage limit for the call. Corresponding fee will be reserved upfront and refunded after call. |
| minDelay | uint256 | Minimum number of blocks before the scheduled call will be called. |
| inputData | bytes | The input data to the call. |

#### Returns

| Name | Type | Description |
|---|---|---|
| _0 | bytes | Returns a bytes value equal to the taskId of the task created. |



## Events

### CanceledCall

```solidity
event CanceledCall(address indexed sender, bytes taskId)
```

The canceled call event.



#### Parameters

| Name | Type | Description |
|---|---|---|
| sender `indexed` | address | The sender of the transaction. |
| taskId  | bytes | The scheduled task id. |

### RescheduledCall

```solidity
event RescheduledCall(address indexed sender, bytes taskId)
```

The rescheduled call event.



#### Parameters

| Name | Type | Description |
|---|---|---|
| sender `indexed` | address | The sender of the transaction. |
| taskId  | bytes | The scheduled task id. |

### ScheduledCall

```solidity
event ScheduledCall(address indexed sender, address indexed contractAddress, bytes taskId)
```

The scheduled call event.



#### Parameters

| Name | Type | Description |
|---|---|---|
| sender `indexed` | address | The sender of the transaction. |
| contractAddress `indexed` | address | The scheduled contract address. |
| taskId  | bytes | The scheduled task id. |



