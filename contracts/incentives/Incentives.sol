// SPDX-License-Identifier: GPL-3.0-or-later

pragma solidity ^0.8.0;

import "./InterfaceIncentives.sol";

/// @title Incentives Predeploy Contract
/// @author Acala Developers
/// @notice You can use this predeploy contract to call incentives pallet
/// @dev This contracts will interact with incentives pallet
contract Incentives is InterfaceIncentives {
    /// @dev The Incentives precompile address.
    address constant private PRECOMPILE = address(0x000000000000000000000000000000000000040A);

    /// @inheritdoc InterfaceIncentives
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

    /// @inheritdoc InterfaceIncentives
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

    /// @inheritdoc InterfaceIncentives
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

    /// @inheritdoc InterfaceIncentives
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

    /// @inheritdoc InterfaceIncentives
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

    /// @inheritdoc InterfaceIncentives
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
