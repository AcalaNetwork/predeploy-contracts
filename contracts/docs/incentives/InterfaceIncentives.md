# InterfaceIncentives

*Acala Developers*

> Incentives Predeploy Contract Interface

You can use this predeploy contract to call incentives pallet

*The interface through which solidity contracts will interact with incentives pallet*

## Methods

### claimRewards

```solidity
function claimRewards(enum InterfaceIncentives.PoolId pool, address poolCurrencyId) external nonpayable returns (bool)
```

Claim all available multi currencies rewards for specific PoolId.

*It&#39;ll emit an {ClaimedRewards} event.*

#### Parameters

| Name | Type | Description |
|---|---|---|
| pool | enum InterfaceIncentives.PoolId | The pool type. |
| poolCurrencyId | address | The LP token currency id. |

#### Returns

| Name | Type | Description |
|---|---|---|
| _0 | bool | Returns a boolean value indicating whether the operation succeeded. |

### depositDexShare

```solidity
function depositDexShare(address currencyId, uint256 amount) external nonpayable returns (bool)
```

Stake LP token to add shares to PoolId::Dex.

*It&#39;ll emit an {DepositedShare} event.*

#### Parameters

| Name | Type | Description |
|---|---|---|
| currencyId | address | The LP token currency id. |
| amount | uint256 | The amount to stake. |

#### Returns

| Name | Type | Description |
|---|---|---|
| _0 | bool | Returns a boolean value indicating whether the operation succeeded. |

### getClaimRewardDeductionRate

```solidity
function getClaimRewardDeductionRate(enum InterfaceIncentives.PoolId pool, address poolCurrencyId) external view returns (uint256)
```

Gets deduction rate for claiming reward early.



#### Parameters

| Name | Type | Description |
|---|---|---|
| pool | enum InterfaceIncentives.PoolId | The pool type. |
| poolCurrencyId | address | The LP token currency id. |

#### Returns

| Name | Type | Description |
|---|---|---|
| _0 | uint256 | Returns (claim_reward_deduction_rate) as a FixedU128 representing a decimal value. |

### getIncentiveRewardAmount

```solidity
function getIncentiveRewardAmount(enum InterfaceIncentives.PoolId pool, address poolCurrencyId, address rewardCurrencyId) external view returns (uint256)
```

Gets reward amount in `rewardCurrency` added per period.



#### Parameters

| Name | Type | Description |
|---|---|---|
| pool | enum InterfaceIncentives.PoolId | The pool type. |
| poolCurrencyId | address | The LP token currency id. |
| rewardCurrencyId | address | The reward currency id. |

#### Returns

| Name | Type | Description |
|---|---|---|
| _0 | uint256 | Returns (reward_amount). |

### getPendingRewards

```solidity
function getPendingRewards(address[] currencyIds, enum InterfaceIncentives.PoolId pool, address poolCurrencyId, address who) external view returns (uint256[])
```

Gets the pending rewards for a pool, actual reward could be deducted.



#### Parameters

| Name | Type | Description |
|---|---|---|
| currencyIds | address[] | undefined |
| pool | enum InterfaceIncentives.PoolId | The pool type. |
| poolCurrencyId | address | The LP token currency id. |
| who | address | The specified user. |

#### Returns

| Name | Type | Description |
|---|---|---|
| _0 | uint256[] | Returns (balances), an array of reward balances corresponding to currencyIds. |

### withdrawDexShare

```solidity
function withdrawDexShare(address currencyId, uint256 amount) external nonpayable returns (bool)
```

Unstake LP token to remove shares from PoolId::Dex.

*It&#39;ll emit an {WithdrewShare} event.*

#### Parameters

| Name | Type | Description |
|---|---|---|
| currencyId | address | The LP token currency id. |
| amount | uint256 | The amount to unstake. |

#### Returns

| Name | Type | Description |
|---|---|---|
| _0 | bool | Returns a boolean value indicating whether the operation succeeded. |



## Events

### ClaimedRewards

```solidity
event ClaimedRewards(address indexed sender, enum InterfaceIncentives.PoolId indexed pool, address indexed poolCurrencyId)
```

The Claimed rewards event.



#### Parameters

| Name | Type | Description |
|---|---|---|
| sender `indexed` | address | The sender of the transaction. |
| pool `indexed` | enum InterfaceIncentives.PoolId | The pool type. |
| poolCurrencyId `indexed` | address | The LP token currency id. |

### DepositedShare

```solidity
event DepositedShare(address indexed sender, address indexed currencyId, uint256 amount)
```

The deposited share event.



#### Parameters

| Name | Type | Description |
|---|---|---|
| sender `indexed` | address | The sender of the transaction. |
| currencyId `indexed` | address | The LP token currency id. |
| amount  | uint256 | The amount to stake. |

### WithdrewShare

```solidity
event WithdrewShare(address indexed sender, address indexed currencyId, uint256 amount)
```

The withdrew share event.



#### Parameters

| Name | Type | Description |
|---|---|---|
| sender `indexed` | address | The sender of the transaction. |
| currencyId `indexed` | address | The LP token currency id. |
| amount  | uint256 | The amount to unstake. |



