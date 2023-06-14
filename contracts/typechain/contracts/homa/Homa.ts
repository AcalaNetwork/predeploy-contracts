/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import type {
  BaseContract,
  BigNumber,
  BigNumberish,
  BytesLike,
  CallOverrides,
  ContractTransaction,
  Overrides,
  PopulatedTransaction,
  Signer,
  utils,
} from "ethers";
import type {
  FunctionFragment,
  Result,
  EventFragment,
} from "@ethersproject/abi";
import type { Listener, Provider } from "@ethersproject/providers";
import type {
  TypedEventFilter,
  TypedEvent,
  TypedListener,
  OnEvent,
  PromiseOrValue,
} from "../../common";

export interface HomaInterface extends utils.Interface {
  functions: {
    "getCommissionRate()": FunctionFragment;
    "getEstimatedRewardRate()": FunctionFragment;
    "getExchangeRate()": FunctionFragment;
    "getFastMatchFee()": FunctionFragment;
    "mint(uint256)": FunctionFragment;
    "requestRedeem(uint256,bool)": FunctionFragment;
  };

  getFunction(
    nameOrSignatureOrTopic:
      | "getCommissionRate"
      | "getEstimatedRewardRate"
      | "getExchangeRate"
      | "getFastMatchFee"
      | "mint"
      | "requestRedeem"
  ): FunctionFragment;

  encodeFunctionData(
    functionFragment: "getCommissionRate",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "getEstimatedRewardRate",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "getExchangeRate",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "getFastMatchFee",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "mint",
    values: [PromiseOrValue<BigNumberish>]
  ): string;
  encodeFunctionData(
    functionFragment: "requestRedeem",
    values: [PromiseOrValue<BigNumberish>, PromiseOrValue<boolean>]
  ): string;

  decodeFunctionResult(
    functionFragment: "getCommissionRate",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "getEstimatedRewardRate",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "getExchangeRate",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "getFastMatchFee",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "mint", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "requestRedeem",
    data: BytesLike
  ): Result;

  events: {
    "Minted(address,uint256)": EventFragment;
    "RequestedRedeem(address,uint256,bool)": EventFragment;
  };

  getEvent(nameOrSignatureOrTopic: "Minted"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "RequestedRedeem"): EventFragment;
}

export interface MintedEventObject {
  sender: string;
  amount: BigNumber;
}
export type MintedEvent = TypedEvent<[string, BigNumber], MintedEventObject>;

export type MintedEventFilter = TypedEventFilter<MintedEvent>;

export interface RequestedRedeemEventObject {
  sender: string;
  amount: BigNumber;
  fastMatch: boolean;
}
export type RequestedRedeemEvent = TypedEvent<
  [string, BigNumber, boolean],
  RequestedRedeemEventObject
>;

export type RequestedRedeemEventFilter = TypedEventFilter<RequestedRedeemEvent>;

export interface Homa extends BaseContract {
  connect(signerOrProvider: Signer | Provider | string): this;
  attach(addressOrName: string): this;
  deployed(): Promise<this>;

  interface: HomaInterface;

  queryFilter<TEvent extends TypedEvent>(
    event: TypedEventFilter<TEvent>,
    fromBlockOrBlockhash?: string | number | undefined,
    toBlock?: string | number | undefined
  ): Promise<Array<TEvent>>;

  listeners<TEvent extends TypedEvent>(
    eventFilter?: TypedEventFilter<TEvent>
  ): Array<TypedListener<TEvent>>;
  listeners(eventName?: string): Array<Listener>;
  removeAllListeners<TEvent extends TypedEvent>(
    eventFilter: TypedEventFilter<TEvent>
  ): this;
  removeAllListeners(eventName?: string): this;
  off: OnEvent<this>;
  on: OnEvent<this>;
  once: OnEvent<this>;
  removeListener: OnEvent<this>;

  functions: {
    getCommissionRate(overrides?: CallOverrides): Promise<[BigNumber]>;

    getEstimatedRewardRate(overrides?: CallOverrides): Promise<[BigNumber]>;

    getExchangeRate(overrides?: CallOverrides): Promise<[BigNumber]>;

    getFastMatchFee(overrides?: CallOverrides): Promise<[BigNumber]>;

    mint(
      mintAmount: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    requestRedeem(
      redeemAmount: PromiseOrValue<BigNumberish>,
      fastMatch: PromiseOrValue<boolean>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;
  };

  getCommissionRate(overrides?: CallOverrides): Promise<BigNumber>;

  getEstimatedRewardRate(overrides?: CallOverrides): Promise<BigNumber>;

  getExchangeRate(overrides?: CallOverrides): Promise<BigNumber>;

  getFastMatchFee(overrides?: CallOverrides): Promise<BigNumber>;

  mint(
    mintAmount: PromiseOrValue<BigNumberish>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  requestRedeem(
    redeemAmount: PromiseOrValue<BigNumberish>,
    fastMatch: PromiseOrValue<boolean>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  callStatic: {
    getCommissionRate(overrides?: CallOverrides): Promise<BigNumber>;

    getEstimatedRewardRate(overrides?: CallOverrides): Promise<BigNumber>;

    getExchangeRate(overrides?: CallOverrides): Promise<BigNumber>;

    getFastMatchFee(overrides?: CallOverrides): Promise<BigNumber>;

    mint(
      mintAmount: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<boolean>;

    requestRedeem(
      redeemAmount: PromiseOrValue<BigNumberish>,
      fastMatch: PromiseOrValue<boolean>,
      overrides?: CallOverrides
    ): Promise<boolean>;
  };

  filters: {
    "Minted(address,uint256)"(
      sender?: PromiseOrValue<string> | null,
      amount?: null
    ): MintedEventFilter;
    Minted(
      sender?: PromiseOrValue<string> | null,
      amount?: null
    ): MintedEventFilter;

    "RequestedRedeem(address,uint256,bool)"(
      sender?: PromiseOrValue<string> | null,
      amount?: null,
      fastMatch?: null
    ): RequestedRedeemEventFilter;
    RequestedRedeem(
      sender?: PromiseOrValue<string> | null,
      amount?: null,
      fastMatch?: null
    ): RequestedRedeemEventFilter;
  };

  estimateGas: {
    getCommissionRate(overrides?: CallOverrides): Promise<BigNumber>;

    getEstimatedRewardRate(overrides?: CallOverrides): Promise<BigNumber>;

    getExchangeRate(overrides?: CallOverrides): Promise<BigNumber>;

    getFastMatchFee(overrides?: CallOverrides): Promise<BigNumber>;

    mint(
      mintAmount: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    requestRedeem(
      redeemAmount: PromiseOrValue<BigNumberish>,
      fastMatch: PromiseOrValue<boolean>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;
  };

  populateTransaction: {
    getCommissionRate(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    getEstimatedRewardRate(
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    getExchangeRate(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    getFastMatchFee(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    mint(
      mintAmount: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    requestRedeem(
      redeemAmount: PromiseOrValue<BigNumberish>,
      fastMatch: PromiseOrValue<boolean>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;
  };
}