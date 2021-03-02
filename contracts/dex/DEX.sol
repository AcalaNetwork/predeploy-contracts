pragma solidity ^0.6.0;

import "./IDEX.sol";
import "../utils/SystemContract.sol";
import "../token/IMultiCurrency.sol";

contract DEX is SystemContract, IDEX {
    /**
     * @dev Get liquidity of the currency_id_a and currency_id_b.
     * Returns (liquidity_a, liquidity_b)
     */
    function getLiquidity(address tokenA, address tokenB)
    public
    view
    override
    systemContract(tokenA)
    systemContract(tokenB)
    returns (uint256, uint256)
    {
        require(tokenA != address(0), "DEX: tokenA is zero address");
        require(tokenB != address(0), "DEX: tokenB is zero address");

        uint256 currencyIdA = IMultiCurrency(tokenA).currencyId();
        uint256 currencyIdB = IMultiCurrency(tokenB).currencyId();

        uint256[3] memory input;

        input[0] = 0;
        input[1] = currencyIdA;
        input[2] = currencyIdB;

        uint256[2] memory output;

        assembly {
            if iszero(
                staticcall(gas(), 0x0000000000000000405, input, 0x60, output, 0x40)
            ) {
                revert(0, 0)
            }
        }
        return (output[0], output[1]);
    }

    /**
     * @dev Swap with exact supply.
     * Returns (target_amount)
     */
    function swapWithExactSupply(address tokenA, address tokenB, uint256 supplyAmount, uint256 minTargetAmount)
    public
    view
    override
    systemContract(tokenA)
    systemContract(tokenB)
    returns (uint256) {
        require(tokenA != address(0), "DEX: tokenA is zero address");
        require(tokenB != address(0), "DEX: tokenB is zero address");
        require(supplyAmount != 0, "DEX: supplyAmount is zero");

        uint256 currencyIdA = IMultiCurrency(tokenA).currencyId();
        uint256 currencyIdB = IMultiCurrency(tokenB).currencyId();

        uint256[6] memory input;

        input[0] = 1;
        input[1] = uint256(msg.sender);
        input[2] = currencyIdA;
        input[3] = currencyIdB;
        input[4] = supplyAmount;
        input[5] = minTargetAmount;

        uint256[1] memory output;

        assembly {
            if iszero(
                staticcall(gas(), 0x0000000000000000405, input, 0xC0, output, 0x20)
            ) {
                revert(0, 0)
            }
        }
        return output[0];
    }
}
