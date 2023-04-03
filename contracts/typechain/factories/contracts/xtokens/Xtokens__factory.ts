/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import { Signer, utils, Contract, ContractFactory, Overrides } from "ethers";
import type { Provider, TransactionRequest } from "@ethersproject/providers";
import type { PromiseOrValue } from "../../../common";
import type {
  Xtokens,
  XtokensInterface,
} from "../../../contracts/xtokens/Xtokens";

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
        indexed: false,
        internalType: "bytes",
        name: "assets",
        type: "bytes",
      },
      {
        indexed: false,
        internalType: "bytes",
        name: "fee",
        type: "bytes",
      },
      {
        indexed: false,
        internalType: "bytes",
        name: "dest",
        type: "bytes",
      },
    ],
    name: "TransferredMultiAssets",
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
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
      {
        internalType: "bytes",
        name: "dest",
        type: "bytes",
      },
      {
        internalType: "bytes",
        name: "weight",
        type: "bytes",
      },
    ],
    name: "transfer",
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
        internalType: "bytes",
        name: "asset",
        type: "bytes",
      },
      {
        internalType: "bytes",
        name: "dest",
        type: "bytes",
      },
      {
        internalType: "bytes",
        name: "weight",
        type: "bytes",
      },
    ],
    name: "transferMultiAsset",
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
        internalType: "bytes",
        name: "asset",
        type: "bytes",
      },
      {
        internalType: "bytes",
        name: "fee",
        type: "bytes",
      },
      {
        internalType: "bytes",
        name: "dest",
        type: "bytes",
      },
      {
        internalType: "bytes",
        name: "weight",
        type: "bytes",
      },
    ],
    name: "transferMultiAssetWithFee",
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
        internalType: "bytes",
        name: "assets",
        type: "bytes",
      },
      {
        internalType: "uint32",
        name: "feeItem",
        type: "uint32",
      },
      {
        internalType: "bytes",
        name: "dest",
        type: "bytes",
      },
      {
        internalType: "bytes",
        name: "weight",
        type: "bytes",
      },
    ],
    name: "transferMultiAssets",
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
        components: [
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
        internalType: "struct IXtokens.Currency[]",
        name: "currencies",
        type: "tuple[]",
      },
      {
        internalType: "uint32",
        name: "feeItem",
        type: "uint32",
      },
      {
        internalType: "bytes",
        name: "dest",
        type: "bytes",
      },
      {
        internalType: "bytes",
        name: "weight",
        type: "bytes",
      },
    ],
    name: "transferMultiCurrencies",
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
      {
        internalType: "uint256",
        name: "fee",
        type: "uint256",
      },
      {
        internalType: "bytes",
        name: "dest",
        type: "bytes",
      },
      {
        internalType: "bytes",
        name: "weight",
        type: "bytes",
      },
    ],
    name: "transferWithFee",
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
  "0x608060405234801561001057600080fd5b50611a40806100206000396000f3fe608060405234801561001057600080fd5b50600436106100725760003560e01c8063b8923b8e11610050578063b8923b8e146100c4578063d2c22a5d146100d7578063e9b07bbf146100ea57600080fd5b80631cbdd728146100775780639b7da4cd1461009e578063b59713bb146100b1575b600080fd5b61008a6100853660046112dd565b6100fd565b604051901515815260200160405180910390f35b61008a6100ac36600461140c565b6103ca565b61008a6100bf36600461147e565b61062d565b61008a6100d23660046114c6565b610825565b61008a6100e536600461154e565b610aea565b61008a6100f83660046115d6565b610ec2565b60008085511161016e576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152601c60248201527f58746f6b656e733a2063757272656e6369657320697320656d7074790000000060448201526064015b60405180910390fd5b60008351116101d9576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152601660248201527f58746f6b656e733a206465737420697320656d707479000000000000000000006044820152606401610165565b6000825111610244576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152601860248201527f58746f6b656e733a2077656967687420697320656d70747900000000000000006044820152606401610165565b60008061040b73ffffffffffffffffffffffffffffffffffffffff163388888888604051602401610279959493929190611687565b604080517fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffe08184030181529181526020820180517bffffffffffffffffffffffffffffffffffffffffffffffffffffffff167fcfea5c4600000000000000000000000000000000000000000000000000000000179052516102fa919061172f565b6000604051808303816000865af19150503d8060008114610337576040519150601f19603f3d011682016040523d82523d6000602084013e61033c565b606091505b5090925090508161034e573d60208201fd5b600080828060200190518101906103659190611798565b915091503373ffffffffffffffffffffffffffffffffffffffff167f8c8f3b85dfdec34e2df9382254915e6a5ad375e80488943abecb8b3dfa9e3b1883838a6040516103b3939291906117fc565b60405180910390a250600198975050505050505050565b600080855111610436576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152601760248201527f58746f6b656e733a20617373657420697320656d7074790000000000000000006044820152606401610165565b60008451116104a1576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152601560248201527f58746f6b656e733a2066656520697320656d70747900000000000000000000006044820152606401610165565b600083511161050c576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152601660248201527f58746f6b656e733a206465737420697320656d707479000000000000000000006044820152606401610165565b6000825111610577576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152601860248201527f58746f6b656e733a2077656967687420697320656d70747900000000000000006044820152606401610165565b60008061040b73ffffffffffffffffffffffffffffffffffffffff1633888888886040516024016105ac95949392919061183f565b604080517fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffe08184030181529181526020820180517bffffffffffffffffffffffffffffffffffffffffffffffffffffffff167fe26aa26400000000000000000000000000000000000000000000000000000000179052516102fa919061172f565b600080855111610699576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152601860248201527f58746f6b656e733a2061737365747320697320656d70747900000000000000006044820152606401610165565b6000835111610704576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152601660248201527f58746f6b656e733a206465737420697320656d707479000000000000000000006044820152606401610165565b600082511161076f576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152601860248201527f58746f6b656e733a2077656967687420697320656d70747900000000000000006044820152606401610165565b60008061040b73ffffffffffffffffffffffffffffffffffffffff1633888888886040516024016107a49594939291906118a8565b604080517fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffe08184030181529181526020820180517bffffffffffffffffffffffffffffffffffffffffffffffffffffffff167f97ed2b1500000000000000000000000000000000000000000000000000000000179052516102fa919061172f565b600080845111610891576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152601760248201527f58746f6b656e733a20617373657420697320656d7074790000000000000000006044820152606401610165565b60008351116108fc576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152601660248201527f58746f6b656e733a206465737420697320656d707479000000000000000000006044820152606401610165565b6000825111610967576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152601860248201527f58746f6b656e733a2077656967687420697320656d70747900000000000000006044820152606401610165565b60008061040b73ffffffffffffffffffffffffffffffffffffffff163387878760405160240161099a94939291906118f5565b604080517fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffe08184030181529181526020820180517bffffffffffffffffffffffffffffffffffffffffffffffffffffffff167f948796cf0000000000000000000000000000000000000000000000000000000017905251610a1b919061172f565b6000604051808303816000865af19150503d8060008114610a58576040519150601f19603f3d011682016040523d82523d6000602084013e610a5d565b606091505b50909250905081610a6f573d60208201fd5b60008082806020019051810190610a869190611798565b915091503373ffffffffffffffffffffffffffffffffffffffff167f8c8f3b85dfdec34e2df9382254915e6a5ad375e80488943abecb8b3dfa9e3b1883838a604051610ad4939291906117fc565b60405180910390a2506001979650505050505050565b600073ffffffffffffffffffffffffffffffffffffffff8616610b8f576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152602360248201527f58746f6b656e733a2063757272656e63794964206973207a65726f206164647260448201527f65737300000000000000000000000000000000000000000000000000000000006064820152608401610165565b60008511610bf9576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152601760248201527f58746f6b656e733a20616d6f756e74206973207a65726f0000000000000000006044820152606401610165565b60008411610c63576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152601460248201527f58746f6b656e733a20666565206973207a65726f0000000000000000000000006044820152606401610165565b6000835111610cce576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152601660248201527f58746f6b656e733a206465737420697320656d707479000000000000000000006044820152606401610165565b6000825111610d39576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152601860248201527f58746f6b656e733a2077656967687420697320656d70747900000000000000006044820152606401610165565b60008061040b73ffffffffffffffffffffffffffffffffffffffff16338989898989604051602401610d7096959493929190611955565b604080517fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffe08184030181529181526020820180517bffffffffffffffffffffffffffffffffffffffffffffffffffffffff167f61c3f6b20000000000000000000000000000000000000000000000000000000017905251610df1919061172f565b6000604051808303816000865af19150503d8060008114610e2e576040519150601f19603f3d011682016040523d82523d6000602084013e610e33565b606091505b50909250905081610e45573d60208201fd5b60008082806020019051810190610e5c9190611798565b915091503373ffffffffffffffffffffffffffffffffffffffff167f8c8f3b85dfdec34e2df9382254915e6a5ad375e80488943abecb8b3dfa9e3b1883838a604051610eaa939291906117fc565b60405180910390a25060019998505050505050505050565b600073ffffffffffffffffffffffffffffffffffffffff8516610f67576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152602360248201527f58746f6b656e733a2063757272656e63794964206973207a65726f206164647260448201527f65737300000000000000000000000000000000000000000000000000000000006064820152608401610165565b60008411610fd1576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152601760248201527f58746f6b656e733a20616d6f756e74206973207a65726f0000000000000000006044820152606401610165565b600083511161103c576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152601660248201527f58746f6b656e733a206465737420697320656d707479000000000000000000006044820152606401610165565b60008251116110a7576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152601860248201527f58746f6b656e733a2077656967687420697320656d70747900000000000000006044820152606401610165565b60008061040b73ffffffffffffffffffffffffffffffffffffffff1633888888886040516024016110dc9594939291906119b9565b604080517fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffe08184030181529181526020820180517bffffffffffffffffffffffffffffffffffffffffffffffffffffffff167fc78fed0400000000000000000000000000000000000000000000000000000000179052516102fa919061172f565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052604160045260246000fd5b6040805190810167ffffffffffffffff811182821017156111af576111af61115d565b60405290565b604051601f82017fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffe016810167ffffffffffffffff811182821017156111fc576111fc61115d565b604052919050565b803573ffffffffffffffffffffffffffffffffffffffff8116811461122857600080fd5b919050565b803563ffffffff8116811461122857600080fd5b600067ffffffffffffffff82111561125b5761125b61115d565b50601f017fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffe01660200190565b600082601f83011261129857600080fd5b81356112ab6112a682611241565b6111b5565b8181528460208386010111156112c057600080fd5b816020850160208301376000918101602001919091529392505050565b600080600080608085870312156112f357600080fd5b843567ffffffffffffffff8082111561130b57600080fd5b818701915087601f83011261131f57600080fd5b81356020828211156113335761133361115d565b611341818360051b016111b5565b82815260069290921b8401810191818101908b84111561136057600080fd5b948201945b838610156113aa576040868d03121561137e5760008081fd5b61138661118c565b61138f87611204565b81528684013584820152825260409095019490820190611365565b98506113b9905089820161122d565b9650505060408701359150808211156113d157600080fd5b6113dd88838901611287565b935060608701359150808211156113f357600080fd5b5061140087828801611287565b91505092959194509250565b6000806000806080858703121561142257600080fd5b843567ffffffffffffffff8082111561143a57600080fd5b61144688838901611287565b9550602087013591508082111561145c57600080fd5b61146888838901611287565b945060408701359150808211156113d157600080fd5b6000806000806080858703121561149457600080fd5b843567ffffffffffffffff808211156114ac57600080fd5b6114b888838901611287565b95506114686020880161122d565b6000806000606084860312156114db57600080fd5b833567ffffffffffffffff808211156114f357600080fd5b6114ff87838801611287565b9450602086013591508082111561151557600080fd5b61152187838801611287565b9350604086013591508082111561153757600080fd5b5061154486828701611287565b9150509250925092565b600080600080600060a0868803121561156657600080fd5b61156f86611204565b94506020860135935060408601359250606086013567ffffffffffffffff8082111561159a57600080fd5b6115a689838a01611287565b935060808801359150808211156115bc57600080fd5b506115c988828901611287565b9150509295509295909350565b600080600080608085870312156115ec57600080fd5b6115f585611204565b935060208501359250604085013567ffffffffffffffff808211156113d157600080fd5b60005b8381101561163457818101518382015260200161161c565b50506000910152565b60008151808452611655816020860160208601611619565b601f017fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffe0169290920160200192915050565b600060a0820173ffffffffffffffffffffffffffffffffffffffff8089168452602060a08186015282895180855260c087019150828b01945060005b818110156116ec57855180518616845284015184840152948301946040909201916001016116c3565b505063ffffffff89166040870152858103606087015261170c818961163d565b93505050508281036080840152611723818561163d565b98975050505050505050565b60008251611741818460208701611619565b9190910192915050565b600082601f83011261175c57600080fd5b815161176a6112a682611241565b81815284602083860101111561177f57600080fd5b611790826020830160208701611619565b949350505050565b600080604083850312156117ab57600080fd5b825167ffffffffffffffff808211156117c357600080fd5b6117cf8683870161174b565b935060208501519150808211156117e557600080fd5b506117f28582860161174b565b9150509250929050565b60608152600061180f606083018661163d565b8281036020840152611821818661163d565b90508281036040840152611835818561163d565b9695505050505050565b73ffffffffffffffffffffffffffffffffffffffff8616815260a06020820152600061186e60a083018761163d565b8281036040840152611880818761163d565b90508281036060840152611894818661163d565b90508281036080840152611723818561163d565b73ffffffffffffffffffffffffffffffffffffffff8616815260a0602082015260006118d760a083018761163d565b63ffffffff861660408401528281036060840152611894818661163d565b73ffffffffffffffffffffffffffffffffffffffff85168152608060208201526000611924608083018661163d565b8281036040840152611936818661163d565b9050828103606084015261194a818561163d565b979650505050505050565b600073ffffffffffffffffffffffffffffffffffffffff808916835280881660208401525085604083015284606083015260c0608083015261199a60c083018561163d565b82810360a08401526119ac818561163d565b9998505050505050505050565b600073ffffffffffffffffffffffffffffffffffffffff808816835280871660208401525084604083015260a060608301526119f860a083018561163d565b8281036080840152611723818561163d56fea26469706673582212202418ab89c00593b6c7198b9763e01b5dd4da36139b54dfa547341c75f1361c0564736f6c63430008120033";

type XtokensConstructorParams =
  | [signer?: Signer]
  | ConstructorParameters<typeof ContractFactory>;

const isSuperArgs = (
  xs: XtokensConstructorParams
): xs is ConstructorParameters<typeof ContractFactory> => xs.length > 1;

export class Xtokens__factory extends ContractFactory {
  constructor(...args: XtokensConstructorParams) {
    if (isSuperArgs(args)) {
      super(...args);
    } else {
      super(_abi, _bytecode, args[0]);
    }
  }

  override deploy(
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<Xtokens> {
    return super.deploy(overrides || {}) as Promise<Xtokens>;
  }
  override getDeployTransaction(
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): TransactionRequest {
    return super.getDeployTransaction(overrides || {});
  }
  override attach(address: string): Xtokens {
    return super.attach(address) as Xtokens;
  }
  override connect(signer: Signer): Xtokens__factory {
    return super.connect(signer) as Xtokens__factory;
  }

  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): XtokensInterface {
    return new utils.Interface(_abi) as XtokensInterface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): Xtokens {
    return new Contract(address, _abi, signerOrProvider) as Xtokens;
  }
}
