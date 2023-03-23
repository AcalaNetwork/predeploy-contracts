// SPDX-License-Identifier: GPL-3.0-or-later

pragma solidity ^0.8.0;

/// @title Oracle Predeploy Contract Interface
/// @author Acala Developers
/// @notice You can use this predeploy contract to call oracle pallet
/// @dev The interface through which solidity contracts will interact with oracle pallet
interface IOracle {
    /// @notice Get the price of the currency_id.
    /// @param token The ERC20 address of currency_id.
    /// @return Returns the (price, timestamp).
    function getPrice(address token) external view returns (uint256);
}
