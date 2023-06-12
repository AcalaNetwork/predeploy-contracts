# EVM

*Acala Developers*

> EVM Predeploy Contract

You can use this predeploy contract to call evm pallet

*This contracts will interact with evm pallet*

## Methods

### developerDeposit

```solidity
function developerDeposit() external view returns (uint256)
```

Get deposit for the developer.




#### Returns

| Name | Type | Description |
|---|---|---|
| _0 | uint256 | Returns the const of DeveloperDeposit. |

### developerDisable

```solidity
function developerDisable() external nonpayable returns (bool)
```

Disables account for development mode, returns deposit.

*It&#39;ll emit an {DeveloperDisabled} event.*


#### Returns

| Name | Type | Description |
|---|---|---|
| _0 | bool | Returns a boolean value indicating whether the operation succeeded. |

### developerEnable

```solidity
function developerEnable() external nonpayable returns (bool)
```

Enables account for development mode, taking a deposit.

*It&#39;ll emit an {DeveloperEnabled} event.*


#### Returns

| Name | Type | Description |
|---|---|---|
| _0 | bool | Returns a boolean value indicating whether the operation succeeded. |

### developerStatus

```solidity
function developerStatus(address account) external view returns (bool)
```

Get developer status.



#### Parameters

| Name | Type | Description |
|---|---|---|
| account | address | The developer account. |

#### Returns

| Name | Type | Description |
|---|---|---|
| _0 | bool | Returns if the account is enabled for developer mode. |

### maintainerOf

```solidity
function maintainerOf(address contractAddress) external view returns (address)
```

Get the maintainer of the contract.



#### Parameters

| Name | Type | Description |
|---|---|---|
| contractAddress | address | The contract address. |

#### Returns

| Name | Type | Description |
|---|---|---|
| _0 | address | Returns the maintainer of the contract. |

### newContractExtraBytes

```solidity
function newContractExtraBytes() external view returns (uint256)
```

Get the extra bytes for creating a contract.




#### Returns

| Name | Type | Description |
|---|---|---|
| _0 | uint256 | Returns the const of NewContractExtraBytes. |

### publicationFee

```solidity
function publicationFee() external view returns (uint256)
```

Get the fee for publishing the contract.




#### Returns

| Name | Type | Description |
|---|---|---|
| _0 | uint256 | Returns the const of PublicationFee. |

### publishContract

```solidity
function publishContract(address contractAddress) external nonpayable returns (bool)
```

Publish contract.

*It&#39;ll emit an {ContractPublished} event.*

#### Parameters

| Name | Type | Description |
|---|---|---|
| contractAddress | address | The contract address. |

#### Returns

| Name | Type | Description |
|---|---|---|
| _0 | bool | Returns a boolean value indicating whether the operation succeeded. |

### storageDepositPerByte

```solidity
function storageDepositPerByte() external view returns (uint256)
```

Get the storage required for per byte.




#### Returns

| Name | Type | Description |
|---|---|---|
| _0 | uint256 | Returns the const of StorageDepositPerByte. |

### transferMaintainer

```solidity
function transferMaintainer(address contractAddress, address newMaintainer) external nonpayable returns (bool)
```

Transfer the maintainer of the contract.

*It&#39;ll emit an {TransferredMaintainer} event.*

#### Parameters

| Name | Type | Description |
|---|---|---|
| contractAddress | address | The contract address of the transfer maintainer. It cannot be the zero address. The caller must be the contract&#39;s maintainer. |
| newMaintainer | address | The address of the new maintainer. |

#### Returns

| Name | Type | Description |
|---|---|---|
| _0 | bool | Returns a boolean value indicating whether the operation succeeded. |



## Events

### ContractPublished

```solidity
event ContractPublished(address indexed contractAddress)
```

Contract published event.



#### Parameters

| Name | Type | Description |
|---|---|---|
| contractAddress `indexed` | address | The published contract address. |

### DeveloperDisabled

```solidity
event DeveloperDisabled(address indexed accountAddress)
```

Disabled developer event.



#### Parameters

| Name | Type | Description |
|---|---|---|
| accountAddress `indexed` | address | The disabled developer account address. |

### DeveloperEnabled

```solidity
event DeveloperEnabled(address indexed accountAddress)
```

Enabled developer event.



#### Parameters

| Name | Type | Description |
|---|---|---|
| accountAddress `indexed` | address | The enabled developer account address. |

### TransferredMaintainer

```solidity
event TransferredMaintainer(address indexed contractAddress, address indexed newMaintainer)
```

Transferred maintainer event.



#### Parameters

| Name | Type | Description |
|---|---|---|
| contractAddress `indexed` | address | The contract address of the transferred maintainer. |
| newMaintainer `indexed` | address | The new maintainer. |



