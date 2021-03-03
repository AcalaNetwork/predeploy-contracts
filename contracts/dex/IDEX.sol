pragma solidity ^0.6.0;

interface IDEX {
    // Get liquidity of the currency_id_a and currency_id_b.
    // Returns (liquidity_a, liquidity_b)
    function getLiquidity(address tokenA, address tokenB) external view returns (uint256, uint256);

    // Swap with exact supply.
    // Returns (target_amount)
    function swapWithExactSupply(address tokenA, address tokenB, uint256 supplyAmount, uint256 minTargetAmount) external view returns (uint256);
}
