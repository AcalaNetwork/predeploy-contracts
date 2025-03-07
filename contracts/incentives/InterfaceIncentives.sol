// SPDX-License-Identifier: GPL-3.0-or-later

pragma solidity ^0.8.0;

/// @title Incentives Predeploy Contract Interface
/// @author Acala Developers
/// @notice You can use this predeploy contract to call incentives pallet
/// @dev The interface through which solidity contracts will interact with incentives pallet
interface InterfaceIncentives {
    /// @notice The deposited share event.
    /// @param sender The sender of the transaction.
    /// @param currencyId The LP token currency id.
    /// @param amount The amount to stake.
    event DepositedShare(
        address indexed sender,
        address indexed currencyId,
        uint256 amount
    );

    /// @notice The withdrew share event.
    /// @param sender The sender of the transaction.
    /// @param currencyId The LP token currency id.
    /// @param amount The amount to unstake.
    event WithdrewShare(
        address indexed sender,
        address indexed currencyId,
        uint256 amount
    );

    /// @notice The Claimed rewards event.
    /// @param sender The sender of the transaction.
    /// @param pool The pool type.
    /// @param poolCurrencyId The LP token currency id.
    event ClaimedRewards(
        address indexed sender,
        PoolId indexed pool,
        address indexed poolCurrencyId
    );

    /// @notice Gets reward amount in `rewardCurrency` added per period.
    /// @param LOANS Record the shares and rewards for users of Loans(Honzon protocol).
    /// @param DEX Record the shares and rewards for DEX makers who staking LP token.
    /// @param EARNING Record the shares and rewards for users who staking native token.
    /// @param NOMINEESELECTION Record the shares and rewards for users who staking for Homa nominees election.
    enum PoolId {
        LOANS,
        DEX,
        EARNING,
        NOMINEESELECTION
    }

    /// @notice Gets reward amount in `rewardCurrency` added per period.
    /// @param pool The pool type.
    /// @param poolCurrencyId The LP token currency id.
    /// @param rewardCurrencyId The reward currency id.
    /// @return Returns (reward_amount).
    function getIncentiveRewardAmount(
        PoolId pool,
        address poolCurrencyId,
        address rewardCurrencyId
    ) external view returns (uint256);

    /// @notice Stake LP token to add shares to PoolId::Dex.
    /// @dev It'll emit an {DepositedShare} event.
    /// @param currencyId The LP token currency id.
    /// @param amount The amount to stake.
    /// @return Returns a boolean value indicating whether the operation succeeded.
    function depositDexShare(
        address currencyId,
        uint256 amount
    ) external returns (bool);

    /// @notice Unstake LP token to remove shares from PoolId::Dex.
    /// @dev It'll emit an {WithdrewShare} event.
    /// @param currencyId The LP token currency id.
    /// @param amount The amount to unstake.
    /// @return Returns a boolean value indicating whether the operation succeeded.
    function withdrawDexShare(
        address currencyId,
        uint256 amount
    ) external returns (bool);

    /// @notice Claim all available multi currencies rewards for specific PoolId.
    /// @dev It'll emit an {ClaimedRewards} event.
    /// @param pool The pool type.
    /// @param poolCurrencyId The LP token currency id.
    /// @return Returns a boolean value indicating whether the operation succeeded.
    function claimRewards(
        PoolId pool,
        address poolCurrencyId
    ) external returns (bool);

    /// @notice Gets deduction rate for claiming reward early.
    /// @param pool The pool type.
    /// @param poolCurrencyId The LP token currency id.
    /// @return Returns (claim_reward_deduction_rate) as a FixedU128 representing a decimal value.
    function getClaimRewardDeductionRate(
        PoolId pool,
        address poolCurrencyId
    ) external view returns (uint256);

    /// @notice Gets the pending rewards for a pool, actual reward could be deducted.
    /// @param pool The pool type.
    /// @param poolCurrencyId The LP token currency id.
    /// @param who The specified user.
    /// @return Returns (balances), an array of reward balances corresponding to currencyIds.
    function getPendingRewards(
        address[] calldata currencyIds,
        PoolId pool,
        address poolCurrencyId,
        address who
    ) external view returns (uint256[] memory);
}
