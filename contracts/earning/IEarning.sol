// SPDX-License-Identifier: GPL-3.0-or-later

pragma solidity ^0.8.0;

/// @title Earning Predeploy Contract Interface
/// @author Acala Developers
/// @notice You can use this predeploy contract to call earning pallet
/// @dev The interface through which solidity contracts will interact with earning pallet
interface IEarning {
    struct BondingLedger {
        // Total amount of ledger
        uint256 total;
        // Bonded amount
        uint256 active;
        // Unbonding
        UnlockChunk[] unlocking;
    }

    struct UnlockChunk {
        // Unbonding value
        uint256 value;
        // Expired block for unbonding
        uint256 unlockAt;
    }

    /// @notice Bonded event.
    /// @param sender The sender of the transaction.
    /// @param amount The bond amount.
    event Bonded(address indexed sender, uint256 amount);

    /// @notice Unbonded event.
    /// @param sender The sender of the transaction.
    /// @param amount The unbond amount.
    event Unbonded(address indexed sender, uint256 amount);

    /// @notice Rebonded event.
    /// @param sender The sender of the transaction.
    /// @param amount The rebond amount.
    event Rebonded(address indexed sender, uint256 amount);

    /// @notice Withdraw unbonded.
    /// @param sender The sender of the transaction.
    /// @param amount The withdrawn unbonded amount.
    event Withdrawn(address indexed sender, uint256 amount);

    /// @notice Bond.
    /// @dev It'll emit an {Bonded} event.
    /// @param bondAmount The amount of native currency used to bond.
    /// @return Returns a boolean value indicating whether the operation succeeded.
    function bond(uint256 bondAmount) external returns (bool);

    /// @notice Unbond.
    /// @dev It'll emit an {Unbonded} event.
    /// @param unbondAmount The amount of native currency used to unbond.
    /// @return Returns a boolean value indicating whether the operation succeeded.
    function unbond(uint256 unbondAmount) external returns (bool);

    /// @notice Unbond instant.
    /// @dev It'll emit an {Unbonded} event.
    /// @param unbondAmount The amount of native currency used to unbond instant.
    /// @return Returns a boolean value indicating whether the operation succeeded.
    function unbondInstant(uint256 unbondAmount) external returns (bool);

    /// @notice Rebond.
    /// @dev It'll emit an {Rebonded} event.
    /// @param rebondAmount The amount of native currency used to rebond.
    /// @return Returns a boolean value indicating whether the operation succeeded.
    function rebond(uint256 rebondAmount) external returns (bool);

    /// @notice Withdraw unbonded.
    /// @dev It'll emit an {Withdrawn} event.
    /// @return Returns a boolean value indicating whether the operation succeeded.
    function withdrawUnbonded() external returns (bool);

    /// @notice Get bonding ledger of `who`.
    /// @return returns (BondingLedger).
    function getBondingLedger(address who) external view returns (BondingLedger memory);

    /// @notice Get instant unstake fee ratio.
    /// @return returns (percent, accuracy), the ratio is percent/accuracy
    function getInstantUnstakeFee() external view returns (uint256, uint256);

    /// @notice Get the minimum bond amount.
    /// @return returns (min_bond).
    function getMinBond() external view returns (uint256);

    /// @notice Get unlocking block.
    /// @return returns (unlock_block_number).
    function getUnbondingPeriod() external view returns (uint256);

    /// @notice Get the maximum unlocking chunk amount.
    /// @return returns (maximum_chunks).
    function getMaxUnbondingChunks() external view returns (uint256);
}
