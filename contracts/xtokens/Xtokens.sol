// SPDX-License-Identifier: GPL-3.0-or-later

pragma solidity ^0.8.0;

import "./IXtokens.sol";

contract Xtokens is IXtokens {
    address constant private PRECOMPILE = address(0x000000000000000000000000000000000000040B);

    /**
     * @dev Transfer local assets with given `currencyId` and `Amount`.
     * Returns a boolean value indicating whether the operation succeeded.
     *
     * Emits an {TransferredMultiAssets} event.
     *
     * Requirements:
     *
     * - `currencyId` cannot be the zero address.
     * - `amount` cannot be the zero.
     * - `dest` SCALE Encode of MultiLocation, it cannot be empty.
     * - `weight` dest weight limit.
     */
    function transfer(address currencyId, uint256 amount, bytes memory dest, uint64 weight)
    public
    override
    returns (bool) {
        require(currencyId != address(0), "Xtokens: currencyId is zero address");
        require(amount > 0, "Xtokens: amount is zero");
        require(dest.length > 0, "Xtokens: dest is empty");

        (bool success, bytes memory returnData) = PRECOMPILE.call(
            abi.encodeWithSignature(
                "transfer(address,address,uint256,bytes,uint64)",
                msg.sender, currencyId, amount, dest, weight
            )
        );
        assembly {
            if eq(success, 0) {
                revert(add(returnData, 0x20), returndatasize())
            }
        }

        (bytes memory assets, bytes memory feeAsset) = abi.decode(returnData, (bytes, bytes));

        emit TransferredMultiAssets(msg.sender, assets, feeAsset, dest);
        return true;
    }

    /**
     * @dev Transfer `MultiAsset` assets.
     * Returns a boolean value indicating whether the operation succeeded.
     *
     * Emits an {TransferredMultiAssets} event.
     *
     * Requirements:
     *
     * - `asset` SCALE Encode of MultiAsset, it cannot be empty.
     * - `dest` SCALE Encode of MultiLocation, it cannot be empty.
     * - `weight` dest weight limit.
     */
    function transferMultiAsset(bytes memory asset, bytes memory dest, uint64 weight)
    public
    override
    returns (bool) {
        require(asset.length > 0, "Xtokens: asset is empty");
        require(dest.length > 0, "Xtokens: dest is empty");

        (bool success, bytes memory returnData) = PRECOMPILE.call(
            abi.encodeWithSignature(
                "TransferMultiAsset(address,bytes,bytes,uint64)",
                msg.sender, asset, dest, weight
            )
        );
        assembly {
            if eq(success, 0) {
                revert(add(returnData, 0x20), returndatasize())
            }
        }

        (bytes memory _asset, bytes memory _fee) = abi.decode(returnData, (bytes, bytes));

        emit TransferredMultiAssets(msg.sender, _asset, _fee, dest);
        return true;
    }

    /**
     * @dev Transfer native currencies specifying the fee and amount as separate.
     * Returns a boolean value indicating whether the operation succeeded.
     *
     * Emits an {TransferredMultiAssets} event.
     *
     * Requirements:
     *
     * - `currencyId` cannot be the zero address.
     * - `amount` cannot be the zero.
     * - `fee` cannot be the zero.
     * - `dest` SCALE Encode of MultiLocation, it cannot be empty.
     * - `weight` dest weight limit.
     */
    function transferWithFee(address currencyId, uint256 amount, uint256 fee, bytes memory dest, uint64 weight)
    public
    override
    returns (bool) {
        require(currencyId != address(0), "Xtokens: currencyId is zero address");
        require(amount > 0, "Xtokens: amount is zero");
        require(fee > 0, "Xtokens: fee is zero");
        require(dest.length > 0, "Xtokens: dest is empty");

        (bool success, bytes memory returnData) = PRECOMPILE.call(
            abi.encodeWithSignature(
                "transfer(address,address,uint256,uint256,bytes,uint64)",
                msg.sender, currencyId, amount, fee, dest, weight
            )
        );
        assembly {
            if eq(success, 0) {
                revert(add(returnData, 0x20), returndatasize())
            }
        }

        (bytes memory asset, bytes memory feeAsset) = abi.decode(returnData, (bytes, bytes));

        emit TransferredMultiAssets(msg.sender, asset, feeAsset, dest);
        return true;
    }

    /**
     * @dev Transfer `MultiAsset` specifying the fee and amount as separate.
     * Returns a boolean value indicating whether the operation succeeded.
     *
     * Emits an {TransferredMultiAssets} event.
     *
     * Requirements:
     *
     * - `asset` SCALE Encode of MultiAsset, it cannot be empty.
     * - `fee` SCALE Encode of MultiAsset, it cannot be empty.
     * - `dest` SCALE Encode of MultiLocation, it cannot be empty.
     * - `weight` dest weight limit.
     */
    function transferMultiAssetWithFee(bytes memory asset, bytes memory fee, bytes memory dest, uint64 weight)
    public
    override
    returns (bool) {
        require(asset.length > 0, "Xtokens: asset is empty");
        require(fee.length > 0, "Xtokens: fee is empty");
        require(dest.length > 0, "Xtokens: dest is empty");

        (bool success, bytes memory returnData) = PRECOMPILE.call(
            abi.encodeWithSignature(
                "transferMultiassetWithFee(address,bytes,bytes,bytes,uint64)",
                msg.sender, asset, fee, dest, weight
            )
        );
        assembly {
            if eq(success, 0) {
                revert(add(returnData, 0x20), returndatasize())
            }
        }

        (bytes memory _asset, bytes memory _fee) = abi.decode(returnData, (bytes, bytes));

        emit TransferredMultiAssets(msg.sender, _asset, _fee, dest);
        return true;
    }

    /**
     * @dev Transfer several currencies specifying the item to be used as fee.
     * Returns a boolean value indicating whether the operation succeeded.
     *
     * Emits an {TransferredMultiAssets} event.
     *
     * Requirements:
     *
     * - `currencies` currencies array, `(address, uint256)[]` e.g.(
        [[1000000000000000000000000000000000000001,1],[1000000000000000000000000000000000000001,2]]
        )
     * - `feeItem` is index of the currencies tuple that we want to use for payment.
     * - `dest` SCALE Encode of MultiLocation, it cannot be empty.
     * - `weight` dest weight limit.
     */
    function transferMultiCurrencies(Currency[] memory currencies, uint32 feeItem, bytes memory dest, uint64 weight)
    public
    override
    returns (bool) {
        require(currencies.length > 0, "Xtokens: currencies is empty");
        require(dest.length > 0, "Xtokens: dest is empty");

        (bool success, bytes memory returnData) = PRECOMPILE.call(
            abi.encodeWithSignature(
                "transferMultiCurrencies(address,(address,uint256)[],uint32,bytes,uint64)",
                msg.sender, currencies, feeItem, dest, weight
            )
        );
        assembly {
            if eq(success, 0) {
                revert(add(returnData, 0x20), returndatasize())
            }
        }

        (bytes memory _asset, bytes memory _fee) = abi.decode(returnData, (bytes, bytes));

        emit TransferredMultiAssets(msg.sender, _asset, _fee, dest);
        return true;
    }

    /**
     * @dev Transfer several `MultiAssets` specifying the item to be used as fee.
     * Returns a boolean value indicating whether the operation succeeded.
     *
     * Emits an {TransferredMultiAssets} event.
     *
     * Requirements:
     *
     * - `assets` SCALE Encode of MultiAssets, it cannot be empty.
     * - `fee` SCALE Encode of MultiAsset, it cannot be empty.
     * - `dest` SCALE Encode of MultiLocation, it cannot be empty.
     * - `weight` dest weight limit.
     */
    function transferMultiAssets(bytes memory assets, bytes memory fee, bytes memory dest, uint64 weight)
    public
    override
    returns (bool) {
        require(assets.length > 0, "Xtokens: assets is empty");
        require(fee.length > 0, "Xtokens: fee is empty");
        require(dest.length > 0, "Xtokens: dest is empty");

        (bool success, bytes memory returnData) = PRECOMPILE.call(
            abi.encodeWithSignature(
                "transferMultiAssets(address,bytes,bytes,bytes,uint64)",
                msg.sender, assets, fee, dest, weight
            )
        );
        assembly {
            if eq(success, 0) {
                revert(add(returnData, 0x20), returndatasize())
            }
        }

        (bytes memory _asset, bytes memory _fee) = abi.decode(returnData, (bytes, bytes));

        emit TransferredMultiAssets(msg.sender, _asset, _fee, dest);
        return true;
    }
}
