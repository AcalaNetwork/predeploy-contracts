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
// Returns (liquidity_a, liquidity_b).
function getLiquidity(address tokenA, address tokenB) public view returns (uint256, uint256)

// Get Liquidity token address.
// Returns (liquidity_token_address). Return address(0x0) if the liquidity token address is not mapped.
function getLiquidityTokenAddress(address tokenA, address tokenB) external view returns (address);

// Get swap target amount.
// Returns (target_amount). Returns 0 if getting the target amount fails.
function getSwapTargetAmount(address[] calldata path, uint256 supplyAmount) external view returns (uint256);

// Get swap supply amount.
// Returns (supply_amount). Returns 0 if getting the supply amount fails.
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
- Homa contract address: `ADDRESS.Homa`
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
- EVMAccounts contract address: `ADDRESS.EVMAccounts`
```
event ClaimAccount(address indexed sender, bytes32 indexed accountId, address indexed evmAddress);

// Get the AccountId used to generate the given EvmAddress.
// Returns (accountId).
function getAccountId(address evmAddress) external view returns (bytes32);

// Returns the EvmAddress associated with a given AccountId or the underlying EvmAddress of the AccountId.
// Returns (evmAddress). Return address(0x0) if the AccountId is not mapped.
function getEvmAddress(bytes32 accountId) external view returns (address);

// Claim account mapping between AccountId and a generated EvmAddress based off of the AccountId.
// Returns a boolean value indicating whether the operation succeeded.
function claimDefaultEvmAddress(bytes32 accountId) external returns (bool);
```

### Honzon Protocol
- Honzon contract address: `ADDRESS.Honzon`
```
// Adjust CDP position
// Returns a boolean value indicating whether the operation succeeded.
function adjustLoan(address currencyId, int128 collateralAdjustment, int128 debitAdjustment) external returns (bool);

// Close CDP position with DEX
// Returns a boolean value indicating whether the operation succeeded.
function closeLoanByDex(address currencyId, uint256 maxCollateralAmount) external returns (bool);

// Get an open CDP position
// returns (collateral_amount, debit_amount)
function getPosition(address who, address currencyId) external view returns (uint256, uint256);

// Get liquidation ratio for a currencyId
// returns (liquidation_ratio) is a FixedU128 representing a decimal value
function getLiquidationRatio(address currencyId) external view returns (uint256);

// Get current collateral ratio for a particular CDP position
// returns (current_collateral_ratio) is a FixedU128 representing a decimal value
function getCurrentCollateralRatio(address who, address currencyId) external view returns (uint256);

// Get exchange rate of debit units to debit value for a currency_id
// returns (exchange_rate) is a FixedU128 representing a decimal value
function getDebitExchangeRate(address currencyId) external view returns (uint256);
```

### Incentives
- Incentives contract address: `ADDRESS.Incentives`
```
enum PoolId { LOANS, DEX }

// Gets reward amount in `rewardCurrency` added per period
// Returns (reward_amount)
function getIncentiveRewardAmount(PoolId pool, address poolCurrencyId, address rewardCurrencyId) external view returns (uint256);

// Fixed reward rate for dex reward pool per period
// Returns (dex_reward_rate) as a FixedU128 representing a decimal
function getDexRewardRate(address currencyId) external view returns (uint256);

// Stake LP token to add shares to PoolId::Dex
// Returns a boolean value indicating whether the operation succeeded.
function depositDexShare(address currencyId, uint256 amount) external returns (bool);

// Unstake LP token to remove shares from PoolId::Dex
// Returns a boolean value indicating whether the operation succeeded.
function withdrawDexShare(address currencyId, uint256 amount) external returns (bool);

// Claim all avalible multi currencies rewards for specific PoolId
// Returns a boolean value indicating whether the operation succeeded.
function claimRewards(PoolId pool, address poolCurrencyId) external returns (bool);

// Gets deduction rate for claiming reward early
// returns (claim_reward_deduction_rate) as a FixedU128 representing a decimal value
function getClaimRewardDeductionRate(PoolId pool, address poolCurrencyId) external view returns (uint256);

// Gets the pending rewards for a pool, actual reward could be deducted.
// returns (balances), an array of reward balances corresponding to currencyIds
function getPendingRewards(address[] calldata currencyIds, PoolId pool, address poolCurrencyId, address who) external view returns (uint256[] memory);
```

## DeFi Contracts (Coming Soon)
These contracts will make Acala's DeFi primitives (stablecoin, staking derivative, and DeX) available in Acala EVM.
