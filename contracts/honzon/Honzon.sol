// SPDX-License-Identifier: GPL-3.0-or-later

pragma solidity ^0.8.0;

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
     * Returns (params), which is an array of 5 parameters for a collateral type
     * see IHonzon.sol for documentation of each value
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
