# IHoma

*Acala Developers*

> Homa Predeploy Contract Interface

You can use this predeploy contract to call homa pallet

*The interface through which solidity contracts will interact with homa pallet*

## Methods

### getCommissionRate

```solidity
function getCommissionRate() external view returns (uint256)
```

Get commission rate.




#### Returns

| Name | Type | Description |
|---|---|---|
| _0 | uint256 | returns (commission_rate) is a FixedU128 representing a decimal. |

### getEstimatedRewardRate

```solidity
function getEstimatedRewardRate() external view returns (uint256)
```

Get estimated reward rate.




#### Returns

| Name | Type | Description |
|---|---|---|
| _0 | uint256 | returns (reward_rate), value is FixedU128 with a range of [0.000000000000000000, 340282366920938463463.374607431768211455]. |

### getExchangeRate

```solidity
function getExchangeRate() external view returns (uint256)
```

Get exchange rate.




#### Returns

| Name | Type | Description |
|---|---|---|
| _0 | uint256 | returns (exchange_rate), value is FixedU128 with a range of [0.000000000000000000, 340282366920938463463.374607431768211455] |

### getFastMatchFee

```solidity
function getFastMatchFee() external view returns (uint256)
```

Get fast match fee rate.




#### Returns

| Name | Type | Description |
|---|---|---|
| _0 | uint256 | returns (fast_match_fee) is a FixedU128 representing a decimal. |

### mint

```solidity
function mint(uint256 mintAmount) external nonpayable returns (bool)
```

Mint liquid currency with staking currency.

*It&#39;ll emit an {Minted} event.*

#### Parameters

| Name | Type | Description |
|---|---|---|
| mintAmount | uint256 | The amount of staking currency used to mint liquid currency. |

#### Returns

| Name | Type | Description |
|---|---|---|
| _0 | bool | Returns a boolean value indicating whether the operation succeeded. |

### requestRedeem

```solidity
function requestRedeem(uint256 redeemAmount, bool fastMatch) external nonpayable returns (bool)
```

Request to redeem liquid curency for staking currency.

*It&#39;ll emit an {RequestedRedeem} event.*

#### Parameters

| Name | Type | Description |
|---|---|---|
| redeemAmount | uint256 | The amount of liquid currency to be requested  redeemed into Staking currency. |
| fastMatch | bool | Allow the request to be fast matched, fast match will take a fixed rate as fee. |

#### Returns

| Name | Type | Description |
|---|---|---|
| _0 | bool | Returns a boolean value indicating whether the operation succeeded. |



## Events

### Minted

```solidity
event Minted(address indexed sender, uint256 amount)
```

Minted liquid currency event.



#### Parameters

| Name | Type | Description |
|---|---|---|
| sender `indexed` | address | The sender of the transaction. |
| amount  | uint256 | The minted amount. |

### RequestedRedeem

```solidity
event RequestedRedeem(address indexed sender, uint256 amount, bool fastMatch)
```

Requested redeem event.



#### Parameters

| Name | Type | Description |
|---|---|---|
| sender `indexed` | address | The sender of the transaction. |
| amount  | uint256 | The requested amount. |
| fastMatch  | bool | Allow the request to be fast matched. |



