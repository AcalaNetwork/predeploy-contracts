pragma solidity ^0.5.0;

import "../utils/SystemContract.sol";
import "../token/IMultiCurrency.sol";

contract Oracle is SystemContract {
    /**
     * @dev Get the price of the currency_id.
     * Returns the (price, timestamp)
     */
    function getPrice(address token)
    public
    view
    systemContract(token)
    returns (uint256, uint256)
    {
        require(token != address(0), "Oracle: token is zero address");

        uint256 currencyId = IMultiCurrency(token).currencyId();

        uint256[2] memory input;

        input[0] = 0;
        input[1] = currencyId;

        uint256[2] memory output;

        assembly {
            if iszero(
                staticcall(gas, 0x0000000000000000403, input, 0x40, output, 0x40)
            ) {
                revert(0, 0)
            }
        }
        return (output[0], output[1]);
    }
}
