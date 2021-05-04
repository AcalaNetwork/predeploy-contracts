pragma solidity ^0.6.0;

import "./IDEX.sol";
import "../utils/SystemContract.sol";

contract DEX is SystemContract, IDEX {
    /**
     * @dev Get liquidity pool of the currency_id_a and currency_id_b.
     * Returns (liquidity_a, liquidity_b)
     */
    function getLiquidityPool(address tokenA, address tokenB)
    public
    view
    override
    returns (uint256, uint256)
    {
        require(tokenA != address(0), "DEX: tokenA is zero address");
        require(tokenB != address(0), "DEX: tokenB is zero address");

        uint input_size = 3;
        uint256[] memory input = new uint256[](input_size);

        input[0] = 0;
        input[1] = uint256(tokenA);
        input[2] = uint256(tokenB);

        // Dynamic arrays will add the array size to the front of the array, so need extra 1 size.
        uint input_size_32 = (input_size + 1) * 32;

        uint256[2] memory output;

        assembly {
            if iszero(
                staticcall(gas(), 0x0000000000000000405, input, input_size_32, output, 0x40)
            ) {
                revert(0, 0)
            }
        }
        return (output[0], output[1]);
    }

    /**
     * @dev Get Liquidity token address.
     * Returns (liquidity_token_address)
     */
    function getLiquidityTokenAddress(address tokenA, address tokenB)
    public
    view
    override
    returns (address) {
        require(tokenA != address(0), "DEX: tokenA is zero address");
        require(tokenB != address(0), "DEX: tokenB is zero address");

        uint input_size = 3;
        uint256[] memory input = new uint256[](input_size);

        input[0] = 1;
        input[1] = uint256(tokenA);
        input[2] = uint256(tokenB);

        // Dynamic arrays will add the array size to the front of the array, so need extra 1 size.
        uint input_size_32 = (input_size + 1) * 32;

        uint256[1] memory output;

        assembly {
            if iszero(
                staticcall(gas(), 0x0000000000000000405, input, input_size_32, output, 0x20)
            ) {
                revert(0, 0)
            }
        }
        return address(output[0]);
    }


    /**
     * @dev Get swap target amount.
     * Returns (target_amount)
     */
    function getSwapTargetAmount(address[] memory path, uint256 supplyAmount)
    public
    view
    override
    returns (uint256) {
        require(path.length >= 2 && path.length <= 3, "DEX: token path over the limit");
        require(supplyAmount != 0, "DEX: supplyAmount is zero");

        uint input_size = 3 + path.length;
        uint256[] memory input = new uint256[](input_size);

        input[0] = 2;
        input[1] = path.length;
        for (uint i = 0; i < path.length; i++) {
            require(path[i] != address(0), "DEX: token is zero address");
            input[2 + i] = uint256(path[i]);
        }
        input[input_size - 1] = supplyAmount;

        // Dynamic arrays will add the array size to the front of the array, so need extra 1 size.
        uint input_size_32 = (input_size + 1) * 32;

        uint256[1] memory output;

        assembly {
            if iszero(
                staticcall(gas(), 0x0000000000000000405, input, input_size_32, output, 0x20)
            ) {
                revert(0, 0)
            }
        }
        return output[0];
    }

    /**
     * @dev Get swap supply amount.
     * Returns (supply_amount)
     */
    function getSwapSupplyAmount(address[] memory path, uint256 targetAmount)
    public
    view
    override
    returns (uint256) {
        require(path.length >= 2 && path.length <= 3, "DEX: token path over the limit");
        require(targetAmount != 0, "DEX: targetAmount is zero");

        uint input_size = 3 + path.length;
        uint256[] memory input = new uint256[](input_size);

        input[0] = 3;
        input[1] = path.length;
        for (uint i = 0; i < path.length; i++) {
            require(path[i] != address(0), "DEX: token is zero address");
            input[2 + i] = uint256(path[i]);
        }
        input[input_size - 1] = targetAmount;

        // Dynamic arrays will add the array size to the front of the array, so need extra 1 size.
        uint input_size_32 = (input_size + 1) * 32;

        uint256[1] memory output;

        assembly {
            if iszero(
                staticcall(gas(), 0x0000000000000000405, input, input_size_32, output, 0x20)
            ) {
                revert(0, 0)
            }
        }
        return output[0];
    }

    /**
     * @dev Swap with exact supply.
     * Returns a boolean value indicating whether the operation succeeded.
     */
    function swapWithExactSupply(address[] memory path, uint256 supplyAmount, uint256 minTargetAmount)
    public
    override
    returns (bool) {
        require(path.length >= 2 && path.length <= 3, "DEX: token path over the limit");
        require(supplyAmount != 0, "DEX: supplyAmount is zero");

        uint input_size = 5 + path.length;
        uint256[] memory input = new uint256[](input_size);

        input[0] = 4;
        input[1] = uint256(msg.sender);
        input[2] = path.length;
        for (uint i = 0; i < path.length; i++) {
            require(path[i] != address(0), "DEX: token is zero address");
            input[3 + i] = uint256(path[i]);
        }
        input[input_size - 2] = supplyAmount;
        input[input_size - 1] = minTargetAmount;

        // Dynamic arrays will add the array size to the front of the array, so need extra 1 size.
        uint input_size_32 = (input_size + 1) * 32;

        uint256[1] memory output;

        assembly {
            if iszero(
                staticcall(gas(), 0x0000000000000000405, input, input_size_32, output, 0x20)
            ) {
                revert(0, 0)
            }
        }
        emit Swaped(msg.sender, path, supplyAmount, output[0]);
        return true;
    }

    /**
     * @dev Swap with exact target.
     * Returns a boolean value indicating whether the operation succeeded.
     */
    function swapWithExactTarget(address[] memory path, uint256 targetAmount, uint256 maxSupplyAmount)
    public
    override
    returns (bool) {
        require(path.length >= 2 && path.length <= 3, "DEX: token path over the limit");
        require(targetAmount != 0, "DEX: targetAmount is zero");

        uint input_size = 5 + path.length;
        uint256[] memory input = new uint256[](input_size);

        input[0] = 5;
        input[1] = uint256(msg.sender);
        input[2] = path.length;
        for (uint i = 0; i < path.length; i++) {
            require(path[i] != address(0), "DEX: token is zero address");
            input[3 + i] = uint256(path[i]);
        }
        input[input_size - 2] = targetAmount;
        input[input_size - 1] = maxSupplyAmount;

        // Dynamic arrays will add the array size to the front of the array, so need extra 1 size.
        uint input_size_32 = (input_size + 1) * 32;

        uint256[1] memory output;

        assembly {
            if iszero(
                staticcall(gas(), 0x0000000000000000405, input, input_size_32, output, 0x20)
            ) {
                revert(0, 0)
            }
        }
        emit Swaped(msg.sender, path, output[0], targetAmount);
        return true;
    }

    /**
     * @dev Add liquidity to the trading pair.
     * Returns a boolean value indicating whether the operation succeeded.
     */
    function addLiquidity(address tokenA, address tokenB, uint256 maxAmountA, uint256 maxAmountB)
    public
    override
    returns (bool) {
        require(tokenA != address(0), "DEX: tokenA is zero address");
        require(tokenB != address(0), "DEX: tokenB is zero address");
        require(maxAmountA != 0, "DEX: maxAmountA is zero");
        require(maxAmountB != 0, "DEX: maxAmountB is zero");

        uint input_size = 6;
        uint256[] memory input = new uint256[](input_size);

        input[0] = 6;
        input[1] = uint256(msg.sender);
        input[2] = uint256(tokenA);
        input[3] = uint256(tokenB);
        input[4] = maxAmountA;
        input[5] = maxAmountB;

        // Dynamic arrays will add the array size to the front of the array, so need extra 1 size.
        uint input_size_32 = (input_size + 1) * 32;

        assembly {
            if iszero(
                staticcall(gas(), 0x0000000000000000405, input, input_size_32, 0x00, 0x00)
            ) {
                revert(0, 0)
            }
        }
        emit AddedLiquidity(msg.sender, tokenA, tokenB, maxAmountA, maxAmountB);
        return true;
    }

    /**
     * @dev Remove liquidity from the trading pair.
     * Returns a boolean value indicating whether the operation succeeded.
     */
    function removeLiquidity(address tokenA, address tokenB, uint256 removeShare)
    public
    override
    returns (bool) {
        require(tokenA != address(0), "DEX: tokenA is zero address");
        require(tokenB != address(0), "DEX: tokenB is zero address");
        require(removeShare != 0, "DEX: removeShare is zero");

        uint input_size = 5;
        uint256[] memory input = new uint256[](input_size);

        input[0] = 7;
        input[1] = uint256(msg.sender);
        input[2] = uint256(tokenA);
        input[3] = uint256(tokenB);
        input[4] = removeShare;

        // Dynamic arrays will add the array size to the front of the array, so need extra 1 size.
        uint input_size_32 = (input_size + 1) * 32;

        assembly {
            if iszero(
                staticcall(gas(), 0x0000000000000000405, input, input_size_32, 0x00, 0x00)
            ) {
                revert(0, 0)
            }
        }
        emit RemovedLiquidity(msg.sender, tokenA, tokenB, removeShare);
        return true;
    }
}
