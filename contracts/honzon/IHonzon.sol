// SPDX-License-Identifier: GPL-3.0-or-later

pragma solidity ^0.8.0;

interface IHonzon {
    event AdjustedLoan(address indexed sender, address indexed currencyId, int256 collateralAdjustment, int256 debitAdjustment);
    event ClosedLoanByDex(address indexed sender, address indexed currencyId);

    function adjustLoan(address currencyId, int256 collateralAdjustment, int256 debitAdjustment) external returns (bool);

    function closeLoanByDex(address currencyId, uint256 maxCollateralAmount) external returns (bool);

    function getPosition(address who, address currencyId) external view returns (uint256, uint256);

    function getLiquidationRatio(address currencyId) external view returns (uint256);

    function getCurrentCollateralRatio(address who, address currencyId) external view returns (uint256);
}
