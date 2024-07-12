// SPDX-License-Identifier: GPL-3.0-or-later

pragma solidity ^0.8.0;

import {IEarning} from "./IEarning.sol";

/// @title Earning Predeploy Contract
/// @author Acala Developers
/// @notice You can use this predeploy contract to call earning pallet
/// @dev This contracts will interact with earning pallet
contract Earning is IEarning {
    /// @dev The Earning precompile address.
    address private constant PRECOMPILE = address(0x000000000000000000000000000000000000040d);

    /// @inheritdoc IEarning
    function bond(uint256 bondAmount) public override returns (bool) {
        require(bondAmount != 0, "Earning: bondAmount is zero");

        (bool success, bytes memory returnData) =
            PRECOMPILE.call(abi.encodeWithSignature("bond(address,uint256)", msg.sender, bondAmount));
        assembly {
            if eq(success, 0) { revert(add(returnData, 0x20), returndatasize()) }
        }

        emit Bonded(msg.sender, abi.decode(returnData, (uint256)));
        return true;
    }

    /// @inheritdoc IEarning
    function unbond(uint256 unbondAmount) public override returns (bool) {
        require(unbondAmount != 0, "Earning: unbondAmount is zero");

        (bool success, bytes memory returnData) =
            PRECOMPILE.call(abi.encodeWithSignature("unbond(address,uint256)", msg.sender, unbondAmount));
        assembly {
            if eq(success, 0) { revert(add(returnData, 0x20), returndatasize()) }
        }

        emit Unbonded(msg.sender, abi.decode(returnData, (uint256)));
        return true;
    }

    /// @inheritdoc IEarning
    function unbondInstant(uint256 unbondAmount) public override returns (bool) {
        require(unbondAmount != 0, "Earning: unbondAmount is zero");

        (bool success, bytes memory returnData) =
            PRECOMPILE.call(abi.encodeWithSignature("unbondInstant(address,uint256)", msg.sender, unbondAmount));
        assembly {
            if eq(success, 0) { revert(add(returnData, 0x20), returndatasize()) }
        }

        emit Unbonded(msg.sender, abi.decode(returnData, (uint256)));
        return true;
    }

    /// @inheritdoc IEarning
    function rebond(uint256 rebondAmount) public override returns (bool) {
        require(rebondAmount != 0, "Earning: rebondAmount is zero");

        (bool success, bytes memory returnData) =
            PRECOMPILE.call(abi.encodeWithSignature("rebond(address,uint256)", msg.sender, rebondAmount));
        assembly {
            if eq(success, 0) { revert(add(returnData, 0x20), returndatasize()) }
        }

        emit Rebonded(msg.sender, abi.decode(returnData, (uint256)));
        return true;
    }

    /// @inheritdoc IEarning
    function withdrawUnbonded() public override returns (bool) {
        (bool success, bytes memory returnData) =
            PRECOMPILE.call(abi.encodeWithSignature("withdrawUnbonded(address)", msg.sender));
        assembly {
            if eq(success, 0) { revert(add(returnData, 0x20), returndatasize()) }
        }

        emit Withdrawn(msg.sender, abi.decode(returnData, (uint256)));
        return true;
    }

    /// @inheritdoc IEarning
    function getBondingLedger(address who) public view override returns (BondingLedger memory) {
        (bool success, bytes memory returnData) =
            PRECOMPILE.staticcall(abi.encodeWithSignature("getBondingLedger(address)", who));
        assembly {
            if eq(success, 0) { revert(add(returnData, 0x20), returndatasize()) }
        }

        return abi.decode(returnData, (BondingLedger));
    }

    /// @inheritdoc IEarning
    function getInstantUnstakeFee() public view override returns (uint256, uint256) {
        (bool success, bytes memory returnData) =
            PRECOMPILE.staticcall(abi.encodeWithSignature("getInstantUnstakeFee()"));
        assembly {
            if eq(success, 0) { revert(add(returnData, 0x20), returndatasize()) }
        }

        return abi.decode(returnData, (uint256, uint256));
    }

    /// @inheritdoc IEarning
    function getMinBond() public view override returns (uint256) {
        (bool success, bytes memory returnData) = PRECOMPILE.staticcall(abi.encodeWithSignature("getMinBond()"));
        assembly {
            if eq(success, 0) { revert(add(returnData, 0x20), returndatasize()) }
        }

        return abi.decode(returnData, (uint256));
    }

    /// @inheritdoc IEarning
    function getUnbondingPeriod() public view override returns (uint256) {
        (bool success, bytes memory returnData) = PRECOMPILE.staticcall(abi.encodeWithSignature("getUnbondingPeriod()"));
        assembly {
            if eq(success, 0) { revert(add(returnData, 0x20), returndatasize()) }
        }

        return abi.decode(returnData, (uint256));
    }

    /// @inheritdoc IEarning
    function getMaxUnbondingChunks() public view override returns (uint256) {
        (bool success, bytes memory returnData) =
            PRECOMPILE.staticcall(abi.encodeWithSignature("getMaxUnbondingChunks()"));
        assembly {
            if eq(success, 0) { revert(add(returnData, 0x20), returndatasize()) }
        }

        return abi.decode(returnData, (uint256));
    }
}
