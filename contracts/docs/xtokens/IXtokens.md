# IXtokens

*Acala Developers*

> Xtokens Predeploy Contract Interface

You can use this predeploy contract to call xtokens pallet

*The interface through which solidity contracts will interact with xtokens pallet*

## Methods

### transfer

```solidity
function transfer(address currencyId, uint256 amount, bytes dest, bytes weight) external nonpayable returns (bool)
```

Transfer local assets with given `currencyId` and `Amount`.

*It&#39;ll emit an {TransferredMultiAssets} event.*

#### Parameters

| Name | Type | Description |
|---|---|---|
| currencyId | address | The ERC20 address of the currency we want to transfer, it cannot be the zero address. |
| amount | uint256 | The amount of tokens we want to transfer, it cannot be the zero. |
| dest | bytes | The dest to which we want to send the tokens. SCALE Encode of VersionedMultiLocation. It cannot be empty. The supported versions depend on the xcm version of node. https://github.com/paritytech/polkadot/blob/3fd99050/xcm/src/lib.rs#L405-L408 |
| weight | bytes | The dest weight limit. SCALE Encode of WeightLimit, it cannot be empty. https://github.com/paritytech/polkadot/blob/3fd99050/xcm/src/v3/mod.rs#L302-L308 |

#### Returns

| Name | Type | Description |
|---|---|---|
| _0 | bool | Returns a boolean value indicating whether the operation succeeded. |

### transferMultiAsset

```solidity
function transferMultiAsset(bytes asset, bytes dest, bytes weight) external nonpayable returns (bool)
```

Transfer `MultiAsset` assets.

*It&#39;ll emit an {TransferredMultiAssets} event.*

#### Parameters

| Name | Type | Description |
|---|---|---|
| asset | bytes | The asset we want to transfer. SCALE Encode of VersionedMultiAsset. It cannot be empty. The supported versions depend on the xcm version of node. https://github.com/paritytech/polkadot/blob/3fd99050/xcm/src/lib.rs#L421-L424 |
| dest | bytes | The dest to which we want to send the tokens. SCALE Encode of VersionedMultiLocation. It cannot be empty. The supported versions depend on the xcm version of node. https://github.com/paritytech/polkadot/blob/3fd99050/xcm/src/lib.rs#L405-L408 |
| weight | bytes | The dest weight limit. SCALE Encode of WeightLimit. It cannot be empty. https://github.com/paritytech/polkadot/blob/3fd99050/xcm/src/v3/mod.rs#L302-L308 |

#### Returns

| Name | Type | Description |
|---|---|---|
| _0 | bool | Returns a boolean value indicating whether the operation succeeded. |

### transferMultiAssetWithFee

```solidity
function transferMultiAssetWithFee(bytes asset, bytes fee, bytes dest, bytes weight) external nonpayable returns (bool)
```

Transfer `MultiAsset` specifying the fee and amount as separate.

*It&#39;ll emit an {TransferredMultiAssets} event.*

#### Parameters

| Name | Type | Description |
|---|---|---|
| asset | bytes | The asset we want to transfer. SCALE Encode of VersionedMultiAsset. It cannot be empty. The supported versions depend on the xcm version of node. https://github.com/paritytech/polkadot/blob/3fd99050/xcm/src/lib.rs#L421-L424 |
| fee | bytes | The fee we want to pay. SCALE Encode of VersionedMultiAsset. It cannot be empty. The supported versions depend on the xcm version of node. https://github.com/paritytech/polkadot/blob/3fd99050/xcm/src/lib.rs#L421-L424 |
| dest | bytes | The dest to which we want to send the tokens. SCALE Encode of VersionedMultiLocation. It cannot be empty. The supported versions depend on the xcm version of node. https://github.com/paritytech/polkadot/blob/3fd99050/xcm/src/lib.rs#L405-L408 |
| weight | bytes | The dest weight limit. SCALE Encode of WeightLimit, it cannot be empty. https://github.com/paritytech/polkadot/blob/3fd99050/xcm/src/v3/mod.rs#L302-L308 |

#### Returns

| Name | Type | Description |
|---|---|---|
| _0 | bool | Returns a boolean value indicating whether the operation succeeded. |

### transferMultiAssets

```solidity
function transferMultiAssets(bytes assets, uint32 feeItem, bytes dest, bytes weight) external nonpayable returns (bool)
```

Transfer several `MultiAsset` specifying the item to be used as fee.

*It&#39;ll emit an {TransferredMultiAssets} event.*

#### Parameters

| Name | Type | Description |
|---|---|---|
| assets | bytes | The assets we want to transfer. SCALE Encode of VersionedMultiAssets It cannot be empty. The supported versions depend on the xcm version of node. https://github.com/paritytech/polkadot/blob/3fd99050/xcm/src/lib.rs#L429-L432 |
| feeItem | uint32 | The index of the assets that we want to use for payment. |
| dest | bytes | The dest to which we want to send the tokens. SCALE Encode of VersionedMultiLocation. It cannot be empty. The supported versions depend on the xcm version of node. https://github.com/paritytech/polkadot/blob/3fd99050/xcm/src/lib.rs#L405-L408 |
| weight | bytes | The dest weight limit. SCALE Encode of WeightLimit, it cannot be empty. https://github.com/paritytech/polkadot/blob/3fd99050/xcm/src/v3/mod.rs#L302-L308 |

#### Returns

| Name | Type | Description |
|---|---|---|
| _0 | bool | Returns a boolean value indicating whether the operation succeeded. |

### transferMultiCurrencies

```solidity
function transferMultiCurrencies(IXtokens.Currency[] currencies, uint32 feeItem, bytes dest, bytes weight) external nonpayable returns (bool)
```





#### Parameters

| Name | Type | Description |
|---|---|---|
| currencies | IXtokens.Currency[] | undefined |
| feeItem | uint32 | undefined |
| dest | bytes | undefined |
| weight | bytes | undefined |

#### Returns

| Name | Type | Description |
|---|---|---|
| _0 | bool | undefined |

### transferWithFee

```solidity
function transferWithFee(address currencyId, uint256 amount, uint256 fee, bytes dest, bytes weight) external nonpayable returns (bool)
```

Transfer native currencies specifying the fee and amount as separate.

*It&#39;ll emit an {TransferredMultiAssets} event.*

#### Parameters

| Name | Type | Description |
|---|---|---|
| currencyId | address | The ERC20 address of the currency we want to transfer, it cannot be the zero address. |
| amount | uint256 | The amount of tokens we want to transfer, it cannot be the zero. |
| fee | uint256 | The fee of tokens we want to pay, it cannot be the zero. |
| dest | bytes | The dest to which we want to send the tokens. SCALE Encode of VersionedMultiLocation. It cannot be empty. The supported versions depend on the xcm version of node. https://github.com/paritytech/polkadot/blob/3fd99050/xcm/src/lib.rs#L405-L408 |
| weight | bytes | The dest weight limit. SCALE Encode of WeightLimit, it cannot be empty. https://github.com/paritytech/polkadot/blob/3fd99050/xcm/src/v3/mod.rs#L302-L308 |

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
| sender `indexed` | address | The sender who transferred the assets. |
| assets  | bytes | The transferred assets. SCALE Encode of MultiAssets. |
| fee  | bytes | The transfer fee. SCALE Encode of MultiAsset. |
| dest  | bytes | The dest of transferred assets. SCALE Encode of MultiLocation. |



