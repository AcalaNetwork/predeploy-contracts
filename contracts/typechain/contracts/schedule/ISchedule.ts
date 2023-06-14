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

export interface IScheduleInterface extends utils.Interface {
  functions: {
    "cancelCall(bytes)": FunctionFragment;
    "rescheduleCall(uint256,bytes)": FunctionFragment;
    "scheduleCall(address,uint256,uint256,uint256,uint256,bytes)": FunctionFragment;
  };

  getFunction(
    nameOrSignatureOrTopic: "cancelCall" | "rescheduleCall" | "scheduleCall"
  ): FunctionFragment;

  encodeFunctionData(
    functionFragment: "cancelCall",
    values: [PromiseOrValue<BytesLike>]
  ): string;
  encodeFunctionData(
    functionFragment: "rescheduleCall",
    values: [PromiseOrValue<BigNumberish>, PromiseOrValue<BytesLike>]
  ): string;
  encodeFunctionData(
    functionFragment: "scheduleCall",
    values: [
      PromiseOrValue<string>,
      PromiseOrValue<BigNumberish>,
      PromiseOrValue<BigNumberish>,
      PromiseOrValue<BigNumberish>,
      PromiseOrValue<BigNumberish>,
      PromiseOrValue<BytesLike>
    ]
  ): string;

  decodeFunctionResult(functionFragment: "cancelCall", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "rescheduleCall",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "scheduleCall",
    data: BytesLike
  ): Result;

  events: {
    "CanceledCall(address,bytes)": EventFragment;
    "RescheduledCall(address,bytes)": EventFragment;
    "ScheduledCall(address,address,bytes)": EventFragment;
  };

  getEvent(nameOrSignatureOrTopic: "CanceledCall"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "RescheduledCall"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "ScheduledCall"): EventFragment;
}

export interface CanceledCallEventObject {
  sender: string;
  taskId: string;
}
export type CanceledCallEvent = TypedEvent<
  [string, string],
  CanceledCallEventObject
>;

export type CanceledCallEventFilter = TypedEventFilter<CanceledCallEvent>;

export interface RescheduledCallEventObject {
  sender: string;
  taskId: string;
}
export type RescheduledCallEvent = TypedEvent<
  [string, string],
  RescheduledCallEventObject
>;

export type RescheduledCallEventFilter = TypedEventFilter<RescheduledCallEvent>;

export interface ScheduledCallEventObject {
  sender: string;
  contractAddress: string;
  taskId: string;
}
export type ScheduledCallEvent = TypedEvent<
  [string, string, string],
  ScheduledCallEventObject
>;

export type ScheduledCallEventFilter = TypedEventFilter<ScheduledCallEvent>;

export interface ISchedule extends BaseContract {
  connect(signerOrProvider: Signer | Provider | string): this;
  attach(addressOrName: string): this;
  deployed(): Promise<this>;

  interface: IScheduleInterface;

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
    cancelCall(
      taskId: PromiseOrValue<BytesLike>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    rescheduleCall(
      minDelay: PromiseOrValue<BigNumberish>,
      taskId: PromiseOrValue<BytesLike>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    scheduleCall(
      contractAddress: PromiseOrValue<string>,
      value: PromiseOrValue<BigNumberish>,
      gasLimit: PromiseOrValue<BigNumberish>,
      storageLimit: PromiseOrValue<BigNumberish>,
      minDelay: PromiseOrValue<BigNumberish>,
      inputData: PromiseOrValue<BytesLike>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;
  };

  cancelCall(
    taskId: PromiseOrValue<BytesLike>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  rescheduleCall(
    minDelay: PromiseOrValue<BigNumberish>,
    taskId: PromiseOrValue<BytesLike>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  scheduleCall(
    contractAddress: PromiseOrValue<string>,
    value: PromiseOrValue<BigNumberish>,
    gasLimit: PromiseOrValue<BigNumberish>,
    storageLimit: PromiseOrValue<BigNumberish>,
    minDelay: PromiseOrValue<BigNumberish>,
    inputData: PromiseOrValue<BytesLike>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  callStatic: {
    cancelCall(
      taskId: PromiseOrValue<BytesLike>,
      overrides?: CallOverrides
    ): Promise<boolean>;

    rescheduleCall(
      minDelay: PromiseOrValue<BigNumberish>,
      taskId: PromiseOrValue<BytesLike>,
      overrides?: CallOverrides
    ): Promise<boolean>;

    scheduleCall(
      contractAddress: PromiseOrValue<string>,
      value: PromiseOrValue<BigNumberish>,
      gasLimit: PromiseOrValue<BigNumberish>,
      storageLimit: PromiseOrValue<BigNumberish>,
      minDelay: PromiseOrValue<BigNumberish>,
      inputData: PromiseOrValue<BytesLike>,
      overrides?: CallOverrides
    ): Promise<string>;
  };

  filters: {
    "CanceledCall(address,bytes)"(
      sender?: PromiseOrValue<string> | null,
      taskId?: null
    ): CanceledCallEventFilter;
    CanceledCall(
      sender?: PromiseOrValue<string> | null,
      taskId?: null
    ): CanceledCallEventFilter;

    "RescheduledCall(address,bytes)"(
      sender?: PromiseOrValue<string> | null,
      taskId?: null
    ): RescheduledCallEventFilter;
    RescheduledCall(
      sender?: PromiseOrValue<string> | null,
      taskId?: null
    ): RescheduledCallEventFilter;

    "ScheduledCall(address,address,bytes)"(
      sender?: PromiseOrValue<string> | null,
      contractAddress?: PromiseOrValue<string> | null,
      taskId?: null
    ): ScheduledCallEventFilter;
    ScheduledCall(
      sender?: PromiseOrValue<string> | null,
      contractAddress?: PromiseOrValue<string> | null,
      taskId?: null
    ): ScheduledCallEventFilter;
  };

  estimateGas: {
    cancelCall(
      taskId: PromiseOrValue<BytesLike>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    rescheduleCall(
      minDelay: PromiseOrValue<BigNumberish>,
      taskId: PromiseOrValue<BytesLike>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    scheduleCall(
      contractAddress: PromiseOrValue<string>,
      value: PromiseOrValue<BigNumberish>,
      gasLimit: PromiseOrValue<BigNumberish>,
      storageLimit: PromiseOrValue<BigNumberish>,
      minDelay: PromiseOrValue<BigNumberish>,
      inputData: PromiseOrValue<BytesLike>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;
  };

  populateTransaction: {
    cancelCall(
      taskId: PromiseOrValue<BytesLike>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    rescheduleCall(
      minDelay: PromiseOrValue<BigNumberish>,
      taskId: PromiseOrValue<BytesLike>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    scheduleCall(
      contractAddress: PromiseOrValue<string>,
      value: PromiseOrValue<BigNumberish>,
      gasLimit: PromiseOrValue<BigNumberish>,
      storageLimit: PromiseOrValue<BigNumberish>,
      minDelay: PromiseOrValue<BigNumberish>,
      inputData: PromiseOrValue<BytesLike>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;
  };
}