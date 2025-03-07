// SPDX-License-Identifier: GPL-3.0-or-later

pragma solidity ^0.8.0;

/// @title StableAsset Predeploy Contract Interface
/// @author Acala Developers
/// @notice You can use this predeploy contract to call stable-asset pallet
/// @dev The interface through which solidity contracts will interact with stable-asset pallet
interface IStableAsset {
    /// @notice The stable asset swapped event.
    /// @param sender The sender of the transaction.
    /// @param poolId The ID of the pool.
    /// @param i The array index of the input token in stableAsset tokens.
    /// @param j The array index of the output token in stableAsset tokens.
    /// @param dx The amount of input token.
    /// @param minDY The minimum amount of output token received.
    /// @param assetLength The length of array in stableAsset tokens.
    event StableAssetSwapped(
        address indexed sender,
        uint32 indexed poolId,
        uint32 i,
        uint32 j,
        uint256 dx,
        uint256 minDY,
        uint32 assetLength
    );

    /// @notice The stable asset minted event.
    /// @param sender The sender of the transaction.
    /// @param poolId The ID of the pool.
    /// @param amounts amount of tokens to be put in the pool.
    /// @param minMintAmount amount of minimum pool token received.
    event StableAssetMinted(
        address indexed sender,
        uint32 indexed poolId,
        uint256[] amounts,
        uint256 minMintAmount
    );

    /// @notice The scheduled call event.
    /// @param sender The sender of the transaction.
    /// @param poolId The ID of the pool.
    /// @param redeemAmount The amount of pool token to be redeemed.
    /// @param amounts The minimum amounts of redeemed token received.
    event StableAssetRedeemed(
        address indexed sender,
        uint32 indexed poolId,
        uint256 redeemAmount,
        uint256[] amounts
    );

    /// @notice The scheduled call event.
    /// @param sender The sender of the transaction.
    /// @param poolId The ID of the pool.
    /// @param redeemAmount The amount of pool token to be redeemed.
    /// @param i The the array index of the input token in stable pool.
    /// @param minRedeemAmount The minimum amount of token received.
    /// @param assetLength The length of array of tokens in stable pool.
    event StableAssetRedeemedSingle(
        address indexed sender,
        uint32 indexed poolId,
        uint256 redeemAmount,
        uint32 i,
        uint256 minRedeemAmount,
        uint32 assetLength
    );

    /// @notice The scheduled call event.
    /// @param sender The sender of the transaction.
    /// @param poolId The ID of the pool.
    /// @param amounts The amount of underlying token to be received.
    /// @param maxRedeemAmount The maximum amount of pool token to be input.
    event StableAssetRedeemedMulti(
        address indexed sender,
        uint32 indexed poolId,
        uint256[] amounts,
        uint256 maxRedeemAmount
    );

    /// @notice Get stable asset pool tokens.
    /// @param poolId The ID of the pool.
    /// @return poolExists whether pool exists or not.
    /// @return tokens stable asset pool tokens.
    function getStableAssetPoolTokens(
        uint32 poolId
    ) external view returns (bool, address[] memory);

    /// @notice Get stable asset pool total supply.
    /// @param poolId The ID of the pool.
    /// @return poolExists whether pool exists or not.
    /// @return totalSupply total supply value.
    function getStableAssetPoolTotalSupply(
        uint32 poolId
    ) external view returns (bool, uint256);

    /// @notice Get stable asset pool precision.
    /// @param poolId The ID of the pool.
    /// @return poolExists whether pool exists or not.
    /// @return precision precision value.
    function getStableAssetPoolPrecision(
        uint32 poolId
    ) external view returns (bool, uint256);

    /// @notice Get stable asset pool mint fee.
    /// @param poolId The ID of the pool.
    /// @return poolExists whether pool exists or not.
    /// @return mintFee mint fee value.
    function getStableAssetPoolMintFee(
        uint32 poolId
    ) external view returns (bool, uint256);

    /// @notice Get stable asset pool swap fee.
    /// @param poolId The ID of the pool.
    /// @return poolExists whether pool exists or not.
    /// @return swapFee swap fee value.
    function getStableAssetPoolSwapFee(
        uint32 poolId
    ) external view returns (bool, uint256);

    /// @notice Get stable asset pool redeem fee.
    /// @param poolId The ID of the pool.
    /// @return poolExists whether pool exists or not.
    /// @return redeemFee redeem fee value.
    function getStableAssetPoolRedeemFee(
        uint32 poolId
    ) external view returns (bool, uint256);

    /// @notice Stable asset swap tokens.
    /// @dev It'll emit an {StableAssetSwapped} event.
    /// @param poolId The ID of the pool.
    /// @param i The array index of the input token in stableAsset tokens.
    /// @param j The array index of the output token in stableAsset tokens.
    /// @param dx The amount of input token.
    /// @param minDY The minimum amount of output token received.
    /// @param assetLength The length of array in stableAsset tokens.
    /// @return Returns a boolean value indicating whether the operation succeeded.
    function stableAssetSwap(
        uint32 poolId,
        uint32 i,
        uint32 j,
        uint256 dx,
        uint256 minDY,
        uint32 assetLength
    ) external returns (bool);

    /// @notice Stable asset mint.
    /// @dev It'll emit an {StableAssetMinted} event.
    /// @param poolId The ID of the pool.
    /// @param amounts amount of tokens to be put in the pool.
    /// @param minMintAmount amount of minimum pool token received.
    /// @return Returns a boolean value indicating whether the operation succeeded.
    function stableAssetMint(
        uint32 poolId,
        uint256[] calldata amounts,
        uint256 minMintAmount
    ) external returns (bool);

    /// @notice Stable asset redeem, redeems the token proportionally.
    /// @dev It'll emit an {StableAssetRedeemed} event.
    /// @param poolId The ID of the pool.
    /// @param redeemAmount The amount of pool token to be redeemed.
    /// @param amounts The minimum amounts of redeemed token received.
    /// @return Returns a boolean value indicating whether the operation succeeded.
    function stableAssetRedeem(
        uint32 poolId,
        uint256 redeemAmount,
        uint256[] calldata amounts
    ) external returns (bool);

    /// @notice Stable asset redeem single, Redeems token into single token from pool.
    /// @dev It'll emit an {StableAssetRedeemedSingle} event.
    /// @param poolId The ID of the pool.
    /// @param redeemAmount The amount of pool token to be redeemed.
    /// @param i The the array index of the input token in stable pool.
    /// @param minRedeemAmount The minimum amount of token received.
    /// @param assetLength The length of array of tokens in stable pool.
    /// @return Returns a boolean value indicating whether the operation succeeded.
    function stableAssetRedeemSingle(
        uint32 poolId,
        uint256 redeemAmount,
        uint32 i,
        uint256 minRedeemAmount,
        uint32 assetLength
    ) external returns (bool);

    /// @notice Stable asset redeem multi, Redeems token into single token from pool.
    /// @dev It'll emit an {StableAssetRedeemedMulti} event.
    /// @param poolId The ID of the pool.
    /// @param amounts The amount of underlying token to be received.
    /// @param maxRedeemAmount The maximum amount of pool token to be input.
    /// @return Returns a boolean value indicating whether the operation succeeded.
    function stableAssetRedeemMulti(
        uint32 poolId,
        uint256[] calldata amounts,
        uint256 maxRedeemAmount
    ) external returns (bool);
}
