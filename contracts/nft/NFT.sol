pragma solidity ^0.6.0;

library NFT {
    function balanceOf(address account) public view returns (uint256) {
        bytes memory input = abi.encodeWithSignature("balanceOf(address)", account);

        // Dynamic arrays will add the array size to the front of the array, so need extra 32 bytes.
        uint input_size = input.length + 32;

        uint256[1] memory output;

        assembly {
            if iszero(
                staticcall(gas(), 0x0000000000000000401, input, input_size, output, 0x20)
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
        bytes memory input = abi.encodeWithSignature("ownerOf(uint256,uint256)", class_id, token_id);

        // Dynamic arrays will add the array size to the front of the array, so need extra 32 bytes.
        uint input_size = input.length + 32;

        uint256[1] memory output;

        assembly {
            if iszero(
                staticcall(gas(), 0x0000000000000000401, input, input_size, output, 0x20)
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
        bytes memory input = abi.encodeWithSignature("transfer(address,address,uint256,uint256)", from, to, class_id, token_id);

        // Dynamic arrays will add the array size to the front of the array, so need extra 32 bytes.
        uint input_size = input.length + 32;

        assembly {
            if iszero(
                staticcall(gas(), 0x0000000000000000401, input, 0xA0, 0x00, 0x00)
            ) {
                revert(0, 0)
            }
        }
    }
}
