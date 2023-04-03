/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import { Signer, utils, Contract, ContractFactory, Overrides } from "ethers";
import type { Provider, TransactionRequest } from "@ethersproject/providers";
import type { PromiseOrValue } from "../../../common";
import type { Honzon, HonzonInterface } from "../../../contracts/honzon/Honzon";

const _abi = [
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "sender",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "currencyId",
        type: "address",
      },
      {
        indexed: false,
        internalType: "int128",
        name: "collateralAdjustment",
        type: "int128",
      },
      {
        indexed: false,
        internalType: "int128",
        name: "debitAdjustment",
        type: "int128",
      },
    ],
    name: "AdjustedLoan",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "sender",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "currencyId",
        type: "address",
      },
    ],
    name: "ClosedLoanByDex",
    type: "event",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "currencyId",
        type: "address",
      },
      {
        internalType: "int128",
        name: "collateralAdjustment",
        type: "int128",
      },
      {
        internalType: "int128",
        name: "debitAdjustment",
        type: "int128",
      },
    ],
    name: "adjustLoan",
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
        name: "currencyId",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "maxCollateralAmount",
        type: "uint256",
      },
    ],
    name: "closeLoanByDex",
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
        name: "currencyId",
        type: "address",
      },
    ],
    name: "getCollateralParameters",
    outputs: [
      {
        internalType: "uint256[]",
        name: "",
        type: "uint256[]",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "who",
        type: "address",
      },
      {
        internalType: "address",
        name: "currencyId",
        type: "address",
      },
    ],
    name: "getCurrentCollateralRatio",
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
        name: "currencyId",
        type: "address",
      },
    ],
    name: "getDebitExchangeRate",
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
        name: "who",
        type: "address",
      },
      {
        internalType: "address",
        name: "currencyId",
        type: "address",
      },
    ],
    name: "getPosition",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
] as const;

const _bytecode =
  "0x608060405234801561001057600080fd5b50610c1f806100206000396000f3fe608060405234801561001057600080fd5b50600436106100725760003560e01c8063b33dc19011610050578063b33dc190146100d3578063d018f091146100fb578063e8b966621461010e57600080fd5b80631384ed1714610077578063345f5d931461009d57806349895dee146100c0575b600080fd5b61008a61008536600461095a565b61012e565b6040519081526020015b60405180910390f35b6100b06100ab36600461099f565b610253565b6040519015158152602001610094565b6100b06100ce3660046109e2565b610478565b6100e66100e136600461095a565b6105d5565b60408051928352602083019190915201610094565b61008a610109366004610a0c565b610700565b61012161011c366004610a0c565b61081c565b6040516100949190610a2e565b60405173ffffffffffffffffffffffffffffffffffffffff8381166024830152821660448201526000908190819061040990606401604080517fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffe08184030181529181526020820180517bffffffffffffffffffffffffffffffffffffffffffffffffffffffff167f1384ed1700000000000000000000000000000000000000000000000000000000179052516101e49190610a72565b600060405180830381855afa9150503d806000811461021f576040519150601f19603f3d011682016040523d82523d6000602084013e610224565b606091505b50909250905081610236573d60208201fd5b8080602001905181019061024a9190610aa1565b95945050505050565b600082600f0b600014158061026c575081600f0b600014155b6102fc576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152602360248201527f486f6e7a6f6e3a2061646a7573746d656e7420616d6f756e747320617265207a60448201527f65726f0000000000000000000000000000000000000000000000000000000000606482015260840160405180910390fd5b60405133602482015273ffffffffffffffffffffffffffffffffffffffff85166044820152600f84810b606483015283900b608482015260009081906104099060a401604080517fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffe08184030181529181526020820180517bffffffffffffffffffffffffffffffffffffffffffffffffffffffff167fd20a1c8700000000000000000000000000000000000000000000000000000000179052516103c09190610a72565b6000604051808303816000865af19150503d80600081146103fd576040519150601f19603f3d011682016040523d82523d6000602084013e610402565b606091505b50909250905081610414573d60208201fd5b60408051600f87810b825286900b602082015273ffffffffffffffffffffffffffffffffffffffff88169133917fe2cff686fc32ba2598b795b502cc29355d96476b81bfec8f2ed19fc0c20b751b910160405180910390a350600195945050505050565b60405133602482015273ffffffffffffffffffffffffffffffffffffffff83166044820152606481018290526000908190819061040990608401604080517fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffe08184030181529181526020820180517bffffffffffffffffffffffffffffffffffffffffffffffffffffffff167fbf0ea73100000000000000000000000000000000000000000000000000000000179052516105339190610a72565b6000604051808303816000865af19150503d8060008114610570576040519150601f19603f3d011682016040523d82523d6000602084013e610575565b606091505b50909250905081610587573d60208201fd5b60405173ffffffffffffffffffffffffffffffffffffffff86169033907f5da7833102bf6cf960a8286f0c40b87af131ed105e112b28276d4b7933b33bde90600090a3506001949350505050565b60405173ffffffffffffffffffffffffffffffffffffffff83811660248301528216604482015260009081908190819061040990606401604080517fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffe08184030181529181526020820180517bffffffffffffffffffffffffffffffffffffffffffffffffffffffff167fb33dc190000000000000000000000000000000000000000000000000000000001790525161068d9190610a72565b600060405180830381855afa9150503d80600081146106c8576040519150601f19603f3d011682016040523d82523d6000602084013e6106cd565b606091505b509092509050816106df573d60208201fd5b808060200190518101906106f39190610aba565b9350935050509250929050565b60405173ffffffffffffffffffffffffffffffffffffffff821660248201526000908190819061040990604401604080517fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffe08184030181529181526020820180517bffffffffffffffffffffffffffffffffffffffffffffffffffffffff167fd018f09100000000000000000000000000000000000000000000000000000000179052516107ae9190610a72565b600060405180830381855afa9150503d80600081146107e9576040519150601f19603f3d011682016040523d82523d6000602084013e6107ee565b606091505b50909250905081610800573d60208201fd5b808060200190518101906108149190610aa1565b949350505050565b60405173ffffffffffffffffffffffffffffffffffffffff82166024820152606090600090819061040990604401604080517fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffe08184030181529181526020820180517bffffffffffffffffffffffffffffffffffffffffffffffffffffffff167fe8b9666200000000000000000000000000000000000000000000000000000000179052516108cb9190610a72565b600060405180830381855afa9150503d8060008114610906576040519150601f19603f3d011682016040523d82523d6000602084013e61090b565b606091505b5090925090508161091d573d60208201fd5b808060200190518101906108149190610b0d565b803573ffffffffffffffffffffffffffffffffffffffff8116811461095557600080fd5b919050565b6000806040838503121561096d57600080fd5b61097683610931565b915061098460208401610931565b90509250929050565b8035600f81900b811461095557600080fd5b6000806000606084860312156109b457600080fd5b6109bd84610931565b92506109cb6020850161098d565b91506109d96040850161098d565b90509250925092565b600080604083850312156109f557600080fd5b6109fe83610931565b946020939093013593505050565b600060208284031215610a1e57600080fd5b610a2782610931565b9392505050565b6020808252825182820181905260009190848201906040850190845b81811015610a6657835183529284019291840191600101610a4a565b50909695505050505050565b6000825160005b81811015610a935760208186018101518583015201610a79565b506000920191825250919050565b600060208284031215610ab357600080fd5b5051919050565b60008060408385031215610acd57600080fd5b505080516020909101519092909150565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052604160045260246000fd5b60006020808385031215610b2057600080fd5b825167ffffffffffffffff80821115610b3857600080fd5b818501915085601f830112610b4c57600080fd5b815181811115610b5e57610b5e610ade565b8060051b6040517fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffe0603f83011681018181108582111715610ba157610ba1610ade565b604052918252848201925083810185019188831115610bbf57600080fd5b938501935b82851015610bdd57845184529385019392850192610bc4565b9897505050505050505056fea2646970667358221220609adfc9ec9e981b0ba66582a575a347d4cf5bcf82c4b0e43c259b7605c1027564736f6c63430008120033";

type HonzonConstructorParams =
  | [signer?: Signer]
  | ConstructorParameters<typeof ContractFactory>;

const isSuperArgs = (
  xs: HonzonConstructorParams
): xs is ConstructorParameters<typeof ContractFactory> => xs.length > 1;

export class Honzon__factory extends ContractFactory {
  constructor(...args: HonzonConstructorParams) {
    if (isSuperArgs(args)) {
      super(...args);
    } else {
      super(_abi, _bytecode, args[0]);
    }
  }

  override deploy(
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<Honzon> {
    return super.deploy(overrides || {}) as Promise<Honzon>;
  }
  override getDeployTransaction(
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): TransactionRequest {
    return super.getDeployTransaction(overrides || {});
  }
  override attach(address: string): Honzon {
    return super.attach(address) as Honzon;
  }
  override connect(signer: Signer): Honzon__factory {
    return super.connect(signer) as Honzon__factory;
  }

  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): HonzonInterface {
    return new utils.Interface(_abi) as HonzonInterface;
  }
  static connect(address: string, signerOrProvider: Signer | Provider): Honzon {
    return new Contract(address, _abi, signerOrProvider) as Honzon;
  }
}
