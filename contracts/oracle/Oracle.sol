// SPDX-License-Identifier: GPL-3.0-or-later

pragma solidity ^0.8.0;

import "./IOracle.sol";

/// @title Oracle Predeploy Contract Interface
/// @author Acala Developers
/// @notice You can use this predeploy contract to call oracle pallet
/// @dev The interface through which solidity contracts will interact with oracle pallet
contract Oracle is IOracle {
    /// @dev The Oracle precompile address.
    address constant private PRECOMPILE = address(0x0000000000000000000000000000000000000403);

    /// @inheritdoc IOracle
    function getPrice(address token)
    public
    view
    override
    returns (uint256)
    {
        require(token != address(0), "Oracle: token is zero address");

        (bool success, bytes memory returnData) = PRECOMPILE.staticcall(
            abi.encodeWithSignature("getPrice(address)", token)
        );
        assembly {
            if eq(success, 0) {
                revert(add(returnData, 0x20), returndatasize())
            }
        }

        return abi.decode(returnData, (uint256));
    }
}
