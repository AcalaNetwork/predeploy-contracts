pragma solidity ^0.5.0;

library ADDRESS {
	address public constant ACA = 0x0000000000000000000000000000000001000000;
	address public constant AUSD = 0x0000000000000000000000000000000001000001;
	address public constant StateRent = 0x0000000000000000000000000000000000000800;
	address public constant Oracle = 0x0000000000000000000000000000000000000801;
	address public constant ScheduleCall = 0x0000000000000000000000000000000000000802;
	address public constant DEX = 0x0000000000000000000000000000000000000803;

	function getACAAddress() public pure returns(address) {
		return this.[0];
	}
	function getAUSDAddress() public pure returns(address) {
		return this.[0];
	}
	function getStateRentAddress() public pure returns(address) {
		return this.[0];
	}
	function getOracleAddress() public pure returns(address) {
		return this.[0];
	}
	function getScheduleCallAddress() public pure returns(address) {
		return this.[0];
	}
	function getDEXAddress() public pure returns(address) {
		return this.[0];
	}
}
