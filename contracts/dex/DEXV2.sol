// SPDX-License-Identifier: GPL-3.0-or-later

pragma solidity ^0.8.0;

import {IDEX} from "./IDEX.sol";
import {DEX} from "./DEX.sol";
import {IBootstrap} from "./IBootstrap.sol";

/// @title DEX Predeploy Contract, V2, support bootstrap
/// @author Acala Developers
/// @notice You can use this predeploy contract to call dex pallet
/// @dev This contracts will interact with dex pallet
contract DEXV2 is DEX, IBootstrap {
    /// @inheritdoc IBootstrap
    function getProvisionPool(address tokenA, address tokenB) public view override returns (uint256, uint256) {
        require(tokenA != address(0), "DEX: tokenA is zero address");
        require(tokenB != address(0), "DEX: tokenB is zero address");

        (bool success, bytes memory returnData) =
            PRECOMPILE.staticcall(abi.encodeWithSignature("getProvisionPool(address,address)", tokenA, tokenB));
        assembly {
            if eq(success, 0) { revert(add(returnData, 0x20), returndatasize()) }
        }

        return abi.decode(returnData, (uint256, uint256));
    }

    /// @inheritdoc IBootstrap
    function getProvisionPoolOf(address who, address tokenA, address tokenB)
        public
        view
        override
        returns (uint256, uint256)
    {
        require(tokenA != address(0), "DEX: tokenA is zero address");
        require(tokenB != address(0), "DEX: tokenB is zero address");

        (bool success, bytes memory returnData) = PRECOMPILE.staticcall(
            abi.encodeWithSignature("getProvisionPoolOf(address, address,address)", who, tokenA, tokenB)
        );
        assembly {
            if eq(success, 0) { revert(add(returnData, 0x20), returndatasize()) }
        }

        return abi.decode(returnData, (uint256, uint256));
    }

    /// @inheritdoc IBootstrap
    function getInitialShareExchangeRate(address tokenA, address tokenB)
        public
        view
        override
        returns (uint256, uint256)
    {
        require(tokenA != address(0), "DEX: tokenA is zero address");
        require(tokenB != address(0), "DEX: tokenB is zero address");

        (bool success, bytes memory returnData) = PRECOMPILE.staticcall(
            abi.encodeWithSignature("getInitialShareExchangeRate(address,address)", tokenA, tokenB)
        );
        assembly {
            if eq(success, 0) { revert(add(returnData, 0x20), returndatasize()) }
        }

        return abi.decode(returnData, (uint256, uint256));
    }

    /// @inheritdoc IBootstrap
    function addProvision(address tokenA, address tokenB, uint256 amountA, uint256 amountB)
        public
        override
        returns (bool)
    {
        require(tokenA != address(0), "DEX: tokenA is zero address");
        require(tokenB != address(0), "DEX: tokenB is zero address");
        require(amountA != 0 || amountB != 0, "DEX: invalid contribution amount");

        (bool success, bytes memory returnData) = PRECOMPILE.call(
            abi.encodeWithSignature(
                "addProvision(address,address,address,uint256,uint256)", msg.sender, tokenA, tokenB, amountA, amountB
            )
        );
        assembly {
            if eq(success, 0) { revert(add(returnData, 0x20), returndatasize()) }
        }

        emit AddProvision(msg.sender, tokenA, tokenB, amountA, amountB);
        return true;
    }

    /// @inheritdoc IBootstrap
    function claimDexShare(address who, address tokenA, address tokenB) public override returns (bool) {
        require(who != address(0), "DEX: who is zero address");
        require(tokenA != address(0), "DEX: tokenA is zero address");
        require(tokenB != address(0), "DEX: tokenB is zero address");

        (bool success, bytes memory returnData) =
            PRECOMPILE.call(abi.encodeWithSignature("claimDexShare(address,address,address)", who, tokenA, tokenB));
        assembly {
            if eq(success, 0) { revert(add(returnData, 0x20), returndatasize()) }
        }

        emit ClaimShare(who, tokenA, tokenB, abi.decode(returnData, (uint256)));
        return true;
    }

    /// @inheritdoc IBootstrap
    function refundProvision(address who, address tokenA, address tokenB) public override returns (bool) {
        require(who != address(0), "DEX: who is zero address");
        require(tokenA != address(0), "DEX: tokenA is zero address");
        require(tokenB != address(0), "DEX: tokenB is zero address");

        (bool success, bytes memory returnData) =
            PRECOMPILE.call(abi.encodeWithSignature("refundProvision(address,address,address)", who, tokenA, tokenB));
        assembly {
            if eq(success, 0) { revert(add(returnData, 0x20), returndatasize()) }
        }

        return true;
    }
}
