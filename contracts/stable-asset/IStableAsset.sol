// SPDX-License-Identifier: GPL-3.0-or-later

pragma solidity ^0.7.0;

interface IStableAsset {

    event StableAssetSwapped(
        address indexed sender,
        uint32 indexed poolId,
        uint32 i,
        uint32 j,
        uint256 dx,
        uint256 minDY,
        uint32 assetLength
    );
    event StableAssetMinted(address indexed sender, uint32 indexed poolId, uint256[] amounts, uint256 minMintAmount);
    event StableAssetRedeemed(address indexed sender, uint32 indexed poolId, uint256 redeemAmount, uint256[] amounts);
    event StableAssetRedeemedSingle(
        address indexed sender,
        uint32 indexed poolId,
        uint256 redeemAmount,
        uint32 i,
        uint256 minRedeemAmount,
        uint32 assetLength
    );
    event StableAssetRedeemedMulti(
        address indexed sender,
        uint32 indexed poolId,
        uint256[] amounts,
        uint256 maxRedeemAmount
    );

    // Get stable asset pool tokens.
    // Returns a boolean value indicating whether the pool exists and the corresponding value.
    function getStableAssetPoolTokens(uint32 poolId) external view returns (bool, address[] memory);

    // Get stable asset pool total supply.
    // Returns a boolean value indicating whether the pool exists and the corresponding value.
    function getStableAssetPoolTotalSupply(uint32 poolId) external view returns (bool, uint256);

    // Get stable asset pool precision.
    // Returns a boolean value indicating whether the pool exists and the corresponding value.
    function getStableAssetPoolPrecision(uint32 poolId) external view returns (bool, uint256);

    // Get stable asset pool mint fee.
    // Returns a boolean value indicating whether the pool exists and the corresponding value.
    function getStableAssetPoolMintFee(uint32 poolId) external view returns (bool, uint256);

    // Get stable asset pool swap fee.
    // Returns a boolean value indicating whether the pool exists and the corresponding value.
    function getStableAssetPoolSwapFee(uint32 poolId) external view returns (bool, uint256);

    // Get stable asset pool redeem fee.
    // Returns a boolean value indicating whether the pool exists and the corresponding value.
    function getStableAssetPoolRedeemFee(uint32 poolId) external view returns (bool, uint256);

    // Stable asset swap tokens.
    // Returns a boolean value indicating whether the operation succeeded.
    function stableAssetSwap(
        uint32 poolId,
        uint32 i,
        uint32 j,
        uint256 dx,
        uint256 minDY,
        uint32 assetLength
    ) external returns (bool);

    // Stable asset mint.
    // Returns a boolean value indicating whether the operation succeeded.
    function stableAssetMint(uint32 poolId, uint256[] calldata amounts, uint256 minMintAmount) external returns (bool);

    // Stable asset redeem.
    // Returns a boolean value indicating whether the operation succeeded.
    function stableAssetRedeem(uint32 poolId, uint256 redeemAmount, uint256[] calldata amounts) external returns (bool);

    // Stable asset redeem single.
    // Returns a boolean value indicating whether the operation succeeded.
    function stableAssetRedeemSingle(
        uint32 poolId,
        uint256 redeemAmount,
        uint32 i,
        uint256 minRedeemAmount,
        uint32 assetLength
    ) external returns (bool);

    // Stable asset redeem multi.
    // Returns a boolean value indicating whether the operation succeeded.
    function stableAssetRedeemMulti(
        uint32 poolId,
        uint256[] calldata amounts,
        uint256 maxRedeemAmount
    ) external returns (bool);
}
