// SPDX-License-Identifier: GPL-3.0-or-later

pragma solidity ^0.6.0;

library NFT {
    address constant private precompile = address(0x0000000000000000000000000000000000000401);

    function balanceOf(address account) public view returns (uint256) {
        (bool success, bytes memory returnData) = precompile.staticcall(abi.encodeWithSignature("balanceOf(address)", account));
        assembly {
            if eq(success, 0) {
                revert(add(returnData, 0x20), returndatasize())
            }
        }

        return abi.decode(returnData, (uint256));
    }

    function ownerOf(uint256 class_id, uint256 token_id)
        public
        view
        returns (address)
    {
        (bool success, bytes memory returnData) = precompile.staticcall(abi.encodeWithSignature("ownerOf(uint256,uint256)", class_id, token_id));
        assembly {
            if eq(success, 0) {
                revert(add(returnData, 0x20), returndatasize())
            }
        }

        return abi.decode(returnData, (address));
    }

    function transfer(
        address to,
        uint256 class_id,
        uint256 token_id
    ) public {
        (bool success, bytes memory returnData) = precompile.call(abi.encodeWithSignature("transfer(address,address,uint256,uint256)", msg.sender, to, class_id, token_id));
        assembly {
            if eq(success, 0) {
                revert(add(returnData, 0x20), returndatasize())
            }
        }
    }
}
