// SPDX-License-Identifier: Apache-2.0

pragma solidity ^0.6.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract Erc20DemoContract2 is ERC20 {
    constructor() public ERC20("Basic", "BSC") {
        _mint(0x1000000000000000000000000000000000000001, 10000);
	_setupDecimals(17);
    }
}
