pragma solidity ^0.5.0;

library ScheduleCallLib {
    function scheduleCall(
        address sender,
        address contract_address,
        uint256 value,
        uint256 gas_limit,
        uint256 storage_limit,
        uint256 min_delay,
				bytes memory input_data
    ) internal view {
				uint input_data_capacity = (input_data.length + 31)/32;
        // param + input_len + input_data
        uint input_size = 7 + 1 + input_data_capacity;

        // Dynamic arrays will add the array size to the front of the array, but this is not what we expected.
        // So use a fixed-length 100 array, and then pass the real size through the `input_size_32` parameter of staticcall
        // uint256[] memory input = new uint256[](size);
        uint256[100] memory input;

        input[0] = 0;
        input[1] = uint256(sender);
        input[2] = uint256(contract_address);
        input[3] = uint256(value);
        input[4] = uint256(gas_limit);
        input[5] = uint256(storage_limit);
        input[6] = uint256(min_delay);

        // input_len
        input[7] = uint256(input_data.length);

        for (uint i = 0; i < input_data_capacity; i++) {
            input[8 + i] = bytes2Uint(input_data, i);
        }

        uint input_size_32 = input_size * 32;

				assembly {
            if iszero(
                staticcall(gas, 0x0000000000000000404, input, input_size_32, 0x00, 0x00)
            ) {
                revert(0, 0)
            }
        }
    }

		function bytes2Uint(bytes memory bs, uint start) public pure returns (uint) {
        // require(bs.length >= start + 32, "slicing out of range");
        // if bs.length < start + 32, 0 will be added at the end.
        uint x;
        assembly {
            x := mload(add(bs, add(0x20, start)))
        }
        return x;
    }
}

