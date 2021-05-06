pragma solidity ^0.6.0;

import "./IStateRent.sol";

contract StateRent is IStateRent {
    /**
     * @dev Returns the const of NewContractExtraBytes.
     */
    function newContractExtraBytes() public view override returns (uint256) {
        bytes memory input = abi.encodeWithSignature("newContractExtraBytes()");

        // Dynamic arrays will add the array size to the front of the array, so need extra 32 bytes.
        uint input_size = input.length + 32;

        uint256[1] memory output;

        assembly {
            if iszero(
                staticcall(gas(), 0x0000000000000000402, input, input_size, output, 0x20)
            ) {
                revert(0, 0)
            }
        }
        return output[0];
    }

    /**
     * @dev Returns the const of StorageDepositPerByte.
     */
    function storageDepositPerByte() public view override returns (uint256) {
        bytes memory input = abi.encodeWithSignature("storageDepositPerByte()");

        // Dynamic arrays will add the array size to the front of the array, so need extra 32 bytes.
        uint input_size = input.length + 32;

        uint256[1] memory output;

        assembly {
            if iszero(
                staticcall(gas(), 0x0000000000000000402, input, input_size, output, 0x20)
            ) {
                revert(0, 0)
            }
        }
        return output[0];
    }

    /**
     * @dev Returns the maintainer of the contract.
     */
    function maintainerOf(address contract_address)
        public
        view
        override
        returns (address)
    {
        bytes memory input = abi.encodeWithSignature("maintainerOf(address)", contract_address);

        // Dynamic arrays will add the array size to the front of the array, so need extra 32 bytes.
        uint input_size = input.length + 32;

        uint256[1] memory output;

        assembly {
            if iszero(
                staticcall(gas(), 0x0000000000000000402, input, input_size, output, 0x20)
            ) {
                revert(0, 0)
            }
        }
        return address(output[0]);
    }

    /**
     * @dev Returns the const of DeveloperDeposit.
     */
    function developerDeposit() public view override returns (uint256) {
        bytes memory input = abi.encodeWithSignature("developerDeposit()");

        // Dynamic arrays will add the array size to the front of the array, so need extra 32 bytes.
        uint input_size = input.length + 32;

        uint256[1] memory output;

        assembly {
            if iszero(
                staticcall(gas(), 0x0000000000000000402, input, input_size, output, 0x20)
            ) {
                revert(0, 0)
            }
        }
        return output[0];
    }

    /**
     * @dev Returns the const of DeploymentFee.
     */
    function deploymentFee() public view override returns (uint256) {
        bytes memory input = abi.encodeWithSignature("deploymentFee()");

        // Dynamic arrays will add the array size to the front of the array, so need extra 32 bytes.
        uint input_size = input.length + 32;

        uint256[1] memory output;

        assembly {
            if iszero(
                staticcall(gas(), 0x0000000000000000402, input, input_size, output, 0x20)
            ) {
                revert(0, 0)
            }
        }
        return output[0];
    }

    /**
     * @dev Transfer the maintainer of the contract.
     * Returns a boolean value indicating whether the operation succeeded.
     */
    function transferMaintainer(
        address contract_address,
        address new_maintainer
    ) public override returns (bool) {
        require(contract_address != address(0), "StateRent: the contract_address is the zero address");
        require(new_maintainer != address(0), "StateRent: the new_maintainer is the zero address");

        bytes memory input = abi.encodeWithSignature("transferMaintainer(address,address,address)", msg.sender, contract_address, new_maintainer);

        // Dynamic arrays will add the array size to the front of the array, so need extra 32 bytes.
        uint input_size = input.length + 32;

        assembly {
            if iszero(
                staticcall(gas(), 0x0000000000000000402, input, input_size, 0x00, 0x00)
            ) {
                revert(0, 0)
            }
        }
        emit TransferredMaintainer(contract_address, new_maintainer);
        return true;
    }
}
