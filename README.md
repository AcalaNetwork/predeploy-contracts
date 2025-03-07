# Predeploy-contracts

Generate bytecode for predeployment of ERC20 smart contracts in Acala.

## Build

Run `yarn` to install dependencies.

## Generate bytecode

To generate bytecode, run `yarn run generate-bytecode`.

The generated bytecode JSON file would be `./resources/bytecodes.json`.

## Development

The token list for ERC20 smart contracts is in `./resources/acala_tokens.json` and `./resources/karura_tokens.json`. symbol and address are needed for each token, for instance:

```
{
  "symbol": "ACA",
  "address": "0x0000000000000000000100000000000000000000"
}
```
All of the tokens and predeployed system contracts have generated code in `./contracts/utils/AcalaAddress.sol` and `./contracts/utils/AcalaAddress.js` for Acala, `./contracts/utils/KaruraAddress.sol` and `./contracts/utils/KaruraAddress.js` for Karura, we can use it directly.


# Predeployed System Contracts

## ERC20 Contracts
These ERC20 contracts make native and cross-chain tokens available inside Acala EVM.
- Mirrored Token contract address: `ADDRESS.ACA`, `ADDRESS.AUSD`...(`./contracts/utils/AcalaAddress.sol` or `./contracts/utils/KaruraAddress.sol`)
- Docs [contracts/docs/token/Token.md](./contracts/docs/token/Token.md)


## Other System Contracts:
These contracts make other chain-native functionalities available in Acala EVM.

### EVM
- EVM contract address: `ADDRESS.EVM`
- Docs [contracts/docs/evm/EVM.md](./contracts/docs/evm/EVM.md)

### Oracle Price Feed
- Oracle contract address: `ADDRESS.ORACLE`
- Docs [contracts/docs/oracle/Oracle.md](./contracts/docs/oracle/Oracle.md)

### On-chain Automatic Scheduler
- ScheduleCall contract address: `ADDRESS.SCHEDULE`
- Docs [contracts/docs/schedule/Schedule.md](./contracts/docs/schedule/Schedule.md)

### DEX
- DEX contract address: `ADDRESS.DEX`
- Docs [contracts/docs/dex/DEX.md](./contracts/docs/dex/DEX.md)

### Homa Liquid Staking Protocol
- Homa contract address: `ADDRESS.HOMA`
- Docs [contracts/docs/homa/Homa.md](./contracts/docs/homa/Homa.md)

### EVM Accounts
- EVMAccounts contract address: `ADDRESS.EVM_ACCOUNTS`
- Docs [contracts/docs/evm-accounts/EVMAccounts.md](./contracts/docs/evm-accounts/EVMAccounts.md)

### Honzon Protocol
- Honzon contract address: `ADDRESS.HONZON`
- Docs [contracts/docs/honzon/Honzon.md](./contracts/docs/honzon/Honzon.md)

### Incentives
- Incentives contract address: `ADDRESS.INCENTIVES`
- Docs [contracts/docs/incentives/Incentives.md](./contracts/docs/incentives/Incentives.md)

### StableAsset
- StableAsset contract address: `ADDRESS.STABLE_ASSET`
- Docs [contracts/docs/stable-asset/StableAsset.md](./contracts/docs/stable-asset/StableAsset.md)

### Xtokens
- Xtokens contract address: `ADDRESS.XTOKENS`
- Docs [contracts/docs/xtokens/Xtokens.md](./contracts/docs/xtokens/Xtokens.md)

## DeFi Contracts (Coming Soon)
These contracts will make Acala's DeFi primitives (stablecoin, staking derivative, and DeX) available in Acala EVM.

## Verify
```
npx hardhat run scripts/deploy.ts --network karuraTestnet
npx hardhat verify --network karuraTestnet 0xc5d131D410B15890dAF6F517475C6FB9D0c758DA
```
