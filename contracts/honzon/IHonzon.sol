// SPDX-License-Identifier: GPL-3.0-or-later

pragma solidity ^0.7.0;

interface IHonzon {
    event AdjustedLoan(address indexed sender, address indexed currencyId, int128 collateralAdjustment, int128 debitAdjustment);
    event ClosedLoanByDex(address indexed sender, address indexed currencyId);

    // Adjust CDP position
    // Returns a boolean value indicating whether the operation succeeded.
    function adjustLoan(address currencyId, int128 collateralAdjustment, int128 debitAdjustment) external returns (bool);

    // Close CDP position with DEX
    // Returns a boolean value indicating whether the operation succeeded.
    function closeLoanByDex(address currencyId, uint256 maxCollateralAmount) external returns (bool);

    // Get an open CDP position
    // returns (collateral_amount, debit_amount)
    function getPosition(address who, address currencyId) external view returns (uint256, uint256);

    // Get liquidation ratio for a currencyId
    // returns (liquidation_ratio) is a FixedU128 representing a decimal value
    function getLiquidationRatio(address currencyId) external view returns (uint256);

    // Get current collateral ratio for a particular CDP position
    // returns (current_collateral_ratio) is a FixedU128 representing a decimal value
    function getCurrentCollateralRatio(address who, address currencyId) external view returns (uint256);

    // Get exchange rate of debit units to debit value for a currency_id
    // returns (exchange_rate) is a FixedU128 representing a decimal value
    function getDebitExchangeRate(address currencyId) external view returns (uint256);
}
