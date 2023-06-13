import { HardhatUserConfig, task } from "hardhat/config";
import '@nomiclabs/hardhat-ethers';
import '@nomiclabs/hardhat-waffle';
import "@nomiclabs/hardhat-etherscan";
import '@primitivefi/hardhat-dodoc';
import '@typechain/hardhat';

import * as dotenv from "dotenv";
dotenv.config();

// You need to export an object to set up your config
// Go to https://hardhat.org/config/ to learn more

const config: HardhatUserConfig = {
  solidity: {
    version: "0.8.18",
    settings: {
      optimizer: {
        enabled: true,
        runs: 20000
      }
    }
  },
  networks: {
    mandala: {
      url: 'http://127.0.0.1:8545', // https://eth-rpc-tc9.aca-staging.network
      accounts: {
        mnemonic: process.env.MNEMONIC || 'fox sight canyon orphan hotel grow hedgehog build bless august weather swarm',
        path: "m/44'/60'/0'/0",
      },
      chainId: 595
    },
    karuraTestnet: {
      url: 'https://eth-rpc-karura-testnet.aca-staging.network',
      accounts: {
        mnemonic: process.env.MNEMONIC || '',
      },
      chainId: 596,
      timeout: 120000,
    },
    acalaTestnet: {
      url: 'https://eth-rpc-acala-testnet.aca-staging.network',
      accounts: {
        mnemonic: process.env.MNEMONIC || '',
      },
      chainId: 597,
      timeout: 120000,
    },
    karura: {
      url: 'https://eth-rpc-karura.aca-api.network',
      accounts: {
        mnemonic: process.env.MNEMONIC || '',
      },
      chainId: 686,
      timeout: 120000,
    },
    acala: {
      url: 'https://eth-rpc-acala.aca-api.network',
      accounts: {
        mnemonic: process.env.MNEMONIC || '',
      },
      chainId: 787,
      timeout: 120000,
    }
  },
  etherscan: {
    apiKey: {
      karuraTestnet: 'no-api-key-needed',
      acalaTestnet: 'no-api-key-needed',
      karura: 'no-api-key-needed',
      acala: 'no-api-key-needed',
    },
    customChains: [
      {
        network: "karuraTestnet",
        chainId: 596,
        urls: {
          apiURL: "https://blockscout.karura-testnet.aca-staging.network/api",
          browserURL: "https://blockscout.karura-testnet.aca-staging.network",
        },
      },
      {
        network: "acalaTestnet",
        chainId: 597,
        urls: {
          apiURL: "https://blockscout.acala-dev.aca-dev.network/api",
          browserURL: "https://blockscout.acala-dev.aca-dev.network",
        },
      },
      {
        network: "karura",
        chainId: 686,
        urls: {
          apiURL: "https://blockscout.karura.network/api",
          browserURL: "https://blockscout.karura.network",
        },
      },
      {
        network: "acala",
        chainId: 787,
        urls: {
          apiURL: "https://blockscout.acala.network/api",
          browserURL: "https://blockscout.acala.network",
        },
      }
    ],
  },
  typechain: {
    outDir: './contracts/typechain'
  },
  dodoc: {
    outputDir: './contracts/docs'
  }
};

export default config;
