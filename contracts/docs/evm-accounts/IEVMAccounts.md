# IEVMAccounts

*Acala Developers*

> EVMAccounts Predeploy Contract Interface

You can use this predeploy contract to call evm-accounts pallet

*The interface through which solidity contracts will interact with evm-accounts pallet*

## Methods

### claimDefaultEvmAddress

```solidity
function claimDefaultEvmAddress(bytes32 accountId) external nonpayable returns (bool)
```

Claim account mapping between AccountId and a generated EvmAddress based off of the AccountId.

*It&#39;ll emit an {ClaimAccount} event.*

#### Parameters

| Name | Type | Description |
|---|---|---|
| accountId | bytes32 | The substrate account. |

#### Returns

| Name | Type | Description |
|---|---|---|
| _0 | bool | Returns a boolean value indicating whether the operation succeeded. |

### getAccountId

```solidity
function getAccountId(address evmAddress) external view returns (bytes32)
```

Get the AccountId used to generate the given EvmAddress.



#### Parameters

| Name | Type | Description |
|---|---|---|
| evmAddress | address | The EVM address. |

#### Returns

| Name | Type | Description |
|---|---|---|
| _0 | bytes32 | Returns (accountId). |

### getEvmAddress

```solidity
function getEvmAddress(bytes32 accountId) external view returns (address)
```

Get the EvmAddress associated with a given AccountId or the underlying EvmAddress of the AccountId.



#### Parameters

| Name | Type | Description |
|---|---|---|
| accountId | bytes32 | The substrate account. |

#### Returns

| Name | Type | Description |
|---|---|---|
| _0 | address | Returns (evmAddress). Return address(0x0) if the AccountId is not mapped. |



## Events

### ClaimAccount

```solidity
event ClaimAccount(address indexed sender, bytes32 indexed accountId, address indexed evmAddress)
```

Mapping between Substrate accounts and EVM accounts claim account event.



#### Parameters

| Name | Type | Description |
|---|---|---|
| sender `indexed` | address | The sender of the transaction. |
| accountId `indexed` | bytes32 | The substrate account. |
| evmAddress `indexed` | address | The mapped EVM accounts. |



