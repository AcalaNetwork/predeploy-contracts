// SPDX-License-Identifier: GPL-3.0-or-later

pragma solidity ^0.8.0;

import "./InterfaceIncentives.sol";

contract Incentives is InterfaceIncentives {
    address constant private precompile = address(0x000000000000000000000000000000000000040A);

    function getIncentiveRewardAmount(PoolId pool, address poolCurrencyId)
    public
    view
    override
    returns (uint256) {
        (bool success, bytes memory returnData) = precompile.staticcall(abi.encodeWithSignature("getIncentiveRewardAmount(PoolId,address,address)", pool, poolCurrencyId));
        assembly {
            if eq(success, 0) {
                revert(add(returnData, 0x20), returndatasize())
            }
        }

        return abi.decode(returnData, (uint256));
    }

    function getDexRewardRate(address currencyId)
    public
    view
    override
    returns (uint256) {
        (bool success, bytes memory returnData) = precompile.staticcall(abi.encodeWithSignature("getDexRewardRate(address)", currencyId));
        assembly {
            if eq(success, 0) {
                revert(add(returnData, 0x20), returndatasize())
            }
        }

        return abi.decode(returnData, (uint256));
    }

    function depositDexShare(address currencyId, uint128 amount)
    public
    override
    returns (bool) {
        require(amount != 0, "Incentives: amount is zero");

        (bool success, bytes memory returnData) = precompile.staticcall(abi.encodeWithSignature("depositDexShare(address,address,uint128)", msg.sender, currencyId, amount));
        assembly {
            if eq(success, 0) {
                revert(add(returnData, 0x20), returndatasize())
            }
        }

        emit DepositedShare(msg.sender, currencyId, amount);
        return true;
    }

    function withdrawDexShare(address currencyId, uint128 amount)
    public
    override
    returns (bool) {
        require(amount != 0, "Incentives: amount is zero");

        (bool success, bytes memory returnData) = precompile.staticcall(abi.encodeWithSignature("withdrawDexShare(address,address,uint128)", msg.sender, currencyId, amount));
        assembly {
            if eq(success, 0) {
                revert(add(returnData, 0x20), returndatasize())
            }
        }

        emit WithdrewShare(msg.sender, currencyId, amount);
        return true;
    }

    function claimRewards(PoolId pool, address poolCurrencyId)
    public
    override
    returns (bool) {
        (bool success, bytes memory returnData) = precompile.staticcall(abi.encodeWithSignature("claimRewards(address,PoolId,address)", msg.sender, pool, poolCurrencyId));
        assembly {
            if eq(success, 0) {
                revert(add(returnData, 0x20), returndatasize())
            }
        }

        emit ClaimedRewards(msg.sender, pool, poolCurrencyId);
        return true;
    }

    function getClaimRewardDeductionRate(PoolId pool, address poolCurrencyId)
    public
    view
    override
    returns (uint256) {
        (bool success, bytes memory returnData) = precompile.staticcall(abi.encodeWithSignature("getClaimRewardDeductionRate(PoolId,address)", pool, poolCurrencyId));
        assembly {
            if eq(success, 0) {
                revert(add(returnData, 0x20), returndatasize())
            }
        }

        return abi.decode(returnData, (uint256));
    }

    function getPendingRewards(address[] memory currencyIds, PoolId pool, address poolCurrencyId, address who)
    public
    view
    override
    returns (uint256[] memory) {
        (bool success, bytes memory returnData) = precompile.staticcall(abi.encodeWithSignature("getPendingRewards(address[],PoolId,address,address)", currencyIds, pool, poolCurrencyId, who));
        assembly {
            if eq(success, 0) {
                revert(add(returnData, 0x20), returndatasize())
            }
        }

        return abi.decode(returnData, (uint256[]));
    }
}