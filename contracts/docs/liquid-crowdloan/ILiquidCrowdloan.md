# ILiquidCrowdloan

*Acala Developers*

> Liquid Crowdloan Predeploy Contract Interface

You can use this predeploy contract to call liquid-crowdloan pallet

*The interface through which solidity contracts will interact with liquid-crowdloan pallet*

## Methods

### getRedeemCurrency

```solidity
function getRedeemCurrency() external view returns (address)
```

Get the redeem currency address.




#### Returns

| Name | Type | Description |
|---|---|---|
| _0 | address | Returns the redeem currency address. |

### redeem

```solidity
function redeem(uint256 amount) external nonpayable returns (uint256)
```

Redeem LCDOT.

*It&#39;ll emit an {Redeemed} event. Use {getRedeemCurrency} to check the redeem currency.*

#### Parameters

| Name | Type | Description |
|---|---|---|
| amount | uint256 | The amount of LCDOT to redeem. |

#### Returns

| Name | Type | Description |
|---|---|---|
| _0 | uint256 | Returns how much redeem token is received. |



## Events

### Redeemed

```solidity
event Redeemed(address indexed sender, uint256 amount, uint256 redeemAmount)
```

LCDOT is redeemed.



#### Parameters

| Name | Type | Description |
|---|---|---|
| sender `indexed` | address | The sender of the transaction. |
| amount  | uint256 | The redeem amount in LCDOT. |
| redeemAmount  | uint256 | The redeem amount in redeem token. |



