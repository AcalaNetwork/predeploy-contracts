import { HardhatUserConfig, task } from "hardhat/config";
import '@nomiclabs/hardhat-ethers'
import '@nomiclabs/hardhat-waffle'

// You need to export an object to set up your config
// Go to https://hardhat.org/config/ to learn more

const config: HardhatUserConfig = {
  solidity: {
    version: "0.8.4",
    settings: {
      optimizer: {
        enabled: true,
        runs: 20000
      }
    }
  },
  networks: {
    mandala: {
      url: 'http://127.0.0.1:8545',
      accounts: {
        mnemonic: 'fox sight canyon orphan hotel grow hedgehog build bless august weather swarm',
        path: "m/44'/60'/0'/0",
      },
      chainId: 595
    },
  }
};

export default config;
