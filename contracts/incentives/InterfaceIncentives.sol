// SPDX-License-Identifier: GPL-3.0-or-later

pragma solidity ^0.8.0;

interface InterfaceIncentives {
    event DepositedShare(address indexed sender, address indexed currencyId, uint128 amount);
    event WithdrewShare(address indexed sender, address indexed currencyId, uint128 amount);
    event ClaimedRewards(address indexed sender, PoolId pool, address indexed poolCurrencyId);
    enum PoolId { LOANS, DEX }

    // Adjust CDP position
    // Returns a boolean value indicating whether the operation succeeded.
    function getIncentiveRewardAmount(PoolId pool, address poolCurrencyId) external view returns (uint256);

    // Close CDP position with DEX
    // Returns a boolean value indicating whether the operation succeeded.
    function getDexRewardRate(address currencyId) external view returns (uint256);

    // Get an open CDP position
    // returns (collateral_amount, debit_amount)
    function depositDexShare(address currencyId, uint128 amount) external returns (bool);

    // Get liquidation ratio for a currencyId
    // returns (liquidation_ratio) is a FixedU128 representing a decimal value
    function withdrawDexShare(address currencyId, uint128 amount) external returns (bool);

    // Get current collateral ratio for a particular CDP position
    // returns (current_collateral_ratio) is a FixedU128 representing a decimal value
    function claimRewards(PoolId pool, address poolCurrencyId) external returns (bool);

    // Get exchange rate of debit units to debit value for a currency_id
    // returns (exchange_rate) is a FixedU128 representing a decimal value
    function getClaimRewardDeductionRate(PoolId pool, address poolCurrencyId) external view returns (uint256);

    function getPendingRewards(address[] calldata currencyIds, PoolId pool, address poolCurrencyId, address who) external view returns (uint256[] memory);
}
