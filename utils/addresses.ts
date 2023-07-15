import { cache } from "react";
import { JsonRpcProvider } from "ethers";

export const formatAddress = cache(async (address: string, getName?: boolean) => {
  if (address.length !== 42)
    return {
      address,
      shortString: "",
      name: "",
      avatar: "",
    };
  const provider = new JsonRpcProvider(process.env.SEPOLIA_RPC_URL);
  const name = getName && (await provider?.lookupAddress(address));
  return {
    address,
    shortString: `${address.slice(0, 6)}...${address.slice(-4)}`,
    name,
    avatar: `https://effigy.im/a/${name || address}.svg`,
  };
});
