// SPDX-License-Identifier: GPL-3.0-or-later

pragma solidity ^0.8.0;

import {IDEX} from "./IDEX.sol";

/// @title IDEX Predeploy Contract
/// @author Acala Developers
/// @notice You can use this predeploy contract to call dex pallet
/// @dev This contracts will interact with dex pallet
contract DEX is IDEX {
    /// @dev The DEX precompile address.
    address internal constant PRECOMPILE =
        address(0x0000000000000000000000000000000000000405);

    /// @inheritdoc IDEX
    function getLiquidityPool(
        address tokenA,
        address tokenB
    ) public view override returns (uint256, uint256) {
        require(tokenA != address(0), "DEX: tokenA is zero address");
        require(tokenB != address(0), "DEX: tokenB is zero address");

        (bool success, bytes memory returnData) = PRECOMPILE.staticcall(
            abi.encodeWithSignature(
                "getLiquidityPool(address,address)",
                tokenA,
                tokenB
            )
        );
        assembly {
            if eq(success, 0) {
                revert(add(returnData, 0x20), returndatasize())
            }
        }

        return abi.decode(returnData, (uint256, uint256));
    }

    /// @inheritdoc IDEX
    function getLiquidityTokenAddress(
        address tokenA,
        address tokenB
    ) public view override returns (address) {
        require(tokenA != address(0), "DEX: tokenA is zero address");
        require(tokenB != address(0), "DEX: tokenB is zero address");

        (bool success, bytes memory returnData) = PRECOMPILE.staticcall(
            abi.encodeWithSignature(
                "getLiquidityTokenAddress(address,address)",
                tokenA,
                tokenB
            )
        );
        assembly {
            if eq(success, 0) {
                revert(add(returnData, 0x20), returndatasize())
            }
        }

        return abi.decode(returnData, (address));
    }

    /// @inheritdoc IDEX
    function getSwapTargetAmount(
        address[] memory path,
        uint256 supplyAmount
    ) public view override returns (uint256) {
        for (uint256 i = 0; i < path.length; i++) {
            require(path[i] != address(0), "DEX: token is zero address");
        }
        require(supplyAmount != 0, "DEX: supplyAmount is zero");

        (bool success, bytes memory returnData) = PRECOMPILE.staticcall(
            abi.encodeWithSignature(
                "getSwapTargetAmount(address[],uint256)",
                path,
                supplyAmount
            )
        );
        assembly {
            if eq(success, 0) {
                revert(add(returnData, 0x20), returndatasize())
            }
        }

        return abi.decode(returnData, (uint256));
    }

    /// @inheritdoc IDEX
    function getSwapSupplyAmount(
        address[] memory path,
        uint256 targetAmount
    ) public view override returns (uint256) {
        for (uint256 i = 0; i < path.length; i++) {
            require(path[i] != address(0), "DEX: token is zero address");
        }
        require(targetAmount != 0, "DEX: targetAmount is zero");

        (bool success, bytes memory returnData) = PRECOMPILE.staticcall(
            abi.encodeWithSignature(
                "getSwapSupplyAmount(address[],uint256)",
                path,
                targetAmount
            )
        );
        assembly {
            if eq(success, 0) {
                revert(add(returnData, 0x20), returndatasize())
            }
        }

        return abi.decode(returnData, (uint256));
    }

    /// @inheritdoc IDEX
    function swapWithExactSupply(
        address[] memory path,
        uint256 supplyAmount,
        uint256 minTargetAmount
    ) public override returns (bool) {
        for (uint256 i = 0; i < path.length; i++) {
            require(path[i] != address(0), "DEX: token is zero address");
        }
        require(supplyAmount != 0, "DEX: supplyAmount is zero");

        (bool success, bytes memory returnData) = PRECOMPILE.call(
            abi.encodeWithSignature(
                "swapWithExactSupply(address,address[],uint256,uint256)",
                msg.sender,
                path,
                supplyAmount,
                minTargetAmount
            )
        );
        assembly {
            if eq(success, 0) {
                revert(add(returnData, 0x20), returndatasize())
            }
        }

        emit Swaped(
            msg.sender,
            path,
            supplyAmount,
            abi.decode(returnData, (uint256))
        );
        return true;
    }

    /// @inheritdoc IDEX
    function swapWithExactTarget(
        address[] memory path,
        uint256 targetAmount,
        uint256 maxSupplyAmount
    ) public override returns (bool) {
        for (uint256 i = 0; i < path.length; i++) {
            require(path[i] != address(0), "DEX: token is zero address");
        }
        require(targetAmount != 0, "DEX: targetAmount is zero");

        (bool success, bytes memory returnData) = PRECOMPILE.call(
            abi.encodeWithSignature(
                "swapWithExactTarget(address,address[],uint256,uint256)",
                msg.sender,
                path,
                targetAmount,
                maxSupplyAmount
            )
        );
        assembly {
            if eq(success, 0) {
                revert(add(returnData, 0x20), returndatasize())
            }
        }

        emit Swaped(
            msg.sender,
            path,
            abi.decode(returnData, (uint256)),
            targetAmount
        );
        return true;
    }

    /// @inheritdoc IDEX
    function addLiquidity(
        address tokenA,
        address tokenB,
        uint256 maxAmountA,
        uint256 maxAmountB,
        uint256 minShareIncrement
    ) public override returns (bool) {
        require(tokenA != address(0), "DEX: tokenA is zero address");
        require(tokenB != address(0), "DEX: tokenB is zero address");
        require(maxAmountA != 0, "DEX: maxAmountA is zero");
        require(maxAmountB != 0, "DEX: maxAmountB is zero");

        (bool success, bytes memory returnData) = PRECOMPILE.call(
            abi.encodeWithSignature(
                "addLiquidity(address,address,address,uint256,uint256,uint256)",
                msg.sender,
                tokenA,
                tokenB,
                maxAmountA,
                maxAmountB,
                minShareIncrement
            )
        );
        assembly {
            if eq(success, 0) {
                revert(add(returnData, 0x20), returndatasize())
            }
        }

        emit AddedLiquidity(msg.sender, tokenA, tokenB, maxAmountA, maxAmountB);
        return true;
    }

    /// @inheritdoc IDEX
    function removeLiquidity(
        address tokenA,
        address tokenB,
        uint256 removeShare,
        uint256 minWithdrawnA,
        uint256 minWithdrawnB
    ) public override returns (bool) {
        require(tokenA != address(0), "DEX: tokenA is zero address");
        require(tokenB != address(0), "DEX: tokenB is zero address");
        require(removeShare != 0, "DEX: removeShare is zero");

        (bool success, bytes memory returnData) = PRECOMPILE.call(
            abi.encodeWithSignature(
                "removeLiquidity(address,address,address,uint256,uint256,uint256)",
                msg.sender,
                tokenA,
                tokenB,
                removeShare,
                minWithdrawnA,
                minWithdrawnB
            )
        );
        assembly {
            if eq(success, 0) {
                revert(add(returnData, 0x20), returndatasize())
            }
        }

        emit RemovedLiquidity(msg.sender, tokenA, tokenB, removeShare);
        return true;
    }
}
