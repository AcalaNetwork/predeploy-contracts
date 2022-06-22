// SPDX-License-Identifier: GPL-3.0-or-later

pragma solidity ^0.8.0;

import "./IStableAsset.sol";

contract StableAsset is IStableAsset {
    address constant private PRECOMPILE = address(0x0000000000000000000000000000000000000406);

    /**
     * @dev Get stable asset pool tokens.
     * @param poolId ID of the pool
     * @return poolExists whether pool exists or not
     * @return tokens stabel asset pool tokens
     */
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

    /**
     * @dev Get stable asset pool total supply.
     * @param poolId ID of the pool
     * @return poolExists whether pool exists or not
     * @return totalSupply total supply value
     */
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

    /**
     * @dev Get stable asset pool precision.
     * @param poolId ID of the pool
     * @return poolExists whether pool exists or not
     * @return precision precision value
     */
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

    /**
     * @dev Get stable asset pool mint fee.
     * @param poolId ID of the pool
     * @return poolExists whether pool exists or not
     * @return mintFee mint fee value
     */
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

    /**
     * @dev Get stable asset pool swap fee.
     * @param poolId ID of the pool
     * @return poolExists whether pool exists or not
     * @return swapFee swap fee value
     */
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

    /**
     * @dev Get stable asset pool redeem fee.
     * @param poolId ID of the pool
     * @return poolExists whether pool exists or not
     * @return redeemFee redeem fee value
     */
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

    /**
     * @dev Stable asset swap tokens.
     * @param poolId ID of the pool
     * @param i array index of the input token in stableAsset tokens
     * @param j array index of the output token in stableAsset tokens
     * @param dx amount of input token
     * @param minDY minimum amount of output token received
     * @param assetLength length of array in stableAsset tokens
     * @return succeed whether the operation succeeded
     */
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

    /**
     * @dev Stable asset mint.
     * @param poolId ID of the pool
     * @param amounts amount of tokens to be put in the pool
     * @param minMintAmount amount of minimum pool token received
     * @return succeed whether the operation succeeded
     */
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

    /**
     * @dev Stable asset redeem.
     * @param poolId ID of the pool
     * @param redeemAmount amount of token to be redeemed
     * @param amounts minimum amounts of redeemed token received
     * @return succeed whether the operation succeeded
     */
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
}
