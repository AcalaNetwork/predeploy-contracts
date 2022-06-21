// SPDX-License-Identifier: GPL-3.0-or-later

pragma solidity ^0.8.0;

interface IStableAsset {

    event StableAssetSwapped(
        address indexed sender,
        uint32 poolId,
        uint32 i,
        uint32 j,
        uint256 dx,
        uint256 minDY,
        uint32 assetLength
    );
    event StableAssetMinted(address indexed sender, uint32 poolId, uint256[] amounts, uint256 minMintAmount);
    event StableAssetRedeemed(address indexed sender, uint32 poolId, uint256 redeemAmount, uint256[] amounts);

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
}
