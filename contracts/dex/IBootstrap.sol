// SPDX-License-Identifier: GPL-3.0-or-later

pragma solidity ^0.8.0;

/// @title IBootstrap Predeploy Contract Interface
/// @author Acala Developers
/// @notice You can use this predeploy contract to call the bootstrap functions of dex pallet
/// @dev The interface through which solidity contracts will interact with dex pallet
interface IBootstrap {
    /// @notice AddProvision event.
    /// @param sender The sender of the transaction.
    /// @param tokenA The ERC20 address of the tokenA.
    /// @param tokenB The ERC20 address of the tokenB.
    /// @param amountA The amount of tokenA contribute to provision pool.
    /// @param amountB The amount of tokenB contribute to provision pool.
    event AddProvision(
        address indexed sender,
        address indexed tokenA,
        address indexed tokenB,
        uint256 amountA,
        uint256 amountB
    );

    /// @notice Claim share event.
    /// @param who The owner of the claimed share.
    /// @param tokenA The ERC20 address of the tokenA.
    /// @param tokenB The ERC20 address of the tokenB.
    /// @param amount The amount of claimed share token.
    event ClaimShare(
        address indexed who,
        address indexed tokenA,
        address indexed tokenB,
        uint256 amount
    );

    /// @notice Get total provision pool of the tokenA and tokenB.
    /// @param tokenA The ERC20 address of the tokenA.
    /// @param tokenB The ERC20 address of the tokenB.
    /// @return Returns (provision_a, provision_b).
    function getProvisionPool(
        address tokenA,
        address tokenB
    ) external view returns (uint256, uint256);

    /// @notice Get who's provision of the tokenA and tokenB.
    /// @param who The contributor.
    /// @param tokenA The ERC20 address of the tokenA.
    /// @param tokenB The ERC20 address of the tokenB.
    /// @return Returns (provision_a, provision_b).
    function getProvisionPoolOf(
        address who,
        address tokenA,
        address tokenB
    ) external view returns (uint256, uint256);

    /// @notice Get the initial share exchange rate of the ended provision pool of tokenA and tokenB. 100% = 1**18
    /// @param tokenA The ERC20 address of the tokenA.
    /// @param tokenB The ERC20 address of the tokenB.
    /// @return Returns (rateA, rateB).
    function getInitialShareExchangeRate(
        address tokenA,
        address tokenB
    ) external view returns (uint256, uint256);

    /// @notice Add provision to the bootstrapping trading pair.
    /// @dev It'll emit an {AddProvision} event.
    /// @param tokenA The ERC20 address of the tokenA.
    /// @param tokenB The ERC20 address of the tokenB.
    /// @param amountA The amount of tokenA contribute to liquidity pool.
    /// @param amountB The amount of tokenB contribute to liquidity pool.
    /// @return Returns a boolean value indicating whether the operation succeeded.
    function addProvision(
        address tokenA,
        address tokenB,
        uint256 amountA,
        uint256 amountB
    ) external returns (bool);

    /// @notice Claim share token of the ended bootstrap trading pair for `who`.
    /// @dev It'll emit an {ClaimShare} event.
    /// @param who The contributor.
    /// @param tokenA The ERC20 address of the tokenA.
    /// @param tokenB The ERC20 address of the tokenB.
    /// @return Returns a boolean value indicating whether the operation succeeded.
    function claimDexShare(
        address who,
        address tokenA,
        address tokenB
    ) external returns (bool);

    /// @notice Refund the contribution token of the aborted bootstrap trading pair for `who`.
    /// @param who The contributor.
    /// @param tokenA The ERC20 address of the tokenA.
    /// @param tokenB The ERC20 address of the tokenB.
    /// @return Returns a boolean value indicating whether the operation succeeded.
    function refundProvision(
        address who,
        address tokenA,
        address tokenB
    ) external returns (bool);
}
