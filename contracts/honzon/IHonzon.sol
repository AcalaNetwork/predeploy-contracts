// SPDX-License-Identifier: GPL-3.0-or-later

pragma solidity ^0.8.0;

/// @title Honzon Predeploy Contract Interface
/// @author Acala Developers
/// @notice You can use this predeploy contract to call honzon pallet
/// @dev The interface through which solidity contracts will interact with honzon pallet
interface IHonzon {
    /// @notice Adjusted Loan event.
    /// @param sender The sender of the transaction.
    /// @param currencyId The collateral currency id.
    /// @param collateralAdjustment The signed amount, positive means to deposit collateral currency into CDP, negative means withdraw collateral currency from CDP.
    /// @param debitAdjustment The signed amount, positive means to issue some amount of stablecoin to caller according to the debit adjustment, negative means caller will payback some amount of stablecoin to CDP according to to the debit adjustment.
    event AdjustedLoan(
        address indexed sender,
        address indexed currencyId,
        int128 collateralAdjustment,
        int128 debitAdjustment
    );

    /// @notice Closed loan by DEX event.
    /// @param sender The sender of the transaction.
    /// @param currencyId The collateral currency id.
    event ClosedLoanByDex(address indexed sender, address indexed currencyId);

    /// @notice Adjust CDP position.
    /// @dev It'll emit an {AdjustedLoan} event.
    /// @param currencyId The collateral currency id.
    /// @param collateralAdjustment The signed amount, positive means to deposit collateral currency into CDP, negative means withdraw collateral currency from CDP.
    /// @param debitAdjustment The signed amount, positive means to issue some amount of stablecoin to caller according to the debit adjustment, negative means caller will payback some amount of stablecoin to CDP according to to the debit adjustment.
    /// @return Returns a boolean value indicating whether the operation succeeded.
    function adjustLoan(
        address currencyId,
        int128 collateralAdjustment,
        int128 debitAdjustment
    ) external returns (bool);

    /// @notice Close CDP position with DEX.
    /// @dev It'll emit an {ClosedLoanByDex} event.
    /// @param currencyId The collateral currency id.
    /// @param maxCollateralAmount The max collateral amount which is used to swap enough stable token to clear debit.
    /// @return Returns a boolean value indicating whether the operation succeeded.
    function closeLoanByDex(address currencyId, uint256 maxCollateralAmount) external returns (bool);

    /// @notice Get an open CDP position.
    /// @param who The specified user.
    /// @param currencyId The collateral currency id.
    /// @return Returns (collateral_amount, debit_amount).
    function getPosition(address who, address currencyId) external view returns (uint256, uint256);

    /// @notice Get collateral parameters for a currencyId
    /// @param currencyId The collateral currency id.
    /// @return Returns (params) which is an array with 5 entries in the order that follows:
    /// - [0] `maximum_total_debit_value`: Hardcap of total debit value generated from this collateral.
    /// - [1] `interest_rate_per_sec`: A FixedU128 representing a decimal value. Interest rate of CDP loan per second
    /// - [2] `liquidation_ratio`: A FixedU128 representing a decimal value. Liquidation ratio for this collateral type
    /// - [3] `liquidation_penalty`: A FixedU128 representing a decimal value. Penalty added on for getting liquidated
    /// - [4] `required_collateral_ratio`: A FixedU128 representing a decimal value. Cannot adjust the position of CDP so that the current collateral ratio is lower than the required collateral ratio.
    function getCollateralParameters(address currencyId) external view returns (uint256[] memory);

    /// @notice Get current collateral ratio for a particular CDP position
    /// @param who The specified user.
    /// @param currencyId The collateral currency id.
    /// @return Returns (current_collateral_ratio), value is FixedU128 with a range of [0.000000000000000000, 340282366920938463463.374607431768211455]
    function getCurrentCollateralRatio(address who, address currencyId) external view returns (uint256);

    /// @notice Get exchange rate of debit units to debit value for a currency_id
    /// @param currencyId The collateral currency id.
    /// @return Returns (exchange_rate), value is FixedU128 with a range of [0.000000000000000000, 340282366920938463463.374607431768211455]
    function getDebitExchangeRate(address currencyId) external view returns (uint256);
}
