pragma solidity ^0.5.0;

contract Oracle {
    function getPrice(uint256 currencyId) public view returns (uint256, uint256)
    {
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
