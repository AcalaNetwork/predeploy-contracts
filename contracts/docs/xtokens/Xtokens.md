# Xtokens

*Acala Developers*

> Xtokens Predeploy Contract

You can use this predeploy contract to call xtokens pallet

*This contracts will interact with xtokens pallet*

## Methods

### transfer

```solidity
function transfer(address currencyId, uint256 amount, bytes dest, uint64 weight) external nonpayable returns (bool)
```

Transfer local assets with given `currencyId` and `Amount`.

*It&#39;ll emit an {TransferredMultiAssets} event.*

#### Parameters

| Name | Type | Description |
|---|---|---|
| currencyId | address | The ERC20 address of the currency we want to transfer, it cannot be the zero address. |
| amount | uint256 | The amount of tokens we want to transfer, it cannot be the zero. |
| dest | bytes | The dest to which we want to send the tokens. SCALE Encode of VersionedMultiLocation, it cannot be empty. The supported versions depend on the xcm version of node. https://github.com/paritytech/polkadot/blob/3fd99050/xcm/src/lib.rs#L405-L408 |
| weight | uint64 | The dest weight limit. |

#### Returns

| Name | Type | Description |
|---|---|---|
| _0 | bool | Returns a boolean value indicating whether the operation succeeded. |

### transferMultiAsset

```solidity
function transferMultiAsset(bytes asset, bytes dest, uint64 weight) external nonpayable returns (bool)
```

Transfer `MultiAsset` assets.

*It&#39;ll emit an {TransferredMultiAssets} event.*

#### Parameters

| Name | Type | Description |
|---|---|---|
| asset | bytes | The asset we want to transfer. SCALE Encode of VersionedMultiAsset, it cannot be empty. The supported versions depend on the xcm version of node. https://github.com/paritytech/polkadot/blob/3fd99050/xcm/src/lib.rs#L421-L424 |
| dest | bytes | The dest to which we want to send the tokens. SCALE Encode of VersionedMultiLocation, it cannot be empty. The supported versions depend on the xcm version of node. https://github.com/paritytech/polkadot/blob/3fd99050/xcm/src/lib.rs#L405-L408 |
| weight | uint64 | The dest weight limit. |

#### Returns

| Name | Type | Description |
|---|---|---|
| _0 | bool | Returns a boolean value indicating whether the operation succeeded. |

### transferMultiAssetWithFee

```solidity
function transferMultiAssetWithFee(bytes asset, bytes fee, bytes dest, uint64 weight) external nonpayable returns (bool)
```

Transfer `MultiAsset` specifying the fee and amount as separate.

*It&#39;ll emit an {TransferredMultiAssets} event.*

#### Parameters

| Name | Type | Description |
|---|---|---|
| asset | bytes | The asset we want to transfer. SCALE Encode of VersionedMultiAsset, it cannot be empty. The supported versions depend on the xcm version of node. https://github.com/paritytech/polkadot/blob/3fd99050/xcm/src/lib.rs#L421-L424 |
| fee | bytes | The fee we want to pay. SCALE Encode of VersionedMultiAsset, it cannot be empty. The supported versions depend on the xcm version of node. https://github.com/paritytech/polkadot/blob/3fd99050/xcm/src/lib.rs#L421-L424 |
| dest | bytes | The dest to which we want to send the tokens. SCALE Encode of VersionedMultiLocation, it cannot be empty. The supported versions depend on the xcm version of node. https://github.com/paritytech/polkadot/blob/3fd99050/xcm/src/lib.rs#L405-L408 |
| weight | uint64 | The dest weight limit. |

#### Returns

| Name | Type | Description |
|---|---|---|
| _0 | bool | Returns a boolean value indicating whether the operation succeeded. |

### transferMultiAssets

```solidity
function transferMultiAssets(bytes assets, uint32 feeItem, bytes dest, uint64 weight) external nonpayable returns (bool)
```

Transfer several `MultiAsset` specifying the item to be used as fee.

*It&#39;ll emit an {TransferredMultiAssets} event.*

#### Parameters

| Name | Type | Description |
|---|---|---|
| assets | bytes | The assets we want to transfer. SCALE Encode of VersionedMultiAssets, it cannot be empty. The supported versions depend on the xcm version of node. https://github.com/paritytech/polkadot/blob/3fd99050/xcm/src/lib.rs#L429-L432 |
| feeItem | uint32 | The index of the assets that we want to use for payment. |
| dest | bytes | The dest to which we want to send the tokens. SCALE Encode of VersionedMultiLocation, it cannot be empty. The supported versions depend on the xcm version of node. https://github.com/paritytech/polkadot/blob/3fd99050/xcm/src/lib.rs#L405-L408 |
| weight | uint64 | The dest weight limit. |

#### Returns

| Name | Type | Description |
|---|---|---|
| _0 | bool | Returns a boolean value indicating whether the operation succeeded. |

### transferMultiCurrencies

```solidity
function transferMultiCurrencies(IXtokens.Currency[] currencies, uint32 feeItem, bytes dest, uint64 weight) external nonpayable returns (bool)
```





#### Parameters

| Name | Type | Description |
|---|---|---|
| currencies | IXtokens.Currency[] | undefined |
| feeItem | uint32 | undefined |
| dest | bytes | undefined |
| weight | uint64 | undefined |

#### Returns

| Name | Type | Description |
|---|---|---|
| _0 | bool | undefined |

### transferWithFee

```solidity
function transferWithFee(address currencyId, uint256 amount, uint256 fee, bytes dest, uint64 weight) external nonpayable returns (bool)
```

Transfer native currencies specifying the fee and amount as separate.

*It&#39;ll emit an {TransferredMultiAssets} event.*

#### Parameters

| Name | Type | Description |
|---|---|---|
| currencyId | address | The ERC20 address of the currency we want to transfer, it cannot be the zero address. |
| amount | uint256 | The amount of tokens we want to transfer, it cannot be the zero. |
| fee | uint256 | The fee of tokens we want to pay, it cannot be the zero. |
| dest | bytes | The dest to which we want to send the tokens. SCALE Encode of VersionedMultiLocation, it cannot be empty. The supported versions depend on the xcm version of node. https://github.com/paritytech/polkadot/blob/3fd99050/xcm/src/lib.rs#L405-L408 |
| weight | uint64 | The dest weight limit. |

#### Returns

| Name | Type | Description |
|---|---|---|
| _0 | bool | Returns a boolean value indicating whether the operation succeeded. |



## Events

### TransferredMultiAssets

```solidity
event TransferredMultiAssets(address indexed sender, bytes assets, bytes fee, bytes dest)
```

Transferred MultiAssets event.



#### Parameters

| Name | Type | Description |
|---|---|---|
| sender `indexed` | address | undefined |
| assets  | bytes | undefined |
| fee  | bytes | undefined |
| dest  | bytes | undefined |



