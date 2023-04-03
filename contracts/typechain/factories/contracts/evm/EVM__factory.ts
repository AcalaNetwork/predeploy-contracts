/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import { Signer, utils, Contract, ContractFactory, Overrides } from "ethers";
import type { Provider, TransactionRequest } from "@ethersproject/providers";
import type { PromiseOrValue } from "../../../common";
import type { EVM, EVMInterface } from "../../../contracts/evm/EVM";

const _abi = [
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "contractAddress",
        type: "address",
      },
    ],
    name: "ContractPublished",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "accountAddress",
        type: "address",
      },
    ],
    name: "DeveloperDisabled",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "accountAddress",
        type: "address",
      },
    ],
    name: "DeveloperEnabled",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "contractAddress",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "newMaintainer",
        type: "address",
      },
    ],
    name: "TransferredMaintainer",
    type: "event",
  },
  {
    inputs: [],
    name: "developerDeposit",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "developerDisable",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "developerEnable",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "account",
        type: "address",
      },
    ],
    name: "developerStatus",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "contractAddress",
        type: "address",
      },
    ],
    name: "maintainerOf",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "newContractExtraBytes",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "publicationFee",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "contractAddress",
        type: "address",
      },
    ],
    name: "publishContract",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "storageDepositPerByte",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "contractAddress",
        type: "address",
      },
      {
        internalType: "address",
        name: "newMaintainer",
        type: "address",
      },
    ],
    name: "transferMaintainer",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
] as const;

const _bytecode =
  "0x608060405234801561001057600080fd5b50610e0d806100206000396000f3fe608060405234801561001057600080fd5b50600436106100be5760003560e01c8063710f50ff11610076578063b6cbb1a81161005b578063b6cbb1a814610159578063cfbd33d71461016c578063e3be1f491461017f57600080fd5b8063710f50ff1461013e578063a23e8b821461015157600080fd5b806368a18855116100a757806368a18855146101185780636e0439981461012e5780636e0e540c1461013657600080fd5b806306ad1355146100c3578063541333f814610100575b600080fd5b6100d66100d1366004610cf3565b610187565b60405173ffffffffffffffffffffffffffffffffffffffff90911681526020015b60405180910390f35b6101086102a3565b60405190151581526020016100f7565b6101206103c3565b6040519081526020016100f7565b61012061049d565b61012061050a565b61010861014c366004610cf3565b610577565b61012061068b565b610108610167366004610cf3565b6106f8565b61010861017a366004610d17565b6108f3565b610108610bae565b60405173ffffffffffffffffffffffffffffffffffffffff821660248201526000908190819061040290604401604080517fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffe08184030181529181526020820180517bffffffffffffffffffffffffffffffffffffffffffffffffffffffff167f06ad135500000000000000000000000000000000000000000000000000000000179052516102359190610d50565b600060405180830381855afa9150503d8060008114610270576040519150601f19603f3d011682016040523d82523d6000602084013e610275565b606091505b50909250905081610287573d60208201fd5b8080602001905181019061029b9190610d7f565b949350505050565b6040513360248201526000908190819061040290604401604080517fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffe08184030181529181526020820180517bffffffffffffffffffffffffffffffffffffffffffffffffffffffff167f504eb6b5000000000000000000000000000000000000000000000000000000001790525161033b9190610d50565b6000604051808303816000865af19150503d8060008114610378576040519150601f19603f3d011682016040523d82523d6000602084013e61037d565b606091505b5090925090508161038f573d60208201fd5b60405133907f6a74a39c3e41893e02b357f2d6b07ddef387aa9dd194afc21d1994789e53079490600090a260019250505090565b60408051600481526024810182526020810180517bffffffffffffffffffffffffffffffffffffffffffffffffffffffff167f68a1885500000000000000000000000000000000000000000000000000000000179052905160009182918291610402916104309190610d50565b600060405180830381855afa9150503d806000811461046b576040519150601f19603f3d011682016040523d82523d6000602084013e610470565b606091505b50909250905081610482573d60208201fd5b808060200190518101906104969190610d9c565b9250505090565b60408051600481526024810182526020810180517bffffffffffffffffffffffffffffffffffffffffffffffffffffffff167f6e04399800000000000000000000000000000000000000000000000000000000179052905160009182918291610402916104309190610d50565b60408051600481526024810182526020810180517bffffffffffffffffffffffffffffffffffffffffffffffffffffffff167f6e0e540c00000000000000000000000000000000000000000000000000000000179052905160009182918291610402916104309190610d50565b60405173ffffffffffffffffffffffffffffffffffffffff821660248201526000908190819061040290604401604080517fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffe08184030181529181526020820180517bffffffffffffffffffffffffffffffffffffffffffffffffffffffff167f710f50ff00000000000000000000000000000000000000000000000000000000179052516106259190610d50565b600060405180830381855afa9150503d8060008114610660576040519150601f19603f3d011682016040523d82523d6000602084013e610665565b606091505b50909250905081610677573d60208201fd5b8080602001905181019061029b9190610db5565b60408051600481526024810182526020810180517bffffffffffffffffffffffffffffffffffffffffffffffffffffffff167fa23e8b8200000000000000000000000000000000000000000000000000000000179052905160009182918291610402916104309190610d50565b600073ffffffffffffffffffffffffffffffffffffffff82166107a2576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152602c60248201527f45564d3a2074686520636f6e747261637441646472657373206973207468652060448201527f7a65726f2061646472657373000000000000000000000000000000000000000060648201526084015b60405180910390fd5b60405133602482015273ffffffffffffffffffffffffffffffffffffffff83166044820152600090819061040290606401604080517fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffe08184030181529181526020820180517bffffffffffffffffffffffffffffffffffffffffffffffffffffffff167f3b594ce800000000000000000000000000000000000000000000000000000000179052516108549190610d50565b6000604051808303816000865af19150503d8060008114610891576040519150601f19603f3d011682016040523d82523d6000602084013e610896565b606091505b509092509050816108a8573d60208201fd5b60405173ffffffffffffffffffffffffffffffffffffffff8516907f24ee7c1049ff75cb49d5e03f0f252627eae228c5616a4aeca0dba91c220acedf90600090a25060019392505050565b600073ffffffffffffffffffffffffffffffffffffffff8316610998576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152602c60248201527f45564d3a2074686520636f6e747261637441646472657373206973207468652060448201527f7a65726f206164647265737300000000000000000000000000000000000000006064820152608401610799565b73ffffffffffffffffffffffffffffffffffffffff8216610a3b576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152602a60248201527f45564d3a20746865206e65774d61696e7461696e657220697320746865207a6560448201527f726f2061646472657373000000000000000000000000000000000000000000006064820152608401610799565b60405133602482015273ffffffffffffffffffffffffffffffffffffffff848116604483015283166064820152600090819061040290608401604080517fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffe08184030181529181526020820180517bffffffffffffffffffffffffffffffffffffffffffffffffffffffff167fee0d2e120000000000000000000000000000000000000000000000000000000017905251610af59190610d50565b6000604051808303816000865af19150503d8060008114610b32576040519150601f19603f3d011682016040523d82523d6000602084013e610b37565b606091505b50909250905081610b49573d60208201fd5b8373ffffffffffffffffffffffffffffffffffffffff168573ffffffffffffffffffffffffffffffffffffffff167f8cee443d7a0c7dbd8a490dab604d0ed84f4138ba66b3dce2f78ed58bb63f56b760405160405180910390a3506001949350505050565b6040513360248201526000908190819061040290604401604080517fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffe08184030181529181526020820180517bffffffffffffffffffffffffffffffffffffffffffffffffffffffff167f757c54c90000000000000000000000000000000000000000000000000000000017905251610c469190610d50565b6000604051808303816000865af19150503d8060008114610c83576040519150601f19603f3d011682016040523d82523d6000602084013e610c88565b606091505b50909250905081610c9a573d60208201fd5b60405133907f529c85caa49bb69f5a88e3d291d54b9f610dcd4c81d4e94ae042bc28dff9cf3890600090a260019250505090565b73ffffffffffffffffffffffffffffffffffffffff81168114610cf057600080fd5b50565b600060208284031215610d0557600080fd5b8135610d1081610cce565b9392505050565b60008060408385031215610d2a57600080fd5b8235610d3581610cce565b91506020830135610d4581610cce565b809150509250929050565b6000825160005b81811015610d715760208186018101518583015201610d57565b506000920191825250919050565b600060208284031215610d9157600080fd5b8151610d1081610cce565b600060208284031215610dae57600080fd5b5051919050565b600060208284031215610dc757600080fd5b81518015158114610d1057600080fdfea26469706673582212200f94e6ccd2ce58277b49a37c1982e6418495510422a4b279bcd8caa6f5421e0b64736f6c63430008120033";

type EVMConstructorParams =
  | [signer?: Signer]
  | ConstructorParameters<typeof ContractFactory>;

const isSuperArgs = (
  xs: EVMConstructorParams
): xs is ConstructorParameters<typeof ContractFactory> => xs.length > 1;

export class EVM__factory extends ContractFactory {
  constructor(...args: EVMConstructorParams) {
    if (isSuperArgs(args)) {
      super(...args);
    } else {
      super(_abi, _bytecode, args[0]);
    }
  }

  override deploy(
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<EVM> {
    return super.deploy(overrides || {}) as Promise<EVM>;
  }
  override getDeployTransaction(
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): TransactionRequest {
    return super.getDeployTransaction(overrides || {});
  }
  override attach(address: string): EVM {
    return super.attach(address) as EVM;
  }
  override connect(signer: Signer): EVM__factory {
    return super.connect(signer) as EVM__factory;
  }

  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): EVMInterface {
    return new utils.Interface(_abi) as EVMInterface;
  }
  static connect(address: string, signerOrProvider: Signer | Provider): EVM {
    return new Contract(address, _abi, signerOrProvider) as EVM;
  }
}
