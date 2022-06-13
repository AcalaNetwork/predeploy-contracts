// SPDX-License-Identifier: GPL-3.0-or-later

pragma solidity ^0.8.0;

interface InterfaceIncentives {
    event DepositedShare(address indexed sender, address indexed currencyId, uint256 amount);
    event WithdrewShare(address indexed sender, address indexed currencyId, uint256 amount);
    event ClaimedRewards(address indexed sender, PoolId indexed pool, address indexed poolCurrencyId);
    enum PoolId { LOANS, DEX }

    // Gets reward amount in `rewardCurrency` added per period
    // Returns (reward_amount)
    function getIncentiveRewardAmount(PoolId pool, address poolCurrencyId, address rewardCurrencyId) external view returns (uint256);

    // Fixed reward rate for dex reward pool per period
    // Returns (dex_reward_rate) as a FixedU128 representing a decimal
    function getDexRewardRate(address currencyId) external view returns (uint256);

    // Stake LP token to add shares to PoolId::Dex
    // Returns a boolean value indicating whether the operation succeeded.
    function depositDexShare(address currencyId, uint256 amount) external returns (bool);

    // Unstake LP token to remove shares from PoolId::Dex
    // Returns a boolean value indicating whether the operation succeeded.
    function withdrawDexShare(address currencyId, uint256 amount) external returns (bool);

    // Claim all avalible multi currencies rewards for specific PoolId
    // Returns a boolean value indicating whether the operation succeeded.
    function claimRewards(PoolId pool, address poolCurrencyId) external returns (bool);

    // Gets deduction rate for claiming reward early
    // returns (claim_reward_deduction_rate) as a FixedU128 representing a decimal value
    function getClaimRewardDeductionRate(PoolId pool, address poolCurrencyId) external view returns (uint256);

    // Gets the pending rewards for a pool, actual reward could be deducted.
    // returns (balances), an array of reward balances corresponding to currencyIds
    function getPendingRewards(address[] calldata currencyIds, PoolId pool, address poolCurrencyId, address who) external view returns (uint256[] memory);
}
