// SPDX-License-Identifier: GPL-3.0-or-later

pragma solidity ^0.8.0;

interface IXtokens {
    // A Currency is defined by address and the amount to be transferred.
    struct Currency {
        address currencyId;
        uint256 amount;
    }

    // Transferred `MultiAsset` with fee.
    event TransferredMultiAssets(
			address indexed sender,
			bytes assets,
			bytes fee,
			bytes dest
	);

    // Transfer local assets with given `currencyId` and `Amount`.
    // Returns a boolean value indicating whether the operation succeeded.
    function transfer(
        address currencyId,
        uint256 amount,
        bytes memory dest,
        uint64 weight
    ) external returns (bool);

    // Transfer `MultiAsset` assets.
    // Returns a boolean value indicating whether the operation succeeded.
    function transferMultiAsset(
        bytes memory asset,
        bytes memory dest,
        uint64 weight
    ) external returns (bool);

    // Transfer native currencies specifying the fee and amount as separate.
    // Returns a boolean value indicating whether the operation succeeded.
    function transferWithFee(
        address currencyId,
        uint256 amount,
        uint256 fee,
        bytes memory dest,
        uint64 weight
    ) external returns (bool);

    // Transfer `MultiAsset` specifying the fee and amount as separate.
    // Returns a boolean value indicating whether the operation succeeded.
    function transferMultiAssetWithFee(
        bytes memory asset,
        bytes memory fee,
        bytes memory dest,
        uint64 weight
    ) external returns (bool);

    // Transfer several currencies specifying the item to be used as fee.
    // Returns a boolean value indicating whether the operation succeeded.
    function transferMultiCurrencies(
        Currency[] memory currencies,
        uint32 feeItem,
        bytes memory dest,
        uint64 weight
    ) external returns (bool);

    // Transfer several `MultiAsset` specifying the item to be used as fee.
    function transferMultiAssets(
        bytes memory assets,
        uint32 feeItem,
        bytes memory dest,
        uint64 weight
    ) external returns (bool);
}
