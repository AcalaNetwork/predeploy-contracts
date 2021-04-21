// SPDX-License-Identifier: Apache-2.0

pragma solidity ^0.6.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract Erc20DemoContract is ERC20 {
    constructor() public ERC20("long string name, long string name, long string name, long string name, long string name", "TestToken") {
        // mint alice 10000
        _mint(0x1000000000000000000000000000000000000001, 10000);
        _setupDecimals(17);
    }
}
