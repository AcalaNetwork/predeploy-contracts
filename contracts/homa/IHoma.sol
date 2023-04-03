// SPDX-License-Identifier: GPL-3.0-or-later

pragma solidity ^0.8.0;

/// @title Homa Predeploy Contract Interface
/// @author Acala Developers
/// @notice You can use this predeploy contract to call homa pallet
/// @dev The interface through which solidity contracts will interact with homa pallet
interface IHoma {
    /// @notice Minted liquid currency event.
    /// @param sender The sender of the transaction.
    /// @param amount The minted amount.
    event Minted(address indexed sender, uint256 amount);

    /// @notice Requested redeem event.
    /// @param sender The sender of the transaction.
    /// @param amount The requested amount.
    /// @param fastMatch Allow the request to be fast matched.
    event RequestedRedeem(
        address indexed sender,
        uint256 amount,
        bool fastMatch
    );

    /// @notice Mint liquid currency with staking currency.
    /// @dev It'll emit an {Minted} event.
    /// @param mintAmount The amount of staking currency used to mint liquid currency.
    /// @return Returns a boolean value indicating whether the operation succeeded.
    function mint(uint256 mintAmount) external returns (bool);

    /// @notice Request to redeem liquid curency for staking currency.
    /// @dev It'll emit an {RequestedRedeem} event.
    /// @param redeemAmount The amount of liquid currency to be requested  redeemed into Staking currency.
    /// @param fastMatch Allow the request to be fast matched, fast match will take a fixed rate as fee.
    /// @return Returns a boolean value indicating whether the operation succeeded.
    function requestRedeem(
        uint256 redeemAmount,
        bool fastMatch
    ) external returns (bool);

    /// @notice Get exchange rate.
    /// @return returns (exchange_rate), value is FixedU128 with a range of
    /// [0.000000000000000000, 340282366920938463463.374607431768211455]
    function getExchangeRate() external view returns (uint256);

    /// @notice Get estimated reward rate.
    /// @return returns (reward_rate), value is FixedU128 with a range of
    /// [0.000000000000000000, 340282366920938463463.374607431768211455].
    function getEstimatedRewardRate() external view returns (uint256);

    /// @notice Get commission rate.
    /// @return returns (commission_rate) is a FixedU128 representing a decimal.
    function getCommissionRate() external view returns (uint256);

    /// @notice Get fast match fee rate.
    /// @return returns (fast_match_fee) is a FixedU128 representing a decimal.
    function getFastMatchFee() external view returns (uint256);
}
