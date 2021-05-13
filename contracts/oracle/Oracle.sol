pragma solidity ^0.6.0;

import "./IOracle.sol";

contract Oracle is IOracle {
    /**
     * @dev Get the price of the currency_id.
     * Returns the (price, timestamp)
     */
    function getPrice(address token)
    public
    view
    override
    returns (uint256)
    {
        require(token != address(0), "Oracle: token is zero address");

        bytes memory input = abi.encodeWithSignature("getPrice(address)", token);

        // Dynamic arrays will add the array size to the front of the array, so need extra 32 bytes.
        uint input_size = input.length + 32;

        uint256[1] memory output;

        assembly {
            if iszero(
                staticcall(gas(), 0x0000000000000000403, input, input_size, output, 0x20)
            ) {
                revert(0, 0)
            }
        }
        return output[0];
    }
}
