pragma solidity ^0.6.0;

interface IOracle {
    // Get the price of the currency_id.
    // Returns the (price, timestamp)
    function getPrice(address token) external view returns (uint256, uint256);
}
