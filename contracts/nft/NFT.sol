// SPDX-License-Identifier: GPL-3.0-or-later

pragma solidity ^0.7.0;

library NFT {
    address constant private PRECOMPILE = address(0x0000000000000000000000000000000000000401);

    function balanceOf(address account) public view returns (uint256) {
        (bool success, bytes memory returnData) = PRECOMPILE.staticcall(
            abi.encodeWithSignature("balanceOf(address)", account)
        );
        assembly {
            if eq(success, 0) {
                revert(add(returnData, 0x20), returndatasize())
            }
        }

        return abi.decode(returnData, (uint256));
    }

    function ownerOf(uint256 classId, uint256 tokenId)
        public
        view
        returns (address)
    {
        (bool success, bytes memory returnData) = PRECOMPILE.staticcall(
            abi.encodeWithSignature("ownerOf(uint256,uint256)", classId, tokenId)
        );
        assembly {
            if eq(success, 0) {
                revert(add(returnData, 0x20), returndatasize())
            }
        }

        return abi.decode(returnData, (address));
    }

    function transfer(
        address to,
        uint256 classId,
        uint256 tokenId
    ) public {
        (bool success, bytes memory returnData) = PRECOMPILE.call(
            abi.encodeWithSignature("transfer(address,address,uint256,uint256)", msg.sender, to, classId, tokenId)
        );
        assembly {
            if eq(success, 0) {
                revert(add(returnData, 0x20), returndatasize())
            }
        }
    }
}
