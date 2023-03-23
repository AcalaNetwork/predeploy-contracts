# Oracle

*Acala Developers*

> Oracle Predeploy Contract Interface

You can use this predeploy contract to call oracle pallet

*The interface through which solidity contracts will interact with oracle pallet*

## Methods

### getPrice

```solidity
function getPrice(address token) external view returns (uint256)
```

Get the price of the currency_id.



#### Parameters

| Name | Type | Description |
|---|---|---|
| token | address | The ERC20 address of currency_id. |

#### Returns

| Name | Type | Description |
|---|---|---|
| _0 | uint256 | Returns the (price, timestamp). |




