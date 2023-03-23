// SPDX-License-Identifier: GPL-3.0-or-later

pragma solidity ^0.8.0;

import "./IStableAsset.sol";

/// @title StableAsset Predeploy Contract
/// @author Acala Developers
/// @notice You can use this predeploy contract to call stable-asset pallet
/// @dev This contracts will interact with stable-asset pallet
contract StableAsset is IStableAsset {
    /// @dev The StableAsset precompile address.
    address constant private PRECOMPILE = address(0x0000000000000000000000000000000000000406);

    /// @inheritdoc IStableAsset
    function getStableAssetPoolTokens(uint32 poolId)
    public
    view
    override
    returns (bool, address[] memory) {
        (bool success, bytes memory returnData) = PRECOMPILE.staticcall(
            abi.encodeWithSignature("getStableAssetPoolTokens(uint32)", poolId)
        );
        assembly {
            if eq(success, 0) {
                revert(add(returnData, 0x20), returndatasize())
            }
        }
        if (returnData.length == 0) {
            // pool not found
            address[] memory empty;
            return (false, empty);
        } else {
            return (true, abi.decode(returnData, (address[])));
        }
    }

    /// @inheritdoc IStableAsset
    function getStableAssetPoolTotalSupply(uint32 poolId)
    public
    view
    override
    returns (bool, uint256) {
        (bool success, bytes memory returnData) = PRECOMPILE.staticcall(
            abi.encodeWithSignature("getStableAssetPoolTotalSupply(uint32)", poolId)
        );
        assembly {
            if eq(success, 0) {
                revert(add(returnData, 0x20), returndatasize())
            }
        }
        if (returnData.length == 0) {
            // pool not found
            return (false, 0);
        } else {
            return (true, abi.decode(returnData, (uint256)));
        }
    }

    /// @inheritdoc IStableAsset
    function getStableAssetPoolPrecision(uint32 poolId)
    public
    view
    override
    returns (bool, uint256) {
        (bool success, bytes memory returnData) = PRECOMPILE.staticcall(
            abi.encodeWithSignature("getStableAssetPoolPrecision(uint32)", poolId)
        );
        assembly {
            if eq(success, 0) {
                revert(add(returnData, 0x20), returndatasize())
            }
        }
        if (returnData.length == 0) {
            // pool not found
            return (false, 0);
        } else {
            return (true, abi.decode(returnData, (uint256)));
        }
    }

    /// @inheritdoc IStableAsset
    function getStableAssetPoolMintFee(uint32 poolId)
    public
    view
    override
    returns (bool, uint256) {
        (bool success, bytes memory returnData) = PRECOMPILE.staticcall(
            abi.encodeWithSignature("getStableAssetPoolMintFee(uint32)", poolId)
        );
        assembly {
            if eq(success, 0) {
                revert(add(returnData, 0x20), returndatasize())
            }
        }
        if (returnData.length == 0) {
            // pool not found
            return (false, 0);
        } else {
            return (true, abi.decode(returnData, (uint256)));
        }
    }

    /// @inheritdoc IStableAsset
    function getStableAssetPoolSwapFee(uint32 poolId)
    public
    view
    override
    returns (bool, uint256) {
        (bool success, bytes memory returnData) = PRECOMPILE.staticcall(
            abi.encodeWithSignature("getStableAssetPoolSwapFee(uint32)", poolId)
        );
        assembly {
            if eq(success, 0) {
                revert(add(returnData, 0x20), returndatasize())
            }
        }
        if (returnData.length == 0) {
            // pool not found
            return (false, 0);
        } else {
            return (true, abi.decode(returnData, (uint256)));
        }
    }

    /// @inheritdoc IStableAsset
    function getStableAssetPoolRedeemFee(uint32 poolId)
    public
    view
    override
    returns (bool, uint256) {
        (bool success, bytes memory returnData) = PRECOMPILE.staticcall(
            abi.encodeWithSignature("getStableAssetPoolRedeemFee(uint32)", poolId)
        );
        assembly {
            if eq(success, 0) {
                revert(add(returnData, 0x20), returndatasize())
            }
        }
        if (returnData.length == 0) {
            // pool not found
            return (false, 0);
        } else {
            return (true, abi.decode(returnData, (uint256)));
        }
    }

    /// @inheritdoc IStableAsset
    function stableAssetSwap(uint32 poolId, uint32 i, uint32 j, uint256 dx, uint256 minDY, uint32 assetLength)
    public
    override
    returns (bool) {
        (bool success, bytes memory returnData) = PRECOMPILE.call(
            abi.encodeWithSignature(
                "stableAssetSwap(address,uint32,uint32,uint32,uint256,uint256,uint32)",
                msg.sender, poolId, i, j, dx, minDY, assetLength
            )
        );
        assembly {
            if eq(success, 0) {
                revert(add(returnData, 0x20), returndatasize())
            }
        }
        emit StableAssetSwapped(msg.sender, poolId, i, j, dx, minDY, assetLength);
        return true;
    }

    /// @inheritdoc IStableAsset
    function stableAssetMint(uint32 poolId, uint256[] calldata amounts, uint256 minMintAmount)
    public
    override
    returns (bool) {
        (bool success, bytes memory returnData) = PRECOMPILE.call(
            abi.encodeWithSignature(
                "stableAssetMint(address,uint32,uint256[],uint256)",
                msg.sender, poolId, amounts, minMintAmount
            )
        );
        assembly {
            if eq(success, 0) {
                revert(add(returnData, 0x20), returndatasize())
            }
        }
        emit StableAssetMinted(msg.sender, poolId, amounts, minMintAmount);
        return true;
    }

    /// @inheritdoc IStableAsset
    function stableAssetRedeem(uint32 poolId, uint256 redeemAmount, uint256[] calldata amounts)
    public
    override
    returns (bool) {
        (bool success, bytes memory returnData) = PRECOMPILE.call(
            abi.encodeWithSignature(
                "stableAssetRedeem(address,uint32,uint256,uint256[])",
                msg.sender, poolId, redeemAmount, amounts
            )
        );
        assembly {
            if eq(success, 0) {
                revert(add(returnData, 0x20), returndatasize())
            }
        }
        emit StableAssetRedeemed(msg.sender, poolId, redeemAmount, amounts);
        return true;
    }

    /// @inheritdoc IStableAsset
    function stableAssetRedeemSingle(
        uint32 poolId,
        uint256 redeemAmount,
        uint32 i,
        uint256 minRedeemAmount,
        uint32 assetLength
    )
    public
    override
    returns (bool) {
        (bool success, bytes memory returnData) = PRECOMPILE.call(
            abi.encodeWithSignature(
                "stableAssetRedeemSingle(address,uint32,uint256,uint32,uint256,uint32)",
                msg.sender, poolId, redeemAmount, i, minRedeemAmount, assetLength
            )
        );
        assembly {
            if eq(success, 0) {
                revert(add(returnData, 0x20), returndatasize())
            }
        }

        emit StableAssetRedeemedSingle(msg.sender, poolId, redeemAmount, i, minRedeemAmount, assetLength);
        return true;
    }

    /// @inheritdoc IStableAsset
    function stableAssetRedeemMulti(uint32 poolId, uint256[] calldata amounts, uint256 maxRedeemAmount)
    public
    override
    returns (bool) {
        (bool success, bytes memory returnData) = PRECOMPILE.call(
            abi.encodeWithSignature(
                "stableAssetRedeemMulti(address,uint32,uint256[],uint256)",
                msg.sender, poolId, amounts, maxRedeemAmount
            )
        );
        assembly {
            if eq(success, 0) {
                revert(add(returnData, 0x20), returndatasize())
            }
        }

        emit StableAssetRedeemedMulti(msg.sender, poolId, amounts, maxRedeemAmount);
        return true;
    }
}
