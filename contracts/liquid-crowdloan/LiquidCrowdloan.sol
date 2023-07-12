// SPDX-License-Identifier: GPL-3.0-or-later

pragma solidity ^0.8.0;

import {ILiquidCrowdloan} from "./ILiquidCrowdloan.sol";

/// @title Liquid Crowdloan Predeploy Contract
/// @author Acala Developers
/// @notice You can use this predeploy contract to call liquid-croqwdloan pallet
/// @dev This contracts will interact with liquid-croqwdloan pallet
contract LiquidCrowdloan is ILiquidCrowdloan {
    /// @dev The LiquidCrowdloan precompile address.
    address private constant PRECOMPILE =
        address(0x000000000000000000000000000000000000040C);

    /// @inheritdoc ILiquidCrowdloan
    function redeem(uint256 amount) public override returns (uint256) {
        require(amount != 0, "LiquidCrowdloan: amount is zero");

        (bool success, bytes memory returnData) = PRECOMPILE.call(
            abi.encodeWithSignature(
                "redeem(address,uint256)",
                msg.sender,
                amount
            )
        );
        assembly {
            if eq(success, 0) {
                revert(add(returnData, 0x20), returndatasize())
            }
        }

        uint256 redeemAmount = abi.decode(returnData, (uint256));

        emit Redeemed(msg.sender, amount, redeemAmount);

        return redeemAmount;
    }

    /// @inheritdoc ILiquidCrowdloan
    function getRedeemCurrency() public view override returns (address) {
        (bool success, bytes memory returnData) = PRECOMPILE.staticcall(
            abi.encodeWithSignature("getRedeemCurrency()")
        );
        assembly {
            if eq(success, 0) {
                revert(add(returnData, 0x20), returndatasize())
            }
        }

        return abi.decode(returnData, (address));
    }
}
