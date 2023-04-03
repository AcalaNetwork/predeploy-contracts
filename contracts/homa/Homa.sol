// SPDX-License-Identifier: GPL-3.0-or-later

pragma solidity ^0.8.0;

import {IHoma} from "./IHoma.sol";

/// @title Homa Predeploy Contract
/// @author Acala Developers
/// @notice You can use this predeploy contract to call homa pallet
/// @dev This contracts will interact with homa pallet
contract Homa is IHoma {
    /// @dev The Homa precompile address.
    address private constant PRECOMPILE =
        address(0x0000000000000000000000000000000000000407);

    /// @inheritdoc IHoma
    function mint(uint256 mintAmount) public override returns (bool) {
        require(mintAmount != 0, "Homa: mintAmount is zero");

        (bool success, bytes memory returnData) = PRECOMPILE.call(
            abi.encodeWithSignature(
                "mint(address,uint256)",
                msg.sender,
                mintAmount
            )
        );
        assembly {
            if eq(success, 0) {
                revert(add(returnData, 0x20), returndatasize())
            }
        }

        emit Minted(msg.sender, mintAmount);
        return true;
    }

    /// @inheritdoc IHoma
    function requestRedeem(
        uint256 redeemAmount,
        bool fastMatch
    ) public override returns (bool) {
        require(redeemAmount != 0, "Homa: redeemAmount is zero");

        (bool success, bytes memory returnData) = PRECOMPILE.call(
            abi.encodeWithSignature(
                "requestRedeem(address,uint256,bool)",
                msg.sender,
                redeemAmount,
                fastMatch
            )
        );
        assembly {
            if eq(success, 0) {
                revert(add(returnData, 0x20), returndatasize())
            }
        }

        emit RequestedRedeem(msg.sender, redeemAmount, fastMatch);
        return true;
    }

    /// @inheritdoc IHoma
    function getExchangeRate() public view override returns (uint256) {
        (bool success, bytes memory returnData) = PRECOMPILE.staticcall(
            abi.encodeWithSignature("getExchangeRate()")
        );
        assembly {
            if eq(success, 0) {
                revert(add(returnData, 0x20), returndatasize())
            }
        }

        return abi.decode(returnData, (uint256));
    }

    /// @inheritdoc IHoma
    function getEstimatedRewardRate() public view override returns (uint256) {
        (bool success, bytes memory returnData) = PRECOMPILE.staticcall(
            abi.encodeWithSignature("getEstimatedRewardRate()")
        );
        assembly {
            if eq(success, 0) {
                revert(add(returnData, 0x20), returndatasize())
            }
        }

        return abi.decode(returnData, (uint256));
    }

    /// @inheritdoc IHoma
    function getCommissionRate() public view override returns (uint256) {
        (bool success, bytes memory returnData) = PRECOMPILE.staticcall(
            abi.encodeWithSignature("getCommissionRate()")
        );
        assembly {
            if eq(success, 0) {
                revert(add(returnData, 0x20), returndatasize())
            }
        }

        return abi.decode(returnData, (uint256));
    }

    /// @inheritdoc IHoma
    function getFastMatchFee() public view override returns (uint256) {
        (bool success, bytes memory returnData) = PRECOMPILE.staticcall(
            abi.encodeWithSignature("getFastMatchFee()")
        );
        assembly {
            if eq(success, 0) {
                revert(add(returnData, 0x20), returndatasize())
            }
        }

        return abi.decode(returnData, (uint256));
    }
}
