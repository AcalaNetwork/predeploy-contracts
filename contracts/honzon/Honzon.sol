// SPDX-License-Identifier: GPL-3.0-or-later

pragma solidity ^0.7.0;

import "./IHonzon.sol";

contract Honzon is IHonzon {
    address constant private PRECOMPILE = address(0x0000000000000000000000000000000000000409);

    /**
     * @dev Adjust CDP position
     * Returns a boolean value indicating whether the operation succeeded.
     */
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

    /**
     * @dev Close CDP position using DEX
     * Returns a boolean value indicating whether the operation succeeded.
     */
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

    /**
     * @dev Get open CDP position
     * Returns (collateral_amount, debit_amount)
     */
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

    /**
     * @dev Get collateral parameters for a currency
     * @param currencyId collateral currencyId, will return 0 for all entries if currencyId isn't valid collateral
     * @return (params) which is an array of uint256 with 5 entries in the order that follows:
     *
     * - [0] `maximum_total_debit_value`: Hardcap of total debit value generated from this collateral.
     * - [1] `interest_rate_per_sec`: A FixedU128 representing a decimal value. Interest rate of CDP loan per second
     * - [2] `liquidation_ratio`: A FixedU128 representing a decimal value. Liquidation ratio for this collateral type
     * - [3] `liquidation_penalty`: A FixedU128 representing a decimal value. Penalty added on for getting liquidated
     * - [4] `required_collateral_ratio`: A FixedU128 representing a decimal value. Cannot adjust
     * the position of CDP so that the current collateral ratio is lower than the required collateral ratio.
     */
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

    /**
     * @dev Get collateral ratio for an open CDP position
     * Returns (collateral_ratio), value is FixedU128 with
     * a range of [0.000000000000000000, 340282366920938463463.374607431768211455]
     */
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

    /**
     * @dev Get Exchange rate of debit units to debit value (AUSD)
     * Returns (exchange_rate), value is FixedU128 with
     * a range of [0.000000000000000000, 340282366920938463463.374607431768211455]
     */
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
