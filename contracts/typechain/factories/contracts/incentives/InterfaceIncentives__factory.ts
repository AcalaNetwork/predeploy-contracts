/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import { Contract, Signer, utils } from "ethers";
import type { Provider } from "@ethersproject/providers";
import type {
  InterfaceIncentives,
  InterfaceIncentivesInterface,
} from "../../../contracts/incentives/InterfaceIncentives";

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

export class InterfaceIncentives__factory {
  static readonly abi = _abi;
  static createInterface(): InterfaceIncentivesInterface {
    return new utils.Interface(_abi) as InterfaceIncentivesInterface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): InterfaceIncentives {
    return new Contract(address, _abi, signerOrProvider) as InterfaceIncentives;
  }
}