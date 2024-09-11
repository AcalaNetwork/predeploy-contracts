# DEX

*Acala Developers*

> IDEX Predeploy Contract

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



