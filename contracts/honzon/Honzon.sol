// SPDX-License-Identifier: GPL-3.0-or-later

pragma solidity ^0.8.0;

import "./IHonzon.sol";

/// @title Honzon Predeploy Contract
/// @author Acala Developers
/// @notice You can use this predeploy contract to call honzon pallet
/// @dev This contracts will interact with honzon pallet
contract Honzon is IHonzon {
    /// @dev The Honzon precompile address.
    address constant private PRECOMPILE = address(0x0000000000000000000000000000000000000409);

    /// @inheritdoc IHonzon
    function adjustLoan(address currencyId, int128 collateralAdjustment, int128 debitAdjustment)
    public
    override
    returns (bool) {
        require(collateralAdjustment != 0 || debitAdjustment != 0, "Honzon: adjustment amounts are zero");

        (bool success, bytes memory returnData) = PRECOMPILE.call(
            abi.encodeWithSignature(
                "adjustLoan(address,address,int128,int128)",
                msg.sender, currencyId, collateralAdjustment, debitAdjustment
            )
        );
        assembly {
            if eq(success, 0) {
                revert(add(returnData, 0x20), returndatasize())
            }
        }

        emit AdjustedLoan(msg.sender, currencyId, collateralAdjustment, debitAdjustment);
        return true;
    }

    /// @inheritdoc IHonzon
    function closeLoanByDex(address currencyId, uint256 maxCollateralAmount)
    public
    override
    returns (bool) {
        (bool success, bytes memory returnData) = PRECOMPILE.call(
            abi.encodeWithSignature(
                "closeLoanByDex(address,address,uint256)",
                msg.sender, currencyId, maxCollateralAmount
            )
        );
        assembly {
            if eq(success, 0) {
                revert(add(returnData, 0x20), returndatasize())
            }
        }

        emit ClosedLoanByDex(msg.sender, currencyId);
        return true;
    }

    /// @inheritdoc IHonzon
    function getPosition(address who, address currencyId)
    public
    view
    override
    returns (uint256, uint256) {
        (bool success, bytes memory returnData) = PRECOMPILE.staticcall(
            abi.encodeWithSignature("getPosition(address,address)", who, currencyId)
        );
        assembly {
            if eq(success, 0) {
                revert(add(returnData, 0x20), returndatasize())
            }
        }

        return abi.decode(returnData, (uint256, uint256));
    }

    /// @inheritdoc IHonzon
    function getCollateralParameters(address currencyId)
    public
    view
    override
    returns (uint256[] memory) {
        (bool success, bytes memory returnData) = PRECOMPILE.staticcall(
            abi.encodeWithSignature("getCollateralParameters(address)", currencyId)
        );
        assembly {
            if eq(success, 0) {
                revert(add(returnData, 0x20), returndatasize())
            }
        }

        return abi.decode(returnData, (uint256[]));
    }

    /// @inheritdoc IHonzon
    function getCurrentCollateralRatio(address who, address currencyId)
    public
    view
    override
    returns (uint256) {
        (bool success, bytes memory returnData) = PRECOMPILE.staticcall(
            abi.encodeWithSignature("getCurrentCollateralRatio(address,address)", who, currencyId)
        );
        assembly {
            if eq(success, 0) {
                revert(add(returnData, 0x20), returndatasize())
            }
        }

        return abi.decode(returnData, (uint256));
    }

    /// @inheritdoc IHonzon
    function getDebitExchangeRate(address currencyId)
    public
    view
    override
    returns (uint256) {
        (bool success, bytes memory returnData) = PRECOMPILE.staticcall(
            abi.encodeWithSignature("getDebitExchangeRate(address)", currencyId)
        );
        assembly {
            if eq(success, 0) {
                revert(add(returnData, 0x20), returndatasize())
            }
        }

        return abi.decode(returnData, (uint256));
    }
}
