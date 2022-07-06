// SPDX-License-Identifier: GPL-3.0-or-later

pragma solidity ^0.7.0;

interface IHoma {
    event Minted(address indexed sender, uint256 amount);
    event RequestedRedeem(address indexed sender, uint256 amount, bool fastMatch);

    // Mint liquid currency with staking currency.
    // Returns a boolean value indicating whether the operation succeeded.
    function mint(uint256 mintAmount) external returns (bool);

    // Request to redeem liquid curency for staking currency
    // Returns a boolean value indicating whether the operation succeeded.
    function requestRedeem(uint256 redeemAmount, bool fastMatch) external returns (bool);

    // Get exchange rate
    // returns (exchange_rate) is a FixedU128 representing a decimal
    function getExchangeRate() external view returns (uint256);

    // Get estimated reward rate
    // returns (reward_rate) is a FixedU128 representing a decimal value
    function getEstimatedRewardRate() external view returns (uint256);

    // Get commission rate
    // returns (commission_rate) is a FixedU128 representing a decimal
    function getCommissionRate() external view returns (uint256);

    // Get fast match fee rate
    // returns (fast_match_fee) is a FixedU128 representing a decimal
    function getFastMatchFee() external view returns (uint256);
}
