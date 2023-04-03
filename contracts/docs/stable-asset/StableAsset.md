# StableAsset

*Acala Developers*

> StableAsset Predeploy Contract

You can use this predeploy contract to call stable-asset pallet

*This contracts will interact with stable-asset pallet*

## Methods

### getStableAssetPoolMintFee

```solidity
function getStableAssetPoolMintFee(uint32 poolId) external view returns (bool, uint256)
```

Get stable asset pool mint fee.



#### Parameters

| Name | Type | Description |
|---|---|---|
| poolId | uint32 | The ID of the pool. |

#### Returns

| Name | Type | Description |
|---|---|---|
| _0 | bool | poolExists whether pool exists or not. |
| _1 | uint256 | mintFee mint fee value. |

### getStableAssetPoolPrecision

```solidity
function getStableAssetPoolPrecision(uint32 poolId) external view returns (bool, uint256)
```

Get stable asset pool precision.



#### Parameters

| Name | Type | Description |
|---|---|---|
| poolId | uint32 | The ID of the pool. |

#### Returns

| Name | Type | Description |
|---|---|---|
| _0 | bool | poolExists whether pool exists or not. |
| _1 | uint256 | precision precision value. |

### getStableAssetPoolRedeemFee

```solidity
function getStableAssetPoolRedeemFee(uint32 poolId) external view returns (bool, uint256)
```

Get stable asset pool redeem fee.



#### Parameters

| Name | Type | Description |
|---|---|---|
| poolId | uint32 | The ID of the pool. |

#### Returns

| Name | Type | Description |
|---|---|---|
| _0 | bool | poolExists whether pool exists or not. |
| _1 | uint256 | redeemFee redeem fee value. |

### getStableAssetPoolSwapFee

```solidity
function getStableAssetPoolSwapFee(uint32 poolId) external view returns (bool, uint256)
```

Get stable asset pool swap fee.



#### Parameters

| Name | Type | Description |
|---|---|---|
| poolId | uint32 | The ID of the pool. |

#### Returns

| Name | Type | Description |
|---|---|---|
| _0 | bool | poolExists whether pool exists or not. |
| _1 | uint256 | swapFee swap fee value. |

### getStableAssetPoolTokens

```solidity
function getStableAssetPoolTokens(uint32 poolId) external view returns (bool, address[])
```

Get stable asset pool tokens.



#### Parameters

| Name | Type | Description |
|---|---|---|
| poolId | uint32 | The ID of the pool. |

#### Returns

| Name | Type | Description |
|---|---|---|
| _0 | bool | poolExists whether pool exists or not. |
| _1 | address[] | tokens stabel asset pool tokens. |

### getStableAssetPoolTotalSupply

```solidity
function getStableAssetPoolTotalSupply(uint32 poolId) external view returns (bool, uint256)
```

Get stable asset pool total supply.



#### Parameters

| Name | Type | Description |
|---|---|---|
| poolId | uint32 | The ID of the pool. |

#### Returns

| Name | Type | Description |
|---|---|---|
| _0 | bool | poolExists whether pool exists or not. |
| _1 | uint256 | totalSupply total supply value. |

### stableAssetMint

```solidity
function stableAssetMint(uint32 poolId, uint256[] amounts, uint256 minMintAmount) external nonpayable returns (bool)
```

Stable asset mint.

*It&#39;ll emit an {StableAssetMinted} event.*

#### Parameters

| Name | Type | Description |
|---|---|---|
| poolId | uint32 | The ID of the pool. |
| amounts | uint256[] | amount of tokens to be put in the pool. |
| minMintAmount | uint256 | amount of minimum pool token received. |

#### Returns

| Name | Type | Description |
|---|---|---|
| _0 | bool | Returns a boolean value indicating whether the operation succeeded. |

### stableAssetRedeem

```solidity
function stableAssetRedeem(uint32 poolId, uint256 redeemAmount, uint256[] amounts) external nonpayable returns (bool)
```

Stable asset redeem, redeems the token proportionally.

*It&#39;ll emit an {StableAssetRedeemed} event.*

#### Parameters

| Name | Type | Description |
|---|---|---|
| poolId | uint32 | The ID of the pool. |
| redeemAmount | uint256 | The amount of pool token to be redeemed. |
| amounts | uint256[] | The minimum amounts of redeemed token received. |

#### Returns

| Name | Type | Description |
|---|---|---|
| _0 | bool | Returns a boolean value indicating whether the operation succeeded. |

### stableAssetRedeemMulti

```solidity
function stableAssetRedeemMulti(uint32 poolId, uint256[] amounts, uint256 maxRedeemAmount) external nonpayable returns (bool)
```

Stable asset redeem multi, Redeems token into single token from pool.

*It&#39;ll emit an {StableAssetRedeemedMulti} event.*

#### Parameters

| Name | Type | Description |
|---|---|---|
| poolId | uint32 | The ID of the pool. |
| amounts | uint256[] | The amount of underlying token to be recieved. |
| maxRedeemAmount | uint256 | The maximum amount of pool token to be input. |

#### Returns

| Name | Type | Description |
|---|---|---|
| _0 | bool | Returns a boolean value indicating whether the operation succeeded. |

### stableAssetRedeemSingle

```solidity
function stableAssetRedeemSingle(uint32 poolId, uint256 redeemAmount, uint32 i, uint256 minRedeemAmount, uint32 assetLength) external nonpayable returns (bool)
```

Stable asset redeem single, Redeems token into single token from pool.

*It&#39;ll emit an {StableAssetRedeemedSingle} event.*

#### Parameters

| Name | Type | Description |
|---|---|---|
| poolId | uint32 | The ID of the pool. |
| redeemAmount | uint256 | The amount of pool token to be redeemed. |
| i | uint32 | The the array index of the input token in stable pool. |
| minRedeemAmount | uint256 | The minimum amount of token recieved. |
| assetLength | uint32 | The length of array of tokens in stable pool. |

#### Returns

| Name | Type | Description |
|---|---|---|
| _0 | bool | Returns a boolean value indicating whether the operation succeeded. |

### stableAssetSwap

```solidity
function stableAssetSwap(uint32 poolId, uint32 i, uint32 j, uint256 dx, uint256 minDY, uint32 assetLength) external nonpayable returns (bool)
```

Stable asset swap tokens.

*It&#39;ll emit an {StableAssetSwapped} event.*

#### Parameters

| Name | Type | Description |
|---|---|---|
| poolId | uint32 | The ID of the pool. |
| i | uint32 | The array index of the input token in stableAsset tokens. |
| j | uint32 | The array index of the output token in stableAsset tokens. |
| dx | uint256 | The amount of input token. |
| minDY | uint256 | The minimum amount of output token received. |
| assetLength | uint32 | The length of array in stableAsset tokens. |

#### Returns

| Name | Type | Description |
|---|---|---|
| _0 | bool | Returns a boolean value indicating whether the operation succeeded. |



## Events

### StableAssetMinted

```solidity
event StableAssetMinted(address indexed sender, uint32 indexed poolId, uint256[] amounts, uint256 minMintAmount)
```

The stable asset minted event.



#### Parameters

| Name | Type | Description |
|---|---|---|
| sender `indexed` | address | The sender of the transaction. |
| poolId `indexed` | uint32 | The ID of the pool. |
| amounts  | uint256[] | amount of tokens to be put in the pool. |
| minMintAmount  | uint256 | amount of minimum pool token received. |

### StableAssetRedeemed

```solidity
event StableAssetRedeemed(address indexed sender, uint32 indexed poolId, uint256 redeemAmount, uint256[] amounts)
```

The scheduled call event.



#### Parameters

| Name | Type | Description |
|---|---|---|
| sender `indexed` | address | The sender of the transaction. |
| poolId `indexed` | uint32 | The ID of the pool. |
| redeemAmount  | uint256 | The amount of pool token to be redeemed. |
| amounts  | uint256[] | The minimum amounts of redeemed token received. |

### StableAssetRedeemedMulti

```solidity
event StableAssetRedeemedMulti(address indexed sender, uint32 indexed poolId, uint256[] amounts, uint256 maxRedeemAmount)
```

The scheduled call event.



#### Parameters

| Name | Type | Description |
|---|---|---|
| sender `indexed` | address | The sender of the transaction. |
| poolId `indexed` | uint32 | The ID of the pool. |
| amounts  | uint256[] | The amount of underlying token to be recieved. |
| maxRedeemAmount  | uint256 | The maximum amount of pool token to be input. |

### StableAssetRedeemedSingle

```solidity
event StableAssetRedeemedSingle(address indexed sender, uint32 indexed poolId, uint256 redeemAmount, uint32 i, uint256 minRedeemAmount, uint32 assetLength)
```

The scheduled call event.



#### Parameters

| Name | Type | Description |
|---|---|---|
| sender `indexed` | address | The sender of the transaction. |
| poolId `indexed` | uint32 | The ID of the pool. |
| redeemAmount  | uint256 | The amount of pool token to be redeemed. |
| i  | uint32 | The the array index of the input token in stable pool. |
| minRedeemAmount  | uint256 | The minimum amount of token recieved. |
| assetLength  | uint32 | The length of array of tokens in stable pool. |

### StableAssetSwapped

```solidity
event StableAssetSwapped(address indexed sender, uint32 indexed poolId, uint32 i, uint32 j, uint256 dx, uint256 minDY, uint32 assetLength)
```

The stable asset swapped event.



#### Parameters

| Name | Type | Description |
|---|---|---|
| sender `indexed` | address | The sender of the transaction. |
| poolId `indexed` | uint32 | The ID of the pool. |
| i  | uint32 | The array index of the input token in stableAsset tokens. |
| j  | uint32 | The array index of the output token in stableAsset tokens. |
| dx  | uint256 | The amount of input token. |
| minDY  | uint256 | The minimum amount of output token received. |
| assetLength  | uint32 | The length of array in stableAsset tokens. |



