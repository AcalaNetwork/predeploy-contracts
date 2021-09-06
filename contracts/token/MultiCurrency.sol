// SPDX-License-Identifier: Apache-2.0
pragma solidity ^0.6.0;

import "../utils/Uint256Lib.sol";

library MultiCurrency {
    function name() internal view returns (string memory) {
        bytes memory input = abi.encodeWithSignature("name()");

        // Dynamic arrays will add the array size to the front of the array, so need extra 32 bytes.
        uint input_size = input.length + 32;

        // Acala mirrored token symbol should not more than 32 bytes. More than 32 bytes will be truncated.
        uint256[3] memory output;

        assembly {
            if iszero(
                staticcall(gas(), 0x0000000000000000400, input, input_size, output, 0x60)
            ) {
                revert(0, 0)
            }
        }

        bytes memory result = abi.encodePacked(output);
        (string memory name) = abi.decode(result, (string));

        return name;
    }

    function symbol() internal view returns (string memory) {
        bytes memory input = abi.encodeWithSignature("symbol()");

        // Dynamic arrays will add the array size to the front of the array, so need extra 32 bytes.
        uint input_size = input.length + 32;

        // Acala mirrored token symbol should not more than 32 bytes. More than 32 bytes will be truncated.
        uint256[3] memory output;

        assembly {
            if iszero(
                staticcall(gas(), 0x0000000000000000400, input, input_size, output, 0x60)
            ) {
                revert(0, 0)
            }
        }

        bytes memory result = abi.encodePacked(output);
        (string memory symbol) = abi.decode(result, (string));

        return symbol;
    }

    function decimals() internal view returns (uint8) {
        bytes memory input = abi.encodeWithSignature("decimals()");

        // Dynamic arrays will add the array size to the front of the array, so need extra 32 bytes.
        uint input_size = input.length + 32;

        uint256[1] memory output;

        assembly {
            if iszero(
                staticcall(gas(), 0x0000000000000000400, input, input_size, output, 0x20)
            ) {
                revert(0, 0)
            }
        }

        return uint8(output[0]);
    }

    function totalSupply() internal view returns (uint256) {
        bytes memory input = abi.encodeWithSignature("totalSupply()");

        // Dynamic arrays will add the array size to the front of the array, so need extra 32 bytes.
        uint input_size = input.length + 32;

        uint256[1] memory output;

        assembly {
            if iszero(
                staticcall(gas(), 0x0000000000000000400, input, input_size, output, 0x20)
            ) {
                revert(0, 0)
            }
        }

        return output[0];
    }

    function balanceOf(address account) internal view returns (uint256) {
        bytes memory input = abi.encodeWithSignature("balanceOf(address)", account);

        // Dynamic arrays will add the array size to the front of the array, so need extra 32 bytes.
        uint input_size = input.length + 32;

        uint256[1] memory output;

        assembly {
            if iszero(
                staticcall(gas(), 0x0000000000000000400, input, input_size, output, 0x20)
            ) {
                revert(0, 0)
            }
        }

        return output[0];
    }

    function transfer(address sender, address recipient, uint256 amount) internal view {
        bytes memory input = abi.encodeWithSignature("transfer(address,address,uint256)", sender, recipient, amount);

        // Dynamic arrays will add the array size to the front of the array, so need extra 32 bytes.
        uint input_size = input.length + 32;

        assembly {
            if iszero(
                staticcall(gas(), 0x0000000000000000400, input, input_size, 0x00, 0x00)
            ) {
                revert(0, 0)
            }
        }
    }
}
