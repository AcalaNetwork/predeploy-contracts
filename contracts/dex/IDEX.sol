// SPDX-License-Identifier: GPL-3.0-or-later

pragma solidity ^0.8.0;

/// @title IDEX Predeploy Contract Interface
/// @author Acala Developers
/// @notice You can use this predeploy contract to call dex pallet
/// @dev The interface through which solidity contracts will interact with dex pallet
interface IDEX {
    /// @notice Swaped event with DEX.
    /// @param sender The sender of the transaction.
    /// @param path The trading path of the swap transaction.
    /// @param supplyAmount The exact supply amount.
    /// @param targetAmount The exact target amount.
    event Swaped(address indexed sender, address[] path, uint256 supplyAmount, uint256 targetAmount);

    /// @notice Added liquidity event.
    /// @param sender The sender of the transaction.
    /// @param tokenA The ERC20 address of the currency_id_a.
    /// @param tokenB The ERC20 address of the currency_id_b.
    /// @param maxAmountA The maximum amount of currency_id_a is allowed to inject to liquidity pool.
    /// @param maxAmountB The maximum amount of currency_id_b is allowed to inject to liquidity pool.
    event AddedLiquidity(
        address indexed sender,
        address indexed tokenA,
        address indexed tokenB,
        uint256 maxAmountA,
        uint256 maxAmountB
    );

    /// @notice Removed liquidity event.
    /// @param sender The sender of the transaction.
    /// @param tokenA The ERC20 address of the currency_id_a.
    /// @param tokenB The ERC20 address of the currency_id_b.
    /// @param removeShare The liquidity amount has been removed.
    event RemovedLiquidity(address indexed sender, address indexed tokenA, address indexed tokenB, uint256 removeShare);

    /// @notice Get liquidity pool of the currency_id_a and currency_id_b.
    /// @param tokenA The ERC20 address of the currency_id_a.
    /// @param tokenB The ERC20 address of the currency_id_b.
    /// @return Returns (liquidity_a, liquidity_b).
    function getLiquidityPool(address tokenA, address tokenB) external view returns (uint256, uint256);

    /// @notice Get liquidity token address.
    /// @param tokenA The ERC20 address of the currency_id_a.
    /// @param tokenB The ERC20 address of the currency_id_b.
    /// @return Returns (liquidity_token_address). Return address(0x0) if the liquidity token address is not mapped.
    function getLiquidityTokenAddress(address tokenA, address tokenB) external view returns (address);

    /// @notice Get swap target amount.
    /// @param path The trading path of the transaction.
    /// @param supplyAmount The exact supply amount.
    /// @return Returns (target_amount). Returns 0 if getting the target amount fails.
    function getSwapTargetAmount(address[] calldata path, uint256 supplyAmount) external view returns (uint256);

    /// @notice Get swap supply amount.
    /// @param path The trading path of the transaction.
    /// @param targetAmount The exact target amount.
    /// @return Returns (supply_amount). Returns 0 if getting the supply amount fails.
    function getSwapSupplyAmount(address[] calldata path, uint256 targetAmount) external view returns (uint256);

    /// @notice Swap with exact supply.
    /// @dev It'll emit an {Swaped} event.
    /// @param path The trading path of the swap transaction.
    /// @param supplyAmount The exact gsupply amount.
    /// @param minTargetAmount The acceptable minimum target amount.
    /// @return Returns a boolean value indicating whether the operation succeeded.
    function swapWithExactSupply(
        address[] calldata path,
        uint256 supplyAmount,
        uint256 minTargetAmount
    ) external returns (bool);

    /// @notice Swap with exact target.
    /// @dev It'll emit an {Swaped} event.
    /// @param path The trading path of the swap transaction.
    /// @param targetAmount The exact target amount.
    /// @param maxSupplyAmount The acceptable maximum supply amount.
    /// @return Returns a boolean value indicating whether the operation succeeded.
    function swapWithExactTarget(
        address[] calldata path,
        uint256 targetAmount,
        uint256 maxSupplyAmount
    ) external returns (bool);

    /// @notice Add liquidity to the trading pair.
    /// @dev It'll emit an {AddedLiquidity} event.
    /// @param tokenA The ERC20 address of the currency_id_a.
    /// @param tokenB The ERC20 address of the currency_id_b.
    /// @param maxAmountA The maximum amount of currency_id_a is allowed to inject to liquidity pool.
    /// @param maxAmountB The maximum amount of currency_id_b is allowed to inject to liquidity pool.
    /// @param minShareIncrement The minimum acceptable share amount.
    /// @return Returns a boolean value indicating whether the operation succeeded.
    function addLiquidity(
        address tokenA,
        address tokenB,
        uint256 maxAmountA,
        uint256 maxAmountB,
        uint256 minShareIncrement
    ) external returns (bool);

    /// @notice Remove liquidity from the trading pair.
    /// @dev It'll emit an {RemovedLiquidity} event.
    /// @param tokenA The ERC20 address of the currency_id_a.
    /// @param tokenB The ERC20 address of the currency_id_b.
    /// @param removeShare The liquidity amount to remove.
    /// @param minWithdrawnA The minimum acceptable withrawn for currency_id_a.
    /// @param minWithdrawnB The minimum acceptable withrawn for currency_id_b.
    /// @return Returns a boolean value indicating whether the operation succeeded.
    function removeLiquidity(
        address tokenA,
        address tokenB,
        uint256 removeShare,
        uint256 minWithdrawnA,
        uint256 minWithdrawnB
    ) external returns (bool);
}
