// SPDX-License-Identifier: GPL-3.0-or-later

pragma solidity ^0.8.0;

import "./InterfaceIncentives.sol";

contract Incentives is InterfaceIncentives {
    address constant private PRECOMPILE = address(0x000000000000000000000000000000000000040A);

    /**
     * @dev Gets reward amount in `rewardCurrency` added per period
     * Returns (reward_amount)
     */
    function getIncentiveRewardAmount(PoolId pool, address poolCurrencyId, address rewardCurrencyId)
    public
    view
    override
    returns (uint256) {
        (bool success, bytes memory returnData) = PRECOMPILE.staticcall(
            abi.encodeWithSignature(
                "getIncentiveRewardAmount(PoolId,address,address)",
                pool, poolCurrencyId, rewardCurrencyId
            )
        );
        assembly {
            if eq(success, 0) {
                revert(add(returnData, 0x20), returndatasize())
            }
        }

        return abi.decode(returnData, (uint256));
    }

    /**
     * @dev Stake LP token to add shares to PoolId::Dex
     * Returns a boolean value indicating whether the operation succeeded.
     */
    function depositDexShare(address currencyId, uint256 amount)
    public
    override
    returns (bool) {
        require(amount != 0, "Incentives: amount is zero");

        (bool success, bytes memory returnData) = PRECOMPILE.call(
            abi.encodeWithSignature("depositDexShare(address,address,uint256)", msg.sender, currencyId, amount)
        );
        assembly {
            if eq(success, 0) {
                revert(add(returnData, 0x20), returndatasize())
            }
        }

        emit DepositedShare(msg.sender, currencyId, amount);
        return true;
    }

    /**
     * @dev Unstake LP token to remove shares from PoolId::Dex
     * Returns a boolean value indicating whether the operation succeeded.
     */
    function withdrawDexShare(address currencyId, uint256 amount)
    public
    override
    returns (bool) {
        require(amount != 0, "Incentives: amount is zero");

        (bool success, bytes memory returnData) = PRECOMPILE.call(
            abi.encodeWithSignature("withdrawDexShare(address,address,uint256)", msg.sender, currencyId, amount)
        );
        assembly {
            if eq(success, 0) {
                revert(add(returnData, 0x20), returndatasize())
            }
        }

        emit WithdrewShare(msg.sender, currencyId, amount);
        return true;
    }

    /**
     * @dev Claim all avalible multi currencies rewards for specific PoolId
     * Returns a boolean value indicating whether the operation succeeded.
     */
    function claimRewards(PoolId pool, address poolCurrencyId)
    public
    override
    returns (bool) {
        (bool success, bytes memory returnData) = PRECOMPILE.call(
            abi.encodeWithSignature("claimRewards(address,PoolId,address)", msg.sender, pool, poolCurrencyId)
        );
        assembly {
            if eq(success, 0) {
                revert(add(returnData, 0x20), returndatasize())
            }
        }

        emit ClaimedRewards(msg.sender, pool, poolCurrencyId);
        return true;
    }

    /**
     * @dev Gets deduction rate for claiming reward early
     * returns (claim_reward_deduction_rate) as a FixedU128 representing a decimal value
     */
    function getClaimRewardDeductionRate(PoolId pool, address poolCurrencyId)
    public
    view
    override
    returns (uint256) {
        (bool success, bytes memory returnData) = PRECOMPILE.staticcall(
            abi.encodeWithSignature("getClaimRewardDeductionRate(PoolId,address)", pool, poolCurrencyId)
        );
        assembly {
            if eq(success, 0) {
                revert(add(returnData, 0x20), returndatasize())
            }
        }

        return abi.decode(returnData, (uint256));
    }

    /**
     * @dev Gets the pending rewards for a pool, actual reward could be deducted.
     * returns (balances), an array of reward balances corresponding to currencyIds
     */
    function getPendingRewards(address[] calldata currencyIds, PoolId pool, address poolCurrencyId, address who)
    public
    view
    override
    returns (uint256[] memory) {
        (bool success, bytes memory returnData) = PRECOMPILE.staticcall(
            abi.encodeWithSignature(
                "getPendingRewards(address[],PoolId,address,address)",
                currencyIds, pool, poolCurrencyId, who
            )
        );
        assembly {
            if eq(success, 0) {
                revert(add(returnData, 0x20), returndatasize())
            }
        }

        return abi.decode(returnData, (uint256[]));
    }
}
