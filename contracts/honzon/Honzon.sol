// SPDX-License-Identifier: GPL-3.0-or-later

pragma solidity ^0.8.0;

import "./IHonzon.sol";

contract Honzon is IHonzon {
    address constant private precompile = address(0x0000000000000000000000000000000000000409);

    /**
     * @dev Adjust CDP position
     * Returns a boolean value indicating whether the operation succeeded.
     */
    function adjustLoan(address currencyId, int256 collateralAdjustment, int256 debitAdjustment)
    public
    override
    returns (bool) {
        require(collateralAdjustment != 0 && debitAdjustment != 0, "Honzon: adjustment amounts are zero");

        (bool success, bytes memory returnData) = precompile.staticcall(abi.encodeWithSignature("adjustLoan(address,address,int256,int256)", msg.sender, currencyId, collateralAdjustment, debitAdjustment));
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
        (bool success, bytes memory returnData) = precompile.staticcall(abi.encodeWithSignature("closeLoanByDex(address,address,uint256)", msg.sender, currencyId, maxCollateralAmount));
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
        (bool success, bytes memory returnData) = precompile.staticcall(abi.encodeWithSignature("getPosition(address,address)", who, currencyId));
        assembly {
            if eq(success, 0) {
                revert(add(returnData, 0x20), returndatasize())
            }
        }

        return abi.decode(returnData, (uint256, uint256));
    }

    /**
     * @dev Get liquidation ratio for a currency
     * Returns (liquidation_ratio), value is FixedU128 with a range of [0.000000000000000000, 340282366920938463463.374607431768211455]
     */
    function getLiquidationRatio(address currencyId)
    public
    view
    override
    returns (uint256) {
        (bool success, bytes memory returnData) = precompile.staticcall(abi.encodeWithSignature("getLiquidationRatio(address)", currencyId));
        assembly {
            if eq(success, 0) {
                revert(add(returnData, 0x20), returndatasize())
            }
        }

        return abi.decode(returnData, (uint256));
    }

    /**
     * @dev Get collateral ratio for an open CDP position
     * Returns (collateral_ratio), value is FixedU128 with a range of [0.000000000000000000, 340282366920938463463.374607431768211455]
     */
    function getCurrentCollateralRatio(address who, address currencyId)
    public
    view
    override
    returns (uint256) {
        (bool success, bytes memory returnData) = precompile.staticcall(abi.encodeWithSignature("getCurrentCollateralRatio(address,address)", who, currencyId));
        assembly {
            if eq(success, 0) {
                revert(add(returnData, 0x20), returndatasize())
            }
        }

        return abi.decode(returnData, (uint256));
    }
}
