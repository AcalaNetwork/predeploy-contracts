// SPDX-License-Identifier: GPL-3.0-or-later

pragma solidity ^0.8.0;

import "./IXtokens.sol";

/// @title Xtokens Predeploy Contract
/// @author Acala Developers
/// @notice You can use this predeploy contract to call xtokens pallet
/// @dev This contracts will interact with xtokens pallet
contract Xtokens is IXtokens {
    /// @dev The Xtokens precompile address.
    address constant private PRECOMPILE = address(0x000000000000000000000000000000000000040B);

    /// @inheritdoc IXtokens
    function transfer(address currencyId, uint256 amount, bytes memory dest, bytes memory weight)
    public
    override
    returns (bool) {
        require(currencyId != address(0), "Xtokens: currencyId is zero address");
        require(amount > 0, "Xtokens: amount is zero");
        require(dest.length > 0, "Xtokens: dest is empty");
        require(weight.length > 0, "Xtokens: weight is empty");

        (bool success, bytes memory returnData) = PRECOMPILE.call(
            abi.encodeWithSignature(
                "transfer(address,address,uint256,bytes,bytes)",
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

    /// @inheritdoc IXtokens
    function transferMultiAsset(bytes memory asset, bytes memory dest, bytes memory weight)
    public
    override
    returns (bool) {
        require(asset.length > 0, "Xtokens: asset is empty");
        require(dest.length > 0, "Xtokens: dest is empty");
        require(weight.length > 0, "Xtokens: weight is empty");

        (bool success, bytes memory returnData) = PRECOMPILE.call(
            abi.encodeWithSignature(
                "transferMultiAsset(address,bytes,bytes,bytes)",
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

    /// @inheritdoc IXtokens
    function transferWithFee(address currencyId, uint256 amount, uint256 fee, bytes memory dest, bytes memory weight)
    public
    override
    returns (bool) {
        require(currencyId != address(0), "Xtokens: currencyId is zero address");
        require(amount > 0, "Xtokens: amount is zero");
        require(fee > 0, "Xtokens: fee is zero");
        require(dest.length > 0, "Xtokens: dest is empty");
        require(weight.length > 0, "Xtokens: weight is empty");

        (bool success, bytes memory returnData) = PRECOMPILE.call(
            abi.encodeWithSignature(
                "transfer(address,address,uint256,uint256,bytes,bytes)",
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

    /// @inheritdoc IXtokens
    function transferMultiAssetWithFee(bytes memory asset, bytes memory fee, bytes memory dest, bytes memory weight)
    public
    override
    returns (bool) {
        require(asset.length > 0, "Xtokens: asset is empty");
        require(fee.length > 0, "Xtokens: fee is empty");
        require(dest.length > 0, "Xtokens: dest is empty");
        require(weight.length > 0, "Xtokens: weight is empty");

        (bool success, bytes memory returnData) = PRECOMPILE.call(
            abi.encodeWithSignature(
                "transferMultiassetWithFee(address,bytes,bytes,bytes,bytes)",
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

    /// @inheritdoc IXtokens
    function transferMultiCurrencies(Currency[] memory currencies, uint32 feeItem, bytes memory dest, bytes memory weight)
    public
    override
    returns (bool) {
        require(currencies.length > 0, "Xtokens: currencies is empty");
        require(dest.length > 0, "Xtokens: dest is empty");
        require(weight.length > 0, "Xtokens: weight is empty");

        (bool success, bytes memory returnData) = PRECOMPILE.call(
            abi.encodeWithSignature(
                "transferMultiCurrencies(address,(address,uint256)[],uint32,bytes,bytes)",
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

    /// @inheritdoc IXtokens
    function transferMultiAssets(bytes memory assets, uint32 feeItem, bytes memory dest, bytes memory weight)
    public
    override
    returns (bool) {
        require(assets.length > 0, "Xtokens: assets is empty");
        require(dest.length > 0, "Xtokens: dest is empty");
        require(weight.length > 0, "Xtokens: weight is empty");

        (bool success, bytes memory returnData) = PRECOMPILE.call(
            abi.encodeWithSignature(
                "transferMultiAssets(address,bytes,uint32,bytes,bytes)",
                msg.sender, assets, feeItem, dest, weight
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
