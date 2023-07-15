import { Network, Alchemy } from "alchemy-sdk";
import { ethers } from "ethers";
import { TOKEN_CONTRACT_ADDRESS } from "../utils/constants";

const { ALCHEMY_API_KEY } = process.env;

export async function isHolderOfCollection(ownerAddr: string): Promise<boolean> {
  const settings = {
    apiKey: ALCHEMY_API_KEY,
    network: Network.ETH_SEPOLIA,
  };

  const alchemy = new Alchemy(settings);

  const nftsForOwner = await alchemy.nft.getNftsForOwner(ownerAddr);

  for (const nft of nftsForOwner.ownedNfts) {
    if (ethers.getAddress(nft.contract.address) == TOKEN_CONTRACT_ADDRESS) {
      return true;
    }
  }
  return false;
}
