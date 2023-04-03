# Token

*Acala Developers*

> MultiCurrency Predeploy Contract

You can use this predeploy contract to call currencies pallet

*This contracts will interact with currencies pallet*

## Methods

### allowance

```solidity
function allowance(address owner, address spender) external view returns (uint256)
```

Get the remaining number of tokens that `spender` will be allowed to spend.



#### Parameters

| Name | Type | Description |
|---|---|---|
| owner | address | The owner address. |
| spender | address | The spender address. |

#### Returns

| Name | Type | Description |
|---|---|---|
| _0 | uint256 | Returns the remaining number of tokens. The `spender` will be allowed to spend on behalf of `owner` through {transferFrom}. This is zero by default. |

### approve

```solidity
function approve(address spender, uint256 amount) external nonpayable returns (bool)
```

Sets `amount` as the allowance of `spender` over the caller&#39;s tokens.

*It&#39;ll emit an {Approval} event. If `amount` is the maximum `uint256`, the allowance is not updated on `transferFrom`. This is semantically equivalent to an infinite approval.*

#### Parameters

| Name | Type | Description |
|---|---|---|
| spender | address | Approve the spender. |
| amount | uint256 | The approve amount. |

#### Returns

| Name | Type | Description |
|---|---|---|
| _0 | bool | Returns a boolean value indicating whether the operation succeeded. |

### balanceOf

```solidity
function balanceOf(address account) external view returns (uint256)
```

Get the amount of tokens owned by `account`.



#### Parameters

| Name | Type | Description |
|---|---|---|
| account | address | The specified user. |

#### Returns

| Name | Type | Description |
|---|---|---|
| _0 | uint256 | Returns the amount of tokens owned by `account`. |

### decimals

```solidity
function decimals() external view returns (uint8)
```

Get the number of decimals used to get its user representation.




#### Returns

| Name | Type | Description |
|---|---|---|
| _0 | uint8 | Returns the number of decimals. |

### decreaseAllowance

```solidity
function decreaseAllowance(address spender, uint256 subtractedValue) external nonpayable returns (bool)
```



*Atomically decreases the allowance granted to `spender` by the caller. This is an alternative to {approve} that can be used as a mitigation for problems described in {IERC20-approve}. Emits an {Approval} event indicating the updated allowance.*

#### Parameters

| Name | Type | Description |
|---|---|---|
| spender | address | must have allowance for the caller of at least `subtractedValue`. It cannot be the zero address. |
| subtractedValue | uint256 | The subtracted value. |

#### Returns

| Name | Type | Description |
|---|---|---|
| _0 | bool | Returns a boolean value indicating whether the operation succeeded. |

### increaseAllowance

```solidity
function increaseAllowance(address spender, uint256 addedValue) external nonpayable returns (bool)
```



*Atomically increases the allowance granted to `spender` by the caller. This is an alternative to {approve} that can be used as a mitigation for problems described in {IERC20-approve}. Emits an {Approval} event indicating the updated allowance.*

#### Parameters

| Name | Type | Description |
|---|---|---|
| spender | address | It cannot be the zero address. |
| addedValue | uint256 | The added value. |

#### Returns

| Name | Type | Description |
|---|---|---|
| _0 | bool | Returns a boolean value indicating whether the operation succeeded. |

### name

```solidity
function name() external view returns (string)
```

Get the name of the token.




#### Returns

| Name | Type | Description |
|---|---|---|
| _0 | string | Returns the name of the token. |

### symbol

```solidity
function symbol() external view returns (string)
```

Get the symbol of the token, usually a shorter version of the name.




#### Returns

| Name | Type | Description |
|---|---|---|
| _0 | string | Returns the symbol of the token. |

### totalSupply

```solidity
function totalSupply() external view returns (uint256)
```

Get the amount of tokens in existence.




#### Returns

| Name | Type | Description |
|---|---|---|
| _0 | uint256 | Returns amount of tokens in existence. |

### transfer

```solidity
function transfer(address to, uint256 amount) external nonpayable returns (bool)
```

Moves `amount` tokens from the caller&#39;s account to `to`.

*It&#39;ll emit an {Transfer} event. The caller must have a balance of at least `amount`.*

#### Parameters

| Name | Type | Description |
|---|---|---|
| to | address | The dest address, it cannot be the zero address. |
| amount | uint256 | The transfer amount. |

#### Returns

| Name | Type | Description |
|---|---|---|
| _0 | bool | Returns a boolean value indicating whether the operation succeeded. |

### transferFrom

```solidity
function transferFrom(address from, address to, uint256 amount) external nonpayable returns (bool)
```

Moves `amount` tokens from `from` to `to` using the allowance mechanism. `amount` is then deducted from the caller&#39;s allowance.

*It&#39;ll emit an {Transfer} event.*

#### Parameters

| Name | Type | Description |
|---|---|---|
| from | address | Transfer amount from the address. The caller must have allowance for ``from``&#39;s tokens of at least `amount`. It cannot be the zero address. |
| to | address | Transfer amount to the address. It cannot be the zero address. |
| amount | uint256 | The transfer amount. |

#### Returns

| Name | Type | Description |
|---|---|---|
| _0 | bool | Returns a boolean value indicating whether the operation succeeded. |



## Events

### Approval

```solidity
event Approval(address indexed owner, address indexed spender, uint256 value)
```



*Emitted when the allowance of a `spender` for an `owner` is set by a call to {approve}. `value` is the new allowance.*

#### Parameters

| Name | Type | Description |
|---|---|---|
| owner `indexed` | address | undefined |
| spender `indexed` | address | undefined |
| value  | uint256 | undefined |

### Transfer

```solidity
event Transfer(address indexed from, address indexed to, uint256 value)
```



*Emitted when `value` tokens are moved from one account (`from`) to another (`to`). Note that `value` may be zero.*

#### Parameters

| Name | Type | Description |
|---|---|---|
| from `indexed` | address | undefined |
| to `indexed` | address | undefined |
| value  | uint256 | undefined |



