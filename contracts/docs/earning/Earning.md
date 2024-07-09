# Earning

*Acala Developers*

> Earning Predeploy Contract

You can use this predeploy contract to call earning pallet

*This contracts will interact with earning pallet*

## Methods

### bond

```solidity
function bond(uint256 bondAmount) external nonpayable returns (bool)
```

Bond.

*It&#39;ll emit an {Bonded} event.*

#### Parameters

| Name | Type | Description |
|---|---|---|
| bondAmount | uint256 | The amount of native currency used to bond. |

#### Returns

| Name | Type | Description |
|---|---|---|
| _0 | bool | Returns a boolean value indicating whether the operation succeeded. |

### getBondingLedger

```solidity
function getBondingLedger(address who) external view returns (struct IEarning.BondingLedger)
```

Get bonding ledger of `who`.



#### Parameters

| Name | Type | Description |
|---|---|---|
| who | address | undefined |

#### Returns

| Name | Type | Description |
|---|---|---|
| _0 | IEarning.BondingLedger | returns (BondingLedger). |

### getInstantUnstakeFee

```solidity
function getInstantUnstakeFee() external view returns (uint256, uint256)
```

Get instant unstake fee ratio.




#### Returns

| Name | Type | Description |
|---|---|---|
| _0 | uint256 | returns (percent, accuracy), the ratio is percent/accuracy |
| _1 | uint256 | undefined |

### getMaxUnbondingChunks

```solidity
function getMaxUnbondingChunks() external view returns (uint256)
```

Get the maximum unlocking chunk amount.




#### Returns

| Name | Type | Description |
|---|---|---|
| _0 | uint256 | returns (maximum_chunks). |

### getMinBond

```solidity
function getMinBond() external view returns (uint256)
```

Get the minimum bond amount.




#### Returns

| Name | Type | Description |
|---|---|---|
| _0 | uint256 | returns (min_bond). |

### getUnbondingPeriod

```solidity
function getUnbondingPeriod() external view returns (uint256)
```

Get unlocking block.




#### Returns

| Name | Type | Description |
|---|---|---|
| _0 | uint256 | returns (unlock_block_number). |

### rebond

```solidity
function rebond(uint256 rebondAmount) external nonpayable returns (bool)
```

Rebond.

*It&#39;ll emit an {Bonded} event.*

#### Parameters

| Name | Type | Description |
|---|---|---|
| rebondAmount | uint256 | The amount of native currency used to rebond. |

#### Returns

| Name | Type | Description |
|---|---|---|
| _0 | bool | Returns a boolean value indicating whether the operation succeeded. |

### unbond

```solidity
function unbond(uint256 unbondAmount) external nonpayable returns (bool)
```

Unbond.

*It&#39;ll emit an {Unbonded} event.*

#### Parameters

| Name | Type | Description |
|---|---|---|
| unbondAmount | uint256 | The amount of native currency used to unbond. |

#### Returns

| Name | Type | Description |
|---|---|---|
| _0 | bool | Returns a boolean value indicating whether the operation succeeded. |

### unbondInstant

```solidity
function unbondInstant(uint256 unbondAmount) external nonpayable returns (bool)
```

Unbond instant.

*It&#39;ll emit an {Unbonded} event.*

#### Parameters

| Name | Type | Description |
|---|---|---|
| unbondAmount | uint256 | The amount of native currency used to unbond instant. |

#### Returns

| Name | Type | Description |
|---|---|---|
| _0 | bool | Returns a boolean value indicating whether the operation succeeded. |

### withdrawUnbonded

```solidity
function withdrawUnbonded() external nonpayable returns (bool)
```

Withdraw unbonded.

*It&#39;ll emit an {Withdrawn} event.*


#### Returns

| Name | Type | Description |
|---|---|---|
| _0 | bool | Returns a boolean value indicating whether the operation succeeded. |



## Events

### Bonded

```solidity
event Bonded(address indexed sender, uint256 amount)
```

Bonded event.



#### Parameters

| Name | Type | Description |
|---|---|---|
| sender `indexed` | address | The sender of the transaction. |
| amount  | uint256 | The bond amount. |

### Unbonded

```solidity
event Unbonded(address indexed sender, uint256 amount)
```

Unbonded event.



#### Parameters

| Name | Type | Description |
|---|---|---|
| sender `indexed` | address | The sender of the transaction. |
| amount  | uint256 | The unbond amount. |

### Withdrawn

```solidity
event Withdrawn(address indexed sender, uint256 amount)
```

Withdraw unbonded.



#### Parameters

| Name | Type | Description |
|---|---|---|
| sender `indexed` | address | The sender of the transaction. |
| amount  | uint256 | The withdrawn unbonded amount. |



