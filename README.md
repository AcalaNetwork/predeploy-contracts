# Predeploy-contracts

Generate bytecode for predeployment of ERC20 smart contracts in Acala.

## Build

Run `yarn` to install dependencies.

## Generate bytecode

To generate bytecode, run `yarn run generate-bytecode`.

The generated bytecode JSON file would be `./resources/bytecodes.json`.

## Development

The token list for ERC20 smart contracts is in `./resources/tokens.json`. symbol and address are needed for each token, for instance:

```
{
  "symbol": "ACA",
  "address": "0x0000000000000000000100000000000000000000"
}
```
All of the tokens and predeployed system contracts have generated code in `./contracts/utils/Address.sol` and `./contracts/utils/Address.js`, we can use it directly.


# Predeployed System Contracts

## ERC20 Contracts
These ERC20 contracts make native and cross-chain tokens available inside Acala EVM.
- Mirrored Token contract address: `ADDRESS.ACA`, `ADDRESS.AUSD`...(`./contracts/utils/Address.sol`)
```
// Returns the currencyId of the token.
function currencyId() public view returns (uint256);

// Returns the name of the token.
function name() public view returns (string memory);

// Returns the symbol of the token, usually a shorter version of the name.
function symbol() public view returns (string memory);

// Returns the number of decimals used to get its user representation.
function decimals() public view returns (uint8);

// Returns the amount of tokens in existence.
function totalSupply() public view returns (uint256);

// Returns the amount of tokens owned by `account`.
function balanceOf(address account) public view returns (uint256);

// Moves `amount` tokens from the caller's account to `recipient`.
// Returns a boolean value indicating whether the operation succeeded.
// Emits a {Transfer} event.
function transfer(address recipient, uint256 amount) public returns (bool);

// Returns the remaining number of tokens that `spender` will be allowed to spend on behalf of `owner` through {transferFrom}.
// This is zero by default.
function allowance(address owner, address spender) public view returns (uint256);

// Sets `amount` as the allowance of `spender` over the caller's tokens.
// Returns a boolean value indicating whether the operation succeeded.
function approve(address spender, uint256 amount) public returns (bool);

// Moves `amount` tokens from `sender` to `recipient` using the allowance mechanism. `amount` is then deducted from the caller's allowance.
// Returns a boolean value indicating whether the operation succeeded.
function transferFrom(address sender, address recipient, uint256 amount) public returns (bool);

// Atomically increases the allowance granted to `spender` by the caller.
// This is an alternative to {approve} that can be used as a mitigation for problems described in {IERC20-approve}.
// Emits an {Approval} event indicating the updated allowance.
function increaseAllowance(address spender, uint256 addedValue) public returns (bool);

// Atomically decreases the allowance granted to `spender` by the caller.
// This is an alternative to {approve} that can be used as a mitigation for problems described in {IERC20-approve}.
// Emits an {Approval} event indicating the updated allowance.
function decreaseAllowance(address spender, uint256 subtractedValue) public returns (bool);
```


## Other System Contracts:
These contracts make other chain-native functionalities available in Acala EVM.

### EVM
- EVM contract address: `ADDRESS.EVM`
```
// Returns the const of NewContractExtraBytes.
function newContractExtraBytes() public view returns (uint256);

// Returns the const of StorageDepositPerByte.
function storageDepositPerByte() public view returns (uint256);

// Returns the maintainer of the contract.
function maintainerOf(address contract_address) public view returns (address);

// Returns the const of DeveloperDeposit.
function developerDeposit() public view returns (uint256);

// Returns the const of PublicationFee.
function publicationFee() public view returns (uint256);

// Transfer the maintainer of the contract.
// Returns a boolean value indicating whether the operation succeeded.
function transferMaintainer(address contract_address, address new_maintainer) public returns (bool);

// Publish contract
// Returns a boolean value indicating whether the operation succeeded.
function publishContract(address contract_address) external returns (bool);

// Returns if the account is enabled for developer mode
function developerStatus(address account) external view returns (bool);

// Enables account for development mode, taking a deposit
// Returns a boolean value indicating whether the operation succeeded.
function developerEnable() external returns (bool);

// Disables account for development mode, returns deposit
// Returns a boolean value indicating whether the operation succeeded.
function developerDisable() external returns (bool);
```

### Oracle Price Feed
- Oracle contract address: `ADDRESS.Oracle`
```
// Get the price of the currency_id.
// Returns the (price, timestamp)
function getPrice(address token) public view returns (uint256, uint256);
```
### On-chain Automatic Scheduler
- ScheduleCall contract address: `ADDRESS.Schedule`
```
// Schedule call the contract.
// Returns a bytes value equal to the task_id of the task created.
function scheduleCall(address contract_address, uint256 value, uint256 gas_limit, uint256 storage_limit, uint256 min_delay, bytes memory input_data) public returns (bytes memory);

// Cancel schedule call the contract.
// Returns a boolean value indicating whether the operation succeeded.
function cancelCall(bytes memory task_id) public returns (bool);

// Reschedule call the contract.
// Returns a boolean value indicating whether the operation succeeded.
function rescheduleCall(uint256 min_delay, bytes memory task_id) public returns (bool);
```

### DEX
- DEX contract address: `ADDRESS.DEX`
```
// Get liquidity of the currency_id_a and currency_id_b.
// Returns (liquidity_a, liquidity_b)
function getLiquidity(address tokenA, address tokenB) public view returns (uint256, uint256)

// Get swap target amount.
// Returns (target_amount)
function getSwapTargetAmount(address[] calldata path, uint256 supplyAmount) external view returns (uint256);

// Get swap supply amount.
// Returns (supply_amount)
function getSwapSupplyAmount(address[] calldata path, uint256 targetAmount) external view returns (uint256);

// Swap with exact supply.
// Returns a boolean value indicating whether the operation succeeded.
function swapWithExactSupply(address[] calldata path, uint256 supplyAmount, uint256 minTargetAmount) external returns (bool);

// Swap with exact target.
// Returns a boolean value indicating whether the operation succeeded.
function swapWithExactTarget(address[] calldata path, uint256 targetAmount, uint256 maxSupplyAmount) external returns (bool);

// Add liquidity to the trading pair.
// Returns a boolean value indicating whether the operation succeeded.
function addLiquidity(address tokenA, address tokenB, uint256 maxAmountA, uint256 maxAmountB) external returns (bool);

// Remove liquidity from the trading pair.
// Returns a boolean value indicating whether the operation succeeded.
function removeLiquidity(address tokenA, address tokenB, uint256 removeShare) external returns (bool);
```

### Homa Liquid Staking Protocol
- Homa contact address: `ADDRESS.Homa`
```
    // Mint liquid currency with staking currency.
    // Returns a boolean value indicating whether the operation succeeded.
    function mint(uint256 mintAmount) external returns (bool);

    // Request to redeem liquid curency for staking currency
    // Returns a boolean value indicating whether the operation succeeded.
    function requestRedeem(uint256 redeemAmount, bool fastMatch) external returns (bool);

    // Get exchange rate
    // returns (exchange_rate) is a FixedU128 representing a decimal
    function getExchangeRate() external view returns (uint256);

    // Get estimated reward rate
    // returns (reward_rate) is a FixedU128 representing a decimal value
    function getEstimatedRewardRate() external view returns (uint256);

    // Get commission rate
    // returns (commission_rate) is a FixedU128 representing a decimal
    function getCommissionRate() external view returns (uint256);

    // Get fast match fee rate
    // returns (fast_match_fee) is a FixedU128 representing a decimal
    function getFastMatchFee() external view returns (uint256);
```

### EVM Accounts
- EVMAccounts contact address: `ADDRESS.EVMAccounts`
```
    event ClaimAccount(address indexed sender, bytes32 indexed accountId, address indexed evmAddress);

    // Returns the AccountId used to generate the given EvmAddress.
    function getAccountId(address evmAddress) external view returns (bytes32);

    // Returns the EvmAddress associated with a given AccountId or the underlying EvmAddress of the AccountId.
    function getEvmAddress(bytes32 accountId) external view returns (address);

    // Returns the EvmAddress associated with a given AccountId and generates an account mapping if no association exists.
    function claimDefaultEvmAddress(bytes32 accountId) external returns (bool);
```

## DeFi Contracts (Coming Soon)
These contracts will make Acala's DeFi primitives (stablecoin, staking derivative, and DeX) available in Acala EVM.
