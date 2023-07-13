// SPDX-License-Identifier: GPL-3.0-or-later

pragma solidity ^0.8.0;

/// @title Liquid Crowdloan Predeploy Contract Interface
/// @author Acala Developers
/// @notice You can use this predeploy contract to call liquid-crowdloan pallet
/// @dev The interface through which solidity contracts will interact with liquid-crowdloan pallet
interface ILiquidCrowdloan {
    /// @notice LCDOT is redeemed.
    /// @param sender The sender of the transaction.
    /// @param amount The redeem amount in LCDOT.
    /// @param redeemAmount The redeem amount in redeem token.
    event Redeemed(address indexed sender, uint256 amount, uint256 redeemAmount);

    /// @notice Redeem LCDOT.
    /// @dev It'll emit an {Redeemed} event. Use {getRedeemCurrency} to check the redeem currency.
    /// @param amount The amount of LCDOT to redeem.
    /// @return Returns how much redeem token is received.
    function redeem(uint256 amount) external returns (uint256);

    /// @notice Get the redeem currency address.
    /// @return Returns the redeem currency address.
    function getRedeemCurrency() external view returns (address);
}
