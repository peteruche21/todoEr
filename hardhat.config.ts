import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";
import "dotenv/config";

const { ALCHEMY_RPC_URL, PRIVATE_KEY, ETHERSCAN_API_KEY } = process.env;
const config: HardhatUserConfig = {
  solidity: "0.8.19",

  networks: {
    sepolia: {
      url: ALCHEMY_RPC_URL,
      accounts: [PRIVATE_KEY!],
    },
  },

  etherscan: {
    apiKey: ETHERSCAN_API_KEY!,
  },
};

export default config;
