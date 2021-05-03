pragma solidity ^0.6.0;

library Uint256Lib {
    function Uint2String(uint256 u) internal view returns (string memory) {
        bytes32 x = bytes32(u);
        bytes memory bytesString = new bytes(32);
        uint charCount = 0;
        for (uint j = 0; j < 32; j++) {
            byte char = byte(bytes32(uint(x) * 2 ** (8 * j)));
            if (char != 0) {
                bytesString[charCount] = char;
                charCount++;
            }
        }

        bytes memory bytesStringTrimmed = new bytes(charCount);
        for (uint j = 0; j < charCount; j++) {
            bytesStringTrimmed[j] = bytesString[j];
        }
        return string(bytesStringTrimmed);
    }

    function Bytes2Uint(bytes memory bs, uint index) internal view returns (uint) {
        // require(bs.length >= start + 32, "slicing out of range");
        // if bs.length < start + 32, 0 will be added at the end.
        uint start = index * 32;
        uint x;
        assembly {
            x := mload(add(bs, add(0x20, start)))
        }
        return x;
    }
}
