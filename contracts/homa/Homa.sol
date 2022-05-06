// SPDX-License-Identifier: GPL-3.0-or-later

pragma solidity ^0.8.0;

import "./IHoma.sol";

contract Homa is IHoma {
    address constant private precompile = address(0x0000000000000000000000000000000000000406);

    /**
     * @dev Mint liquid staking currency using staking currency
     * Returns a boolean value indicating whether the operation succeeded.
     */
    function mint(uint256 mintAmount)
    public
    override
    returns (bool) {
        require(mintAmount != 0, "Homa: mintAmount is zero");

        (bool success, bytes memory returnData) = precompile.staticcall(abi.encodeWithSignature("mint(address,uint256)", msg.sender, mintAmount));
        assembly {
            if eq(success, 0) {
                revert(add(returnData, 0x20), returndatasize())
            }
        }

        emit Minted(msg.sender, mintAmount);
        return true;
    }

    /**
     * @dev Request to redeem liquid currency into staking currency
     * Returns a boolean value indicating whether the operation succeeded.
     */
    function requestRedeem(uint256 redeemAmount, bool fastMatch)
    public
    override
    returns (bool) {
        require(redeemAmount != 0, "Homa: redeemAmount is zero");

        (bool success, bytes memory returnData) = precompile.staticcall(abi.encodeWithSignature("requestRedeem(address,uint256,bool)", msg.sender, redeemAmount, fastMatch));
        assembly {
            if eq(success, 0) {
                revert(add(returnData, 0x20), returndatasize())
            }
        }

        emit RequestedRedeem(msg.sender, redeemAmount, fastMatch);
        return true;

    }

    /**
     * @dev Get exchange rate of liquid currency to staking currency (liquid : staking).
     * Returns (exchange_rate), value is FixedU128 with a range of [0.000000000000000000, 340282366920938463463.374607431768211455]
     */
    function getExchangeRate()
    public
    view
    override
    returns (uint256) {
        (bool success, bytes memory returnData) = precompile.staticcall(abi.encodeWithSignature("getExchangeRate()"));
        assembly {
            if eq(success, 0) {
                revert(add(returnData, 0x20), returndatasize())
            }
        }

        return abi.decode(returnData, (uint256));
    }

    /**
     * @dev Get estimated reward rate.
     * Returns (reward_rate), value is FixedU128 with a range of [0.000000000000000000, 340282366920938463463.374607431768211455]
     */
    function getEstimatedRewardRate()
    public
    view
    override
    returns (uint256) {
        (bool success, bytes memory returnData) = precompile.staticcall(abi.encodeWithSignature("getEstimatedRewardRate()"));
        assembly {
            if eq(success, 0) {
                revert(add(returnData, 0x20), returndatasize())
            }
        }

        return abi.decode(returnData, (uint256));
    }

    /**
     * @dev Get commission rate taken as a fee by homa protocol
     * Returns (commisssion_rate), value is FixedU128 with a range of [0.000000000000000000, 340282366920938463463.374607431768211455]
     */
    function getCommissionRate()
    public
    view
    override
    returns (uint256) {
        (bool success, bytes memory returnData) = precompile.staticcall(abi.encodeWithSignature("getCommissionRate()"));
        assembly {
            if eq(success, 0) {
                revert(add(returnData, 0x20), returndatasize())
            }
        }

        return abi.decode(returnData, (uint256));
    }

    /**
     * @dev Get fast match fee, this is charged when requestRedeem uses fast match
     * Returns (reward_rate), value is FixedU128 with a range of [0.000000000000000000, 340282366920938463463.374607431768211455]
     */
    function getFastMatchFee()
    public
    view
    override
    returns (uint256) {
        (bool success, bytes memory returnData) = precompile.staticcall(abi.encodeWithSignature("getFastMatchFee()"));
        assembly {
            if eq(success, 0) {
                revert(add(returnData, 0x20), returndatasize())
            }
        }

        return abi.decode(returnData, (uint256));
    }
}
