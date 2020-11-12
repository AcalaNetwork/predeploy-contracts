pragma solidity ^0.5.0;

library P {
    function balanceOf(address addr) public view returns (uint256) {
        uint256[2] memory input;

        input[0] = 0;
        input[1] = uint256(addr) << 96;

        uint256[1] memory output;

        assembly {
            if iszero(
                staticcall(gas, 0x0000000000000000401, input, 0x40, output, 0x20)
            ) {
                revert(0, 0)
            }
        }
        return output[0];
    }

    function ownerOf(uint256 class_id, uint256 token_id)
        public
        view
        returns (address)
    {
        uint256[3] memory input;

        input[0] = 1 << 248;
        input[1] = class_id << 192;
        input[2] = token_id << 192;

        uint256[1] memory output;

        assembly {
            if iszero(
                staticcall(gas, 0x0000000000000000401, input, 0x60, output, 0x20)
            ) {
                revert(0, 0)
            }
        }
        return address(output[0]);
    }

    function transfer(
        address from,
        address to,
        uint256 class_id,
        uint256 token_id
    ) public view {
        uint256[5] memory input;

        input[0] = 2 << 248;
        input[1] = uint256(from) << 96;
        input[2] = uint256(to) << 96;
        input[3] = class_id << 192;
        input[4] = token_id << 192;

        assembly {
            if iszero(
                staticcall(gas, 0x0000000000000000401, input, 0xA0, 0x00, 0x00)
            ) {
                revert(0, 0)
            }
        }
    }
}
