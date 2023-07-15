import { ethers, run } from "hardhat";
import { setTimeout } from "timers/promises";

async function main() {
  const nftContract = await ethers.deployContract("DCentralNFT");
  await nftContract.waitForDeployment();

  const contractAddress = await nftContract.getAddress();
  console.log(`NFT Contract for DCentral deployed to ${contractAddress}`);

  // Wait for etherscan to notice that the contract has been deployed.
  await setTimeout(60000);

  // Verify the contract after deploying
  await run("verify:verify", {
    address: contractAddress,
    constructorArguments: [],
  });
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
