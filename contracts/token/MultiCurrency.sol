// SPDX-License-Identifier: Apache-2.0
pragma solidity ^0.6.0;

import "../utils/Uint256Lib.sol";

library MultiCurrency {
    function currencyId() internal view returns (uint256) {
        uint256[1] memory input;

        input[0] = 0;

        uint256[1] memory output;

        assembly {
            if iszero(
                staticcall(gas(), 0x0000000000000000400, input, 0x20, output, 0x20)
            ) {
                revert(0, 0)
            }
        }

        return output[0];
    }

    function name() internal view returns (string memory) {
        uint256[1] memory input;

        input[0] = 1;

        // Acala mirrored token symbol should not more than 32 bytes. More than 32 bytes will be truncated.
        uint256[1] memory output;

        assembly {
            if iszero(
                staticcall(gas(), 0x0000000000000000400, input, 0x20, output, 0x20)
            ) {
                revert(0, 0)
            }
        }

        return Uint256Lib.Uint2String(output[0]);
    }

    function symbol() internal view returns (string memory) {
        uint256[1] memory input;

        input[0] = 2;

        // Acala mirrored token symbol should not more than 32 bytes. More than 32 bytes will be truncated.
        uint256[1] memory output;

        assembly {
            if iszero(
                staticcall(gas(), 0x0000000000000000400, input, 0x20, output, 0x20)
            ) {
                revert(0, 0)
            }
        }

        return Uint256Lib.Uint2String(output[0]);
    }

    function decimals() internal view returns (uint8) {
        uint256[1] memory input;

        input[0] = 3;

        uint256[1] memory output;

        assembly {
            if iszero(
                staticcall(gas(), 0x0000000000000000400, input, 0x20, output, 0x20)
            ) {
                revert(0, 0)
            }
        }

        return uint8(output[0]);
    }

    function totalSupply() internal view returns (uint256) {
        uint256[1] memory input;

        input[0] = 4;

        uint256[1] memory output;

        assembly {
            if iszero(
                staticcall(gas(), 0x0000000000000000400, input, 0x20, output, 0x20)
            ) {
                revert(0, 0)
            }
        }

        return output[0];
    }

    function balanceOf(address account) internal view returns (uint256) {
        uint256[2] memory input;

        input[0] = 5;
        input[1] = uint256(account);

        uint256[1] memory output;

        assembly {
            if iszero(
                staticcall(gas(), 0x0000000000000000400, input, 0x40, output, 0x20)
            ) {
                revert(0, 0)
            }
        }

        return output[0];
    }

    function transfer(address sender, address recipient, uint256 amount) internal view {
        uint256[4] memory input;

        input[0] = 6;
        input[1] = uint256(sender);
        input[2] = uint256(recipient);
        input[3] = amount;

        assembly {
            if iszero(
                staticcall(gas(), 0x0000000000000000400, input, 0x80, 0x00, 0x00)
            ) {
                revert(0, 0)
            }
        }
    }
}
