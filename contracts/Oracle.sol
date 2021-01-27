pragma solidity ^0.5.0;

import "./MultiCurrency.sol";

contract Oracle {
    function getPrice(address token) public view returns (uint256, uint256)
    {
        // token should be a system contract starting with 12 zero bytes
        bytes memory tokenBytes = abi.encodePacked(token);
        for (uint i = 0; i < 12; i++)  {
            require(tokenBytes[i] == 0, "Oracle: Not a system contract");
        }

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
