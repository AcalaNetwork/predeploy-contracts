// SPDX-License-Identifier: GPL-3.0-or-later

// inherit on IERC20 interface of @openzeppelin/contracts (v4.5.0):
// https://github.com/OpenZeppelin/openzeppelin-contracts/blob/v4.5.0/contracts/token/ERC20/IERC20.sol

pragma solidity ^0.8.0;

import {IERC20} from "@openzeppelin/contracts/token/ERC20/IERC20.sol";

/// @title IToken Predeploy Contract Interface
/// @author Acala Developers
/// @notice You can use this predeploy contract to call currencies pallet
/// @dev The interface through which solidity contracts will interact with currencies pallet
interface IToken is IERC20 {
    /// @notice Transfer event to AccountId32 type account.
    /// @param sender The sender of the transaction.
    /// @param dest The dest AccountId32 type account.
    /// @param amount The transfer amount.
    /// @dev This is Transfer event which transfer AccountId32 type account.
    event TransferToAccountId32(
        address indexed sender,
        bytes32 indexed dest,
        uint256 amount
    );

    /// @notice Moves `amount` tokens from the caller's account to `dest`, which is AccountId32 type account.
    /// @dev It'll emit an {TransferToAccountId32} event. The caller must have a balance of at least `amount`.
    /// @param dest The dest AccountId32 type account, it cannot be the zero AccountId32.
    /// @param amount The transfer amount.
    /// @return Returns a boolean value indicating whether the operation succeeded.
    function transferToAccountId32(
        bytes32 dest,
        uint256 amount
    ) external returns (bool);
}
