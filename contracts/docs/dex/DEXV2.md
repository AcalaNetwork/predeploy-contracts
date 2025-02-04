# DEXV2

*Acala Developers*

> DEX Predeploy Contract, V2, support bootstrap

You can use this predeploy contract to call dex pallet

*This contracts will interact with dex pallet*

## Methods

### addLiquidity

```solidity
function addLiquidity(address tokenA, address tokenB, uint256 maxAmountA, uint256 maxAmountB, uint256 minShareIncrement) external nonpayable returns (bool)
```

Add liquidity to the trading pair.

*It&#39;ll emit an {AddedLiquidity} event.*

#### Parameters

| Name | Type | Description |
|---|---|---|
| tokenA | address | The ERC20 address of the currency_id_a. |
| tokenB | address | The ERC20 address of the currency_id_b. |
| maxAmountA | uint256 | The maximum amount of currency_id_a is allowed to inject to liquidity pool. |
| maxAmountB | uint256 | The maximum amount of currency_id_b is allowed to inject to liquidity pool. |
| minShareIncrement | uint256 | The minimum acceptable share amount. |

#### Returns

| Name | Type | Description |
|---|---|---|
| _0 | bool | Returns a boolean value indicating whether the operation succeeded. |

### addProvision

```solidity
function addProvision(address tokenA, address tokenB, uint256 amountA, uint256 amountB) external nonpayable returns (bool)
```

Add provision to the bootstrapping trading pair.

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

### getLiquidityPool

```solidity
function getLiquidityPool(address tokenA, address tokenB) external view returns (uint256, uint256)
```

Get liquidity pool of the currency_id_a and currency_id_b.



#### Parameters

| Name | Type | Description |
|---|---|---|
| tokenA | address | The ERC20 address of the currency_id_a. |
| tokenB | address | The ERC20 address of the currency_id_b. |

#### Returns

| Name | Type | Description |
|---|---|---|
| _0 | uint256 | Returns (liquidity_a, liquidity_b). |
| _1 | uint256 | undefined |

### getLiquidityTokenAddress

```solidity
function getLiquidityTokenAddress(address tokenA, address tokenB) external view returns (address)
```

Get liquidity token address.



#### Parameters

| Name | Type | Description |
|---|---|---|
| tokenA | address | The ERC20 address of the currency_id_a. |
| tokenB | address | The ERC20 address of the currency_id_b. |

#### Returns

| Name | Type | Description |
|---|---|---|
| _0 | address | Returns (liquidity_token_address). Return address(0x0) if the liquidity token address is not mapped. |

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

### getSwapSupplyAmount

```solidity
function getSwapSupplyAmount(address[] path, uint256 targetAmount) external view returns (uint256)
```

Get swap supply amount.



#### Parameters

| Name | Type | Description |
|---|---|---|
| path | address[] | The trading path of the transaction. |
| targetAmount | uint256 | The exact target amount. |

#### Returns

| Name | Type | Description |
|---|---|---|
| _0 | uint256 | Returns (supply_amount). Returns 0 if getting the supply amount fails. |

### getSwapTargetAmount

```solidity
function getSwapTargetAmount(address[] path, uint256 supplyAmount) external view returns (uint256)
```

Get swap target amount.



#### Parameters

| Name | Type | Description |
|---|---|---|
| path | address[] | The trading path of the transaction. |
| supplyAmount | uint256 | The exact supply amount. |

#### Returns

| Name | Type | Description |
|---|---|---|
| _0 | uint256 | Returns (target_amount). Returns 0 if getting the target amount fails. |

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

### removeLiquidity

```solidity
function removeLiquidity(address tokenA, address tokenB, uint256 removeShare, uint256 minWithdrawnA, uint256 minWithdrawnB) external nonpayable returns (bool)
```

Remove liquidity from the trading pair.

*It&#39;ll emit an {RemovedLiquidity} event.*

#### Parameters

| Name | Type | Description |
|---|---|---|
| tokenA | address | The ERC20 address of the currency_id_a. |
| tokenB | address | The ERC20 address of the currency_id_b. |
| removeShare | uint256 | The liquidity amount to remove. |
| minWithdrawnA | uint256 | The minimum acceptable withrawn for currency_id_a. |
| minWithdrawnB | uint256 | The minimum acceptable withrawn for currency_id_b. |

#### Returns

| Name | Type | Description |
|---|---|---|
| _0 | bool | Returns a boolean value indicating whether the operation succeeded. |

### swapWithExactSupply

```solidity
function swapWithExactSupply(address[] path, uint256 supplyAmount, uint256 minTargetAmount) external nonpayable returns (bool)
```

Swap with exact supply.

*It&#39;ll emit an {Swapped} event.*

#### Parameters

| Name | Type | Description |
|---|---|---|
| path | address[] | The trading path of the swap transaction. |
| supplyAmount | uint256 | The exact gsupply amount. |
| minTargetAmount | uint256 | The acceptable minimum target amount. |

#### Returns

| Name | Type | Description |
|---|---|---|
| _0 | bool | Returns a boolean value indicating whether the operation succeeded. |

### swapWithExactTarget

```solidity
function swapWithExactTarget(address[] path, uint256 targetAmount, uint256 maxSupplyAmount) external nonpayable returns (bool)
```

Swap with exact target.

*It&#39;ll emit an {Swapped} event.*

#### Parameters

| Name | Type | Description |
|---|---|---|
| path | address[] | The trading path of the swap transaction. |
| targetAmount | uint256 | The exact target amount. |
| maxSupplyAmount | uint256 | The acceptable maximum supply amount. |

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

### AddedLiquidity

```solidity
event AddedLiquidity(address indexed sender, address indexed tokenA, address indexed tokenB, uint256 maxAmountA, uint256 maxAmountB)
```

Added liquidity event.



#### Parameters

| Name | Type | Description |
|---|---|---|
| sender `indexed` | address | The sender of the transaction. |
| tokenA `indexed` | address | The ERC20 address of the currency_id_a. |
| tokenB `indexed` | address | The ERC20 address of the currency_id_b. |
| maxAmountA  | uint256 | The maximum amount of currency_id_a is allowed to inject to liquidity pool. |
| maxAmountB  | uint256 | The maximum amount of currency_id_b is allowed to inject to liquidity pool. |

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

### RemovedLiquidity

```solidity
event RemovedLiquidity(address indexed sender, address indexed tokenA, address indexed tokenB, uint256 removeShare)
```

Removed liquidity event.



#### Parameters

| Name | Type | Description |
|---|---|---|
| sender `indexed` | address | The sender of the transaction. |
| tokenA `indexed` | address | The ERC20 address of the currency_id_a. |
| tokenB `indexed` | address | The ERC20 address of the currency_id_b. |
| removeShare  | uint256 | The liquidity amount has been removed. |

### Swapped

```solidity
event Swapped(address indexed sender, address[] path, uint256 supplyAmount, uint256 targetAmount)
```

Swapped event with DEX.



#### Parameters

| Name | Type | Description |
|---|---|---|
| sender `indexed` | address | The sender of the transaction. |
| path  | address[] | The trading path of the swap transaction. |
| supplyAmount  | uint256 | The exact supply amount. |
| targetAmount  | uint256 | The exact target amount. |



