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

export declare namespace IXtokens {
  export type CurrencyStruct = {
    currencyId: PromiseOrValue<string>;
    amount: PromiseOrValue<BigNumberish>;
  };

  export type CurrencyStructOutput = [string, BigNumber] & {
    currencyId: string;
    amount: BigNumber;
  };
}

export interface IXtokensInterface extends utils.Interface {
  functions: {
    "transfer(address,uint256,bytes,bytes)": FunctionFragment;
    "transferMultiAsset(bytes,bytes,bytes)": FunctionFragment;
    "transferMultiAssetWithFee(bytes,bytes,bytes,bytes)": FunctionFragment;
    "transferMultiAssets(bytes,uint32,bytes,bytes)": FunctionFragment;
    "transferMultiCurrencies((address,uint256)[],uint32,bytes,bytes)": FunctionFragment;
    "transferWithFee(address,uint256,uint256,bytes,bytes)": FunctionFragment;
  };

  getFunction(
    nameOrSignatureOrTopic:
      | "transfer"
      | "transferMultiAsset"
      | "transferMultiAssetWithFee"
      | "transferMultiAssets"
      | "transferMultiCurrencies"
      | "transferWithFee"
  ): FunctionFragment;

  encodeFunctionData(
    functionFragment: "transfer",
    values: [
      PromiseOrValue<string>,
      PromiseOrValue<BigNumberish>,
      PromiseOrValue<BytesLike>,
      PromiseOrValue<BytesLike>
    ]
  ): string;
  encodeFunctionData(
    functionFragment: "transferMultiAsset",
    values: [
      PromiseOrValue<BytesLike>,
      PromiseOrValue<BytesLike>,
      PromiseOrValue<BytesLike>
    ]
  ): string;
  encodeFunctionData(
    functionFragment: "transferMultiAssetWithFee",
    values: [
      PromiseOrValue<BytesLike>,
      PromiseOrValue<BytesLike>,
      PromiseOrValue<BytesLike>,
      PromiseOrValue<BytesLike>
    ]
  ): string;
  encodeFunctionData(
    functionFragment: "transferMultiAssets",
    values: [
      PromiseOrValue<BytesLike>,
      PromiseOrValue<BigNumberish>,
      PromiseOrValue<BytesLike>,
      PromiseOrValue<BytesLike>
    ]
  ): string;
  encodeFunctionData(
    functionFragment: "transferMultiCurrencies",
    values: [
      IXtokens.CurrencyStruct[],
      PromiseOrValue<BigNumberish>,
      PromiseOrValue<BytesLike>,
      PromiseOrValue<BytesLike>
    ]
  ): string;
  encodeFunctionData(
    functionFragment: "transferWithFee",
    values: [
      PromiseOrValue<string>,
      PromiseOrValue<BigNumberish>,
      PromiseOrValue<BigNumberish>,
      PromiseOrValue<BytesLike>,
      PromiseOrValue<BytesLike>
    ]
  ): string;

  decodeFunctionResult(functionFragment: "transfer", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "transferMultiAsset",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "transferMultiAssetWithFee",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "transferMultiAssets",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "transferMultiCurrencies",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "transferWithFee",
    data: BytesLike
  ): Result;

  events: {
    "TransferredMultiAssets(address,bytes,bytes,bytes)": EventFragment;
  };

  getEvent(nameOrSignatureOrTopic: "TransferredMultiAssets"): EventFragment;
}

export interface TransferredMultiAssetsEventObject {
  sender: string;
  assets: string;
  fee: string;
  dest: string;
}
export type TransferredMultiAssetsEvent = TypedEvent<
  [string, string, string, string],
  TransferredMultiAssetsEventObject
>;

export type TransferredMultiAssetsEventFilter =
  TypedEventFilter<TransferredMultiAssetsEvent>;

export interface IXtokens extends BaseContract {
  connect(signerOrProvider: Signer | Provider | string): this;
  attach(addressOrName: string): this;
  deployed(): Promise<this>;

  interface: IXtokensInterface;

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
    transfer(
      currencyId: PromiseOrValue<string>,
      amount: PromiseOrValue<BigNumberish>,
      dest: PromiseOrValue<BytesLike>,
      weight: PromiseOrValue<BytesLike>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    transferMultiAsset(
      asset: PromiseOrValue<BytesLike>,
      dest: PromiseOrValue<BytesLike>,
      weight: PromiseOrValue<BytesLike>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    transferMultiAssetWithFee(
      asset: PromiseOrValue<BytesLike>,
      fee: PromiseOrValue<BytesLike>,
      dest: PromiseOrValue<BytesLike>,
      weight: PromiseOrValue<BytesLike>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    transferMultiAssets(
      assets: PromiseOrValue<BytesLike>,
      feeItem: PromiseOrValue<BigNumberish>,
      dest: PromiseOrValue<BytesLike>,
      weight: PromiseOrValue<BytesLike>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    transferMultiCurrencies(
      currencies: IXtokens.CurrencyStruct[],
      feeItem: PromiseOrValue<BigNumberish>,
      dest: PromiseOrValue<BytesLike>,
      weight: PromiseOrValue<BytesLike>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    transferWithFee(
      currencyId: PromiseOrValue<string>,
      amount: PromiseOrValue<BigNumberish>,
      fee: PromiseOrValue<BigNumberish>,
      dest: PromiseOrValue<BytesLike>,
      weight: PromiseOrValue<BytesLike>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;
  };

  transfer(
    currencyId: PromiseOrValue<string>,
    amount: PromiseOrValue<BigNumberish>,
    dest: PromiseOrValue<BytesLike>,
    weight: PromiseOrValue<BytesLike>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  transferMultiAsset(
    asset: PromiseOrValue<BytesLike>,
    dest: PromiseOrValue<BytesLike>,
    weight: PromiseOrValue<BytesLike>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  transferMultiAssetWithFee(
    asset: PromiseOrValue<BytesLike>,
    fee: PromiseOrValue<BytesLike>,
    dest: PromiseOrValue<BytesLike>,
    weight: PromiseOrValue<BytesLike>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  transferMultiAssets(
    assets: PromiseOrValue<BytesLike>,
    feeItem: PromiseOrValue<BigNumberish>,
    dest: PromiseOrValue<BytesLike>,
    weight: PromiseOrValue<BytesLike>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  transferMultiCurrencies(
    currencies: IXtokens.CurrencyStruct[],
    feeItem: PromiseOrValue<BigNumberish>,
    dest: PromiseOrValue<BytesLike>,
    weight: PromiseOrValue<BytesLike>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  transferWithFee(
    currencyId: PromiseOrValue<string>,
    amount: PromiseOrValue<BigNumberish>,
    fee: PromiseOrValue<BigNumberish>,
    dest: PromiseOrValue<BytesLike>,
    weight: PromiseOrValue<BytesLike>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  callStatic: {
    transfer(
      currencyId: PromiseOrValue<string>,
      amount: PromiseOrValue<BigNumberish>,
      dest: PromiseOrValue<BytesLike>,
      weight: PromiseOrValue<BytesLike>,
      overrides?: CallOverrides
    ): Promise<boolean>;

    transferMultiAsset(
      asset: PromiseOrValue<BytesLike>,
      dest: PromiseOrValue<BytesLike>,
      weight: PromiseOrValue<BytesLike>,
      overrides?: CallOverrides
    ): Promise<boolean>;

    transferMultiAssetWithFee(
      asset: PromiseOrValue<BytesLike>,
      fee: PromiseOrValue<BytesLike>,
      dest: PromiseOrValue<BytesLike>,
      weight: PromiseOrValue<BytesLike>,
      overrides?: CallOverrides
    ): Promise<boolean>;

    transferMultiAssets(
      assets: PromiseOrValue<BytesLike>,
      feeItem: PromiseOrValue<BigNumberish>,
      dest: PromiseOrValue<BytesLike>,
      weight: PromiseOrValue<BytesLike>,
      overrides?: CallOverrides
    ): Promise<boolean>;

    transferMultiCurrencies(
      currencies: IXtokens.CurrencyStruct[],
      feeItem: PromiseOrValue<BigNumberish>,
      dest: PromiseOrValue<BytesLike>,
      weight: PromiseOrValue<BytesLike>,
      overrides?: CallOverrides
    ): Promise<boolean>;

    transferWithFee(
      currencyId: PromiseOrValue<string>,
      amount: PromiseOrValue<BigNumberish>,
      fee: PromiseOrValue<BigNumberish>,
      dest: PromiseOrValue<BytesLike>,
      weight: PromiseOrValue<BytesLike>,
      overrides?: CallOverrides
    ): Promise<boolean>;
  };

  filters: {
    "TransferredMultiAssets(address,bytes,bytes,bytes)"(
      sender?: PromiseOrValue<string> | null,
      assets?: null,
      fee?: null,
      dest?: null
    ): TransferredMultiAssetsEventFilter;
    TransferredMultiAssets(
      sender?: PromiseOrValue<string> | null,
      assets?: null,
      fee?: null,
      dest?: null
    ): TransferredMultiAssetsEventFilter;
  };

  estimateGas: {
    transfer(
      currencyId: PromiseOrValue<string>,
      amount: PromiseOrValue<BigNumberish>,
      dest: PromiseOrValue<BytesLike>,
      weight: PromiseOrValue<BytesLike>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    transferMultiAsset(
      asset: PromiseOrValue<BytesLike>,
      dest: PromiseOrValue<BytesLike>,
      weight: PromiseOrValue<BytesLike>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    transferMultiAssetWithFee(
      asset: PromiseOrValue<BytesLike>,
      fee: PromiseOrValue<BytesLike>,
      dest: PromiseOrValue<BytesLike>,
      weight: PromiseOrValue<BytesLike>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    transferMultiAssets(
      assets: PromiseOrValue<BytesLike>,
      feeItem: PromiseOrValue<BigNumberish>,
      dest: PromiseOrValue<BytesLike>,
      weight: PromiseOrValue<BytesLike>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    transferMultiCurrencies(
      currencies: IXtokens.CurrencyStruct[],
      feeItem: PromiseOrValue<BigNumberish>,
      dest: PromiseOrValue<BytesLike>,
      weight: PromiseOrValue<BytesLike>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    transferWithFee(
      currencyId: PromiseOrValue<string>,
      amount: PromiseOrValue<BigNumberish>,
      fee: PromiseOrValue<BigNumberish>,
      dest: PromiseOrValue<BytesLike>,
      weight: PromiseOrValue<BytesLike>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;
  };

  populateTransaction: {
    transfer(
      currencyId: PromiseOrValue<string>,
      amount: PromiseOrValue<BigNumberish>,
      dest: PromiseOrValue<BytesLike>,
      weight: PromiseOrValue<BytesLike>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    transferMultiAsset(
      asset: PromiseOrValue<BytesLike>,
      dest: PromiseOrValue<BytesLike>,
      weight: PromiseOrValue<BytesLike>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    transferMultiAssetWithFee(
      asset: PromiseOrValue<BytesLike>,
      fee: PromiseOrValue<BytesLike>,
      dest: PromiseOrValue<BytesLike>,
      weight: PromiseOrValue<BytesLike>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    transferMultiAssets(
      assets: PromiseOrValue<BytesLike>,
      feeItem: PromiseOrValue<BigNumberish>,
      dest: PromiseOrValue<BytesLike>,
      weight: PromiseOrValue<BytesLike>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    transferMultiCurrencies(
      currencies: IXtokens.CurrencyStruct[],
      feeItem: PromiseOrValue<BigNumberish>,
      dest: PromiseOrValue<BytesLike>,
      weight: PromiseOrValue<BytesLike>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    transferWithFee(
      currencyId: PromiseOrValue<string>,
      amount: PromiseOrValue<BigNumberish>,
      fee: PromiseOrValue<BigNumberish>,
      dest: PromiseOrValue<BytesLike>,
      weight: PromiseOrValue<BytesLike>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;
  };
}
