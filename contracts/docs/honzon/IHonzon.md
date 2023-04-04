# IHonzon

*Acala Developers*

> Honzon Predeploy Contract Interface

You can use this predeploy contract to call honzon pallet

*The interface through which solidity contracts will interact with honzon pallet*

## Methods

### adjustLoan

```solidity
function adjustLoan(address currencyId, int128 collateralAdjustment, int128 debitAdjustment) external nonpayable returns (bool)
```

Adjust CDP position.

*It&#39;ll emit an {AdjustedLoan} event.*

#### Parameters

| Name | Type | Description |
|---|---|---|
| currencyId | address | The collateral currency id. |
| collateralAdjustment | int128 | The signed amount, positive means to deposit collateral currency into CDP, negative means withdraw collateral currency from CDP. |
| debitAdjustment | int128 | The signed amount, positive means to issue some amount of stablecoin to caller according to the debit adjustment, negative means caller will payback some amount of stablecoin to CDP according to to the debit adjustment. |

#### Returns

| Name | Type | Description |
|---|---|---|
| _0 | bool | Returns a boolean value indicating whether the operation succeeded. |

### closeLoanByDex

```solidity
function closeLoanByDex(address currencyId, uint256 maxCollateralAmount) external nonpayable returns (bool)
```

Close CDP position with DEX.

*It&#39;ll emit an {ClosedLoanByDex} event.*

#### Parameters

| Name | Type | Description |
|---|---|---|
| currencyId | address | The collateral currency id. |
| maxCollateralAmount | uint256 | The max collateral amount which is used to swap enough stable token to clear debit. |

#### Returns

| Name | Type | Description |
|---|---|---|
| _0 | bool | Returns a boolean value indicating whether the operation succeeded. |

### getCollateralParameters

```solidity
function getCollateralParameters(address currencyId) external view returns (uint256[])
```

Get collateral parameters for a currencyId



#### Parameters

| Name | Type | Description |
|---|---|---|
| currencyId | address | The collateral currency id. |

#### Returns

| Name | Type | Description |
|---|---|---|
| _0 | uint256[] | Returns (params) which is an array with 5 entries in the order that follows: - [0] `maximum_total_debit_value`: Hardcap of total debit value generated from this collateral. - [1] `interest_rate_per_sec`: A FixedU128 representing a decimal value. Interest rate of CDP loan per second - [2] `liquidation_ratio`: A FixedU128 representing a decimal value. Liquidation ratio for this collateral type - [3] `liquidation_penalty`: A FixedU128 representing a decimal value. Penalty added on for getting liquidated - [4] `required_collateral_ratio`: A FixedU128 representing a decimal value. It cannot adjust the position of CDP so that the current collateral ratio is lower than the required collateral ratio. |

### getCurrentCollateralRatio

```solidity
function getCurrentCollateralRatio(address who, address currencyId) external view returns (uint256)
```

Get current collateral ratio for a particular CDP position



#### Parameters

| Name | Type | Description |
|---|---|---|
| who | address | The specified user. |
| currencyId | address | The collateral currency id. |

#### Returns

| Name | Type | Description |
|---|---|---|
| _0 | uint256 | Returns (current_collateral_ratio), value is FixedU128 with a range of [0.000000000000000000, 340282366920938463463.374607431768211455] |

### getDebitExchangeRate

```solidity
function getDebitExchangeRate(address currencyId) external view returns (uint256)
```

Get exchange rate of debit units to debit value for a currency_id



#### Parameters

| Name | Type | Description |
|---|---|---|
| currencyId | address | The collateral currency id. |

#### Returns

| Name | Type | Description |
|---|---|---|
| _0 | uint256 | Returns (exchange_rate), value is FixedU128 with a range of [0.000000000000000000, 340282366920938463463.374607431768211455] |

### getPosition

```solidity
function getPosition(address who, address currencyId) external view returns (uint256, uint256)
```

Get an open CDP position.



#### Parameters

| Name | Type | Description |
|---|---|---|
| who | address | The specified user. |
| currencyId | address | The collateral currency id. |

#### Returns

| Name | Type | Description |
|---|---|---|
| _0 | uint256 | Returns (collateral_amount, debit_amount). |
| _1 | uint256 | undefined |



## Events

### AdjustedLoan

```solidity
event AdjustedLoan(address indexed sender, address indexed currencyId, int128 collateralAdjustment, int128 debitAdjustment)
```

Adjusted Loan event.



#### Parameters

| Name | Type | Description |
|---|---|---|
| sender `indexed` | address | The sender of the transaction. |
| currencyId `indexed` | address | The collateral currency id. |
| collateralAdjustment  | int128 | The signed amount, positive means to deposit collateral currency into CDP, negative means withdraw collateral currency from CDP. |
| debitAdjustment  | int128 | The signed amount, positive means to issue some amount of stablecoin to caller according to the debit adjustment, negative means caller will payback some amount of stablecoin to CDP according to to the debit adjustment. |

### ClosedLoanByDex

```solidity
event ClosedLoanByDex(address indexed sender, address indexed currencyId)
```

Closed loan by DEX event.



#### Parameters

| Name | Type | Description |
|---|---|---|
| sender `indexed` | address | The sender of the transaction. |
| currencyId `indexed` | address | The collateral currency id. |



