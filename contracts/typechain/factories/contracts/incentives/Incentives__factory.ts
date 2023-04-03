/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import { Signer, utils, Contract, ContractFactory, Overrides } from "ethers";
import type { Provider, TransactionRequest } from "@ethersproject/providers";
import type { PromiseOrValue } from "../../../common";
import type {
  Incentives,
  IncentivesInterface,
} from "../../../contracts/incentives/Incentives";

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
        internalType: "enum InterfaceIncentives.PoolId",
        name: "pool",
        type: "uint8",
      },
      {
        indexed: true,
        internalType: "address",
        name: "poolCurrencyId",
        type: "address",
      },
    ],
    name: "ClaimedRewards",
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
      {
        indexed: false,
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    name: "DepositedShare",
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
      {
        indexed: false,
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    name: "WithdrewShare",
    type: "event",
  },
  {
    inputs: [
      {
        internalType: "enum InterfaceIncentives.PoolId",
        name: "pool",
        type: "uint8",
      },
      {
        internalType: "address",
        name: "poolCurrencyId",
        type: "address",
      },
    ],
    name: "claimRewards",
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
        name: "amount",
        type: "uint256",
      },
    ],
    name: "depositDexShare",
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
        internalType: "enum InterfaceIncentives.PoolId",
        name: "pool",
        type: "uint8",
      },
      {
        internalType: "address",
        name: "poolCurrencyId",
        type: "address",
      },
    ],
    name: "getClaimRewardDeductionRate",
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
        internalType: "enum InterfaceIncentives.PoolId",
        name: "pool",
        type: "uint8",
      },
      {
        internalType: "address",
        name: "poolCurrencyId",
        type: "address",
      },
      {
        internalType: "address",
        name: "rewardCurrencyId",
        type: "address",
      },
    ],
    name: "getIncentiveRewardAmount",
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
        internalType: "address[]",
        name: "currencyIds",
        type: "address[]",
      },
      {
        internalType: "enum InterfaceIncentives.PoolId",
        name: "pool",
        type: "uint8",
      },
      {
        internalType: "address",
        name: "poolCurrencyId",
        type: "address",
      },
      {
        internalType: "address",
        name: "who",
        type: "address",
      },
    ],
    name: "getPendingRewards",
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
        name: "currencyId",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    name: "withdrawDexShare",
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
  "0x608060405234801561001057600080fd5b50610e6c806100206000396000f3fe608060405234801561001057600080fd5b50600436106100725760003560e01c80636ccf80da116100505780636ccf80da146100d35780636ff45b8b146100e6578063a4a7ade2146100f957600080fd5b80630720ad711461007757806310b8087f1461009f5780632b4b3abb146100c0575b600080fd5b61008a6100853660046109b2565b610119565b60405190151581526020015b60405180910390f35b6100b26100ad3660046109eb565b6102f0565b604051908152602001610096565b61008a6100ce3660046109b2565b610411565b6100b26100e1366004610a1e565b6105d4565b61008a6100f43660046109eb565b6106f8565b61010c610107366004610a61565b61085f565b6040516100969190610b07565b60008160000361018a576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152601a60248201527f496e63656e74697665733a20616d6f756e74206973207a65726f00000000000060448201526064015b60405180910390fd5b60405133602482015273ffffffffffffffffffffffffffffffffffffffff8416604482015260648101839052600090819061040a90608401604080517fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffe08184030181529181526020820180517bffffffffffffffffffffffffffffffffffffffffffffffffffffffff167fc17ca2a600000000000000000000000000000000000000000000000000000000179052516102439190610b4b565b6000604051808303816000865af19150503d8060008114610280576040519150601f19603f3d011682016040523d82523d6000602084013e610285565b606091505b50909250905081610297573d60208201fd5b60405184815273ffffffffffffffffffffffffffffffffffffffff86169033907f45f78f5c760c3f28245fbb46e318d554fca9c064767f9a6f852daf0035c21b92906020015b60405180910390a3506001949350505050565b600080600061040a73ffffffffffffffffffffffffffffffffffffffff168585604051602401610321929190610be4565b604080517fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffe08184030181529181526020820180517bffffffffffffffffffffffffffffffffffffffffffffffffffffffff167fa2e2fc8e00000000000000000000000000000000000000000000000000000000179052516103a29190610b4b565b600060405180830381855afa9150503d80600081146103dd576040519150601f19603f3d011682016040523d82523d6000602084013e6103e2565b606091505b509092509050816103f4573d60208201fd5b808060200190518101906104089190610c15565b95945050505050565b60008160000361047d576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152601a60248201527f496e63656e74697665733a20616d6f756e74206973207a65726f0000000000006044820152606401610181565b60405133602482015273ffffffffffffffffffffffffffffffffffffffff8416604482015260648101839052600090819061040a90608401604080517fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffe08184030181529181526020820180517bffffffffffffffffffffffffffffffffffffffffffffffffffffffff167fdae3ac6900000000000000000000000000000000000000000000000000000000179052516105369190610b4b565b6000604051808303816000865af19150503d8060008114610573576040519150601f19603f3d011682016040523d82523d6000602084013e610578565b606091505b5090925090508161058a573d60208201fd5b60405184815273ffffffffffffffffffffffffffffffffffffffff86169033907fd766e42510e7730861ab6096248fb43982df3017d6119d41482e18cb79a7dadb906020016102dd565b600080600061040a73ffffffffffffffffffffffffffffffffffffffff1686868660405160240161060793929190610c2e565b604080517fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffe08184030181529181526020820180517bffffffffffffffffffffffffffffffffffffffffffffffffffffffff167f7469000d00000000000000000000000000000000000000000000000000000000179052516106889190610b4b565b600060405180830381855afa9150503d80600081146106c3576040519150601f19603f3d011682016040523d82523d6000602084013e6106c8565b606091505b509092509050816106da573d60208201fd5b808060200190518101906106ee9190610c15565b9695505050505050565b600080600061040a73ffffffffffffffffffffffffffffffffffffffff1633868660405160240161072b93929190610c6a565b604080517fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffe08184030181529181526020820180517bffffffffffffffffffffffffffffffffffffffffffffffffffffffff167fe12eab9b00000000000000000000000000000000000000000000000000000000179052516107ac9190610b4b565b6000604051808303816000865af19150503d80600081146107e9576040519150601f19603f3d011682016040523d82523d6000602084013e6107ee565b606091505b50909250905081610800573d60208201fd5b8373ffffffffffffffffffffffffffffffffffffffff1685600181111561082957610829610b7a565b60405133907fc14c8e20e4488520e8daf6686d64ff040c85a6f6a739393ce599a92351c44b3990600090a4506001949350505050565b606060008061040a73ffffffffffffffffffffffffffffffffffffffff168888888888604051602401610896959493929190610ca7565b604080517fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffe08184030181529181526020820180517bffffffffffffffffffffffffffffffffffffffffffffffffffffffff167f0eb797b100000000000000000000000000000000000000000000000000000000179052516109179190610b4b565b600060405180830381855afa9150503d8060008114610952576040519150601f19603f3d011682016040523d82523d6000602084013e610957565b606091505b50909250905081610969573d60208201fd5b8080602001905181019061097d9190610d66565b98975050505050505050565b803573ffffffffffffffffffffffffffffffffffffffff811681146109ad57600080fd5b919050565b600080604083850312156109c557600080fd5b6109ce83610989565b946020939093013593505050565b8035600281106109ad57600080fd5b600080604083850312156109fe57600080fd5b610a07836109dc565b9150610a1560208401610989565b90509250929050565b600080600060608486031215610a3357600080fd5b610a3c846109dc565b9250610a4a60208501610989565b9150610a5860408501610989565b90509250925092565b600080600080600060808688031215610a7957600080fd5b853567ffffffffffffffff80821115610a9157600080fd5b818801915088601f830112610aa557600080fd5b813581811115610ab457600080fd5b8960208260051b8501011115610ac957600080fd5b602092830197509550610adf91880190506109dc565b9250610aed60408701610989565b9150610afb60608701610989565b90509295509295909350565b6020808252825182820181905260009190848201906040850190845b81811015610b3f57835183529284019291840191600101610b23565b50909695505050505050565b6000825160005b81811015610b6c5760208186018101518583015201610b52565b506000920191825250919050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052602160045260246000fd5b60028110610be0577f4e487b7100000000000000000000000000000000000000000000000000000000600052602160045260246000fd5b9052565b60408101610bf28285610ba9565b73ffffffffffffffffffffffffffffffffffffffff831660208301529392505050565b600060208284031215610c2757600080fd5b5051919050565b60608101610c3c8286610ba9565b73ffffffffffffffffffffffffffffffffffffffff8085166020840152808416604084015250949350505050565b73ffffffffffffffffffffffffffffffffffffffff84811682526060820190610c966020840186610ba9565b808416604084015250949350505050565b6080808252810185905260008660a08301825b88811015610cf55773ffffffffffffffffffffffffffffffffffffffff610ce084610989565b16825260209283019290910190600101610cba565b509150610d0790506020830186610ba9565b73ffffffffffffffffffffffffffffffffffffffff80851660408401528084166060840152509695505050505050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052604160045260246000fd5b60006020808385031215610d7957600080fd5b825167ffffffffffffffff80821115610d9157600080fd5b818501915085601f830112610da557600080fd5b815181811115610db757610db7610d37565b8060051b6040517fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffe0603f83011681018181108582111715610dfa57610dfa610d37565b604052918252848201925083810185019188831115610e1857600080fd5b938501935b8285101561097d57845184529385019392850192610e1d56fea2646970667358221220402bf01b6e5b952c3d370349b41cb0a087f2a9cb24de15e6eb9113f6aba7c55464736f6c63430008120033";

type IncentivesConstructorParams =
  | [signer?: Signer]
  | ConstructorParameters<typeof ContractFactory>;

const isSuperArgs = (
  xs: IncentivesConstructorParams
): xs is ConstructorParameters<typeof ContractFactory> => xs.length > 1;

export class Incentives__factory extends ContractFactory {
  constructor(...args: IncentivesConstructorParams) {
    if (isSuperArgs(args)) {
      super(...args);
    } else {
      super(_abi, _bytecode, args[0]);
    }
  }

  override deploy(
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<Incentives> {
    return super.deploy(overrides || {}) as Promise<Incentives>;
  }
  override getDeployTransaction(
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): TransactionRequest {
    return super.getDeployTransaction(overrides || {});
  }
  override attach(address: string): Incentives {
    return super.attach(address) as Incentives;
  }
  override connect(signer: Signer): Incentives__factory {
    return super.connect(signer) as Incentives__factory;
  }

  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): IncentivesInterface {
    return new utils.Interface(_abi) as IncentivesInterface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): Incentives {
    return new Contract(address, _abi, signerOrProvider) as Incentives;
  }
}
