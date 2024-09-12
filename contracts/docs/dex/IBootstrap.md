# IBootstrap

*Acala Developers*

> IBootstrap Predeploy Contract Interface

You can use this predeploy contract to call the bootstrap functions of dex pallet

*The interface through which solidity contracts will interact with dex pallet*

## Methods

### addProvision

```solidity
function addProvision(address tokenA, address tokenB, uint256 amountA, uint256 amountB) external nonpayable returns (bool)
```

Add provision to the bootstraping trading pair.

*It&#39;ll emit an {AddProvision} event.*

#### Parameters

| Name | Type | Description |
|---|---|---|
| tokenA | address | The ERC20 address of the tokenA. |
| tokenB | address | The ERC20 address of the tokenB. |
| amountA | uint256 | The amount of tokenA contribute to liquidity pool. |
| amountB | uint256 | The amount of tokenB contribute to liquidity pool. |

#### Returns

| Name | Type | Description |
|---|---|---|
| _0 | bool | Returns a boolean value indicating whether the operation succeeded. |

### claimDexShare

```solidity
function claimDexShare(address who, address tokenA, address tokenB) external nonpayable returns (bool)
```

Claim share token of the ended bootstrap trading pair for `who`.

*It&#39;ll emit an {ClaimShare} event.*

#### Parameters

| Name | Type | Description |
|---|---|---|
| who | address | The contributor. |
| tokenA | address | The ERC20 address of the tokenA. |
| tokenB | address | The ERC20 address of the tokenB. |

#### Returns

| Name | Type | Description |
|---|---|---|
| _0 | bool | Returns a boolean value indicating whether the operation succeeded. |

### getInitialShareExchangeRate

```solidity
function getInitialShareExchangeRate(address tokenA, address tokenB) external view returns (uint256, uint256)
```

Get the initial share exchange rate of the ended provision pool of tokenA and tokenB. 100% = 1**18



#### Parameters

| Name | Type | Description |
|---|---|---|
| tokenA | address | The ERC20 address of the tokenA. |
| tokenB | address | The ERC20 address of the tokenB. |

#### Returns

| Name | Type | Description |
|---|---|---|
| _0 | uint256 | Returns (rateA, rateB). |
| _1 | uint256 | undefined |

### getProvisionPool

```solidity
function getProvisionPool(address tokenA, address tokenB) external view returns (uint256, uint256)
```

Get total provision pool of the tokenA and tokenB.



#### Parameters

| Name | Type | Description |
|---|---|---|
| tokenA | address | The ERC20 address of the tokenA. |
| tokenB | address | The ERC20 address of the tokenB. |

#### Returns

| Name | Type | Description |
|---|---|---|
| _0 | uint256 | Returns (provision_a, provision_b). |
| _1 | uint256 | undefined |

### getProvisionPoolOf

```solidity
function getProvisionPoolOf(address who, address tokenA, address tokenB) external view returns (uint256, uint256)
```

Get who&#39;s provision of the tokenA and tokenB.



#### Parameters

| Name | Type | Description |
|---|---|---|
| who | address | The contributor. |
| tokenA | address | The ERC20 address of the tokenA. |
| tokenB | address | The ERC20 address of the tokenB. |

#### Returns

| Name | Type | Description |
|---|---|---|
| _0 | uint256 | Returns (provision_a, provision_b). |
| _1 | uint256 | undefined |

### refundProvision

```solidity
function refundProvision(address who, address tokenA, address tokenB) external nonpayable returns (bool)
```

Refund the contribution token of the aborted bootstrap trading pair for `who`.



#### Parameters

| Name | Type | Description |
|---|---|---|
| who | address | The contributor. |
| tokenA | address | The ERC20 address of the tokenA. |
| tokenB | address | The ERC20 address of the tokenB. |

#### Returns

| Name | Type | Description |
|---|---|---|
| _0 | bool | Returns a boolean value indicating whether the operation succeeded. |



## Events

### AddProvision

```solidity
event AddProvision(address indexed sender, address indexed tokenA, address indexed tokenB, uint256 amountA, uint256 amountB)
```

AddProvision event.



#### Parameters

| Name | Type | Description |
|---|---|---|
| sender `indexed` | address | The sender of the transaction. |
| tokenA `indexed` | address | The ERC20 address of the tokenA. |
| tokenB `indexed` | address | The ERC20 address of the tokenB. |
| amountA  | uint256 | The amount of tokenA contribute to provision pool. |
| amountB  | uint256 | The amount of tokenB contribute to provision pool. |

### ClaimShare

```solidity
event ClaimShare(address indexed who, address indexed tokenA, address indexed tokenB, uint256 amount)
```

Claim share event.



#### Parameters

| Name | Type | Description |
|---|---|---|
| who `indexed` | address | The owner of the claimed share. |
| tokenA `indexed` | address | The ERC20 address of the tokenA. |
| tokenB `indexed` | address | The ERC20 address of the tokenB. |
| amount  | uint256 | The amount of claimed share token. |



