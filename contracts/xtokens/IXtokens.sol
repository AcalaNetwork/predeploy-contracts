// SPDX-License-Identifier: GPL-3.0-or-later

pragma solidity ^0.8.0;

/// @title Xtokens Predeploy Contract Interface
/// @author Acala Developers
/// @notice You can use this predeploy contract to call xtokens pallet
/// @dev The interface through which solidity contracts will interact with xtokens pallet
interface IXtokens {
    /// @notice A Currency is defined by address and the amount to be transferred.
    /// @param currencyId The ERC20 address of the currency we want to transfer.
    /// @param amount The amount of tokens we want to transfer.
    struct Currency {
        address currencyId;
        uint256 amount;
    }

    /// @notice Transferred MultiAssets event.
    /// @param sender The sender who transferred the assets.
    /// @param assets The transferred assets. SCALE Encode of MultiAssets.
    /// @param fee  The transfer fee. SCALE Encode of MultiAsset.
    /// @param dest The dest of transferred assets. SCALE Encode of MultiLocation.
    event TransferredMultiAssets(
			address indexed sender,
			bytes assets,
			bytes fee,
			bytes dest
	);

    /// @notice Transfer local assets with given `currencyId` and `Amount`.
    /// @dev It'll emit an {TransferredMultiAssets} event.
    /// @param currencyId The ERC20 address of the currency we want to transfer, it cannot be the zero address.
    /// @param amount The amount of tokens we want to transfer, it cannot be the zero.
    /// @param dest The dest to which we want to send the tokens. SCALE Encode of VersionedMultiLocation, it cannot be empty. The supported versions depend on the xcm version of node. https://github.com/paritytech/polkadot/blob/3fd99050/xcm/src/lib.rs#L405-L408
    /// @param weight The dest weight limit.
    /// @return Returns a boolean value indicating whether the operation succeeded.
    function transfer(
        address currencyId,
        uint256 amount,
        bytes memory dest,
        uint64 weight
    ) external returns (bool);

    /// @notice Transfer `MultiAsset` assets.
    /// @dev It'll emit an {TransferredMultiAssets} event.
    /// @param asset The asset we want to transfer. SCALE Encode of VersionedMultiAsset, it cannot be empty. The supported versions depend on the xcm version of node. https://github.com/paritytech/polkadot/blob/3fd99050/xcm/src/lib.rs#L421-L424
    /// @param dest The dest to which we want to send the tokens. SCALE Encode of VersionedMultiLocation, it cannot be empty. The supported versions depend on the xcm version of node. https://github.com/paritytech/polkadot/blob/3fd99050/xcm/src/lib.rs#L405-L408
    /// @param weight The dest weight limit.
    /// @return Returns a boolean value indicating whether the operation succeeded.
    function transferMultiAsset(
        bytes memory asset,
        bytes memory dest,
        uint64 weight
    ) external returns (bool);

    /// @notice Transfer native currencies specifying the fee and amount as separate.
    /// @dev It'll emit an {TransferredMultiAssets} event.
    /// @param currencyId The ERC20 address of the currency we want to transfer, it cannot be the zero address.
    /// @param amount The amount of tokens we want to transfer, it cannot be the zero.
    /// @param fee The fee of tokens we want to pay, it cannot be the zero.
    /// @param dest The dest to which we want to send the tokens. SCALE Encode of VersionedMultiLocation, it cannot be empty. The supported versions depend on the xcm version of node. https://github.com/paritytech/polkadot/blob/3fd99050/xcm/src/lib.rs#L405-L408
    /// @param weight The dest weight limit.
    /// @return Returns a boolean value indicating whether the operation succeeded.
    function transferWithFee(
        address currencyId,
        uint256 amount,
        uint256 fee,
        bytes memory dest,
        uint64 weight
    ) external returns (bool);

    /// @notice Transfer `MultiAsset` specifying the fee and amount as separate.
    /// @dev It'll emit an {TransferredMultiAssets} event.
    /// @param asset The asset we want to transfer. SCALE Encode of VersionedMultiAsset, it cannot be empty. The supported versions depend on the xcm version of node. https://github.com/paritytech/polkadot/blob/3fd99050/xcm/src/lib.rs#L421-L424
    /// @param fee The fee we want to pay. SCALE Encode of VersionedMultiAsset, it cannot be empty. The supported versions depend on the xcm version of node. https://github.com/paritytech/polkadot/blob/3fd99050/xcm/src/lib.rs#L421-L424
    /// @param dest The dest to which we want to send the tokens. SCALE Encode of VersionedMultiLocation, it cannot be empty. The supported versions depend on the xcm version of node. https://github.com/paritytech/polkadot/blob/3fd99050/xcm/src/lib.rs#L405-L408
    /// @param weight The dest weight limit.
    /// @return Returns a boolean value indicating whether the operation succeeded.
    function transferMultiAssetWithFee(
        bytes memory asset,
        bytes memory fee,
        bytes memory dest,
        uint64 weight
    ) external returns (bool);

    /// @notice Transfer several currencies specifying the item to be used as fee.
    /// @dev It'll emit an {TransferredMultiAssets} event.
    /// @param currencies currencies array, `(address, uint256)[]` e.g.([[1000000000000000000000000000000000000001,1],[1000000000000000000000000000000000000001,2]])
    /// @param feeItem The amount of tokens we want to transfer, it cannot be the zero.
    /// @param dest The index of the currencies that we want to use for payment.
    /// @param weight The dest weight limit.
    /// @return Returns a boolean value indicating whether the operation succeeded.
    function transferMultiCurrencies(
        Currency[] memory currencies,
        uint32 feeItem,
        bytes memory dest,
        uint64 weight
    ) external returns (bool);

    /// @notice Transfer several `MultiAsset` specifying the item to be used as fee.
    /// @dev It'll emit an {TransferredMultiAssets} event.
    /// @param assets The assets we want to transfer. SCALE Encode of VersionedMultiAssets, it cannot be empty. The supported versions depend on the xcm version of node. https://github.com/paritytech/polkadot/blob/3fd99050/xcm/src/lib.rs#L429-L432
    /// @param feeItem The index of the assets that we want to use for payment.
    /// @param dest The dest to which we want to send the tokens. SCALE Encode of VersionedMultiLocation, it cannot be empty. The supported versions depend on the xcm version of node. https://github.com/paritytech/polkadot/blob/3fd99050/xcm/src/lib.rs#L405-L408
    /// @param weight The dest weight limit.
    /// @return Returns a boolean value indicating whether the operation succeeded.
    function transferMultiAssets(
        bytes memory assets,
        uint32 feeItem,
        bytes memory dest,
        uint64 weight
    ) external returns (bool);
}
