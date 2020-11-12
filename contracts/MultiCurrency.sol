// SPDX-License-Identifier: Apache-2.0
pragma solidity ^0.5.0;

//TODO: replace the precompile address.

library MultiCurrency {
    function totalSupply(uint256 currencyId) internal view returns (uint256) {
        uint256[1] memory input;

        uint256 x = 0 << 32;
        x += currencyId;

        input[0] = x << 216;

        uint256[1] memory output;

        assembly {
            if iszero(
                staticcall(gas, 0x0000000000000000400, input, 0x20, output, 0x20)
            ) {
                revert(0, 0)
            }
        }

        return output[0];
    }

    function balanceOf(uint256 currencyId, address account) internal view returns (uint256) {
        uint256[2] memory input;

        uint256 x = 1 << 32;
        x += currencyId;

        input[0] = x << 216;
        input[1] = uint256(account) << 96;

        uint256[1] memory output;

        assembly {
            if iszero(
                staticcall(gas, 0x0000000000000000400, input, 0x40, output, 0x20)
            ) {
                revert(0, 0)
            }
        }

        return output[0];
    }

    function transfer(uint256 currencyId, address sender, address recipient, uint256 amount) internal view {
        uint256[4] memory input;

        uint256 x = 2 << 32;
        x += currencyId;

        input[0] = x << 216;
        input[1] = uint256(sender) << 96;
        input[2] = uint256(recipient) << 96;
        input[3] = amount << 128;

        assembly {
            if iszero(
                staticcall(gas, 0x0000000000000000400, input, 0x80, 0x00, 0x00)
            ) {
                revert(0, 0)
            }
        }
    }
}
