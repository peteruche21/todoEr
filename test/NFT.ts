import { expect } from "chai";
import { ethers } from "hardhat";
import { TOKEN_PINATA_URI, TOKEN_PRICE } from "../utils/constants";

describe("DCentral NFT", async () => {
  let nftContract: any;
  let owner: any;

  beforeEach(async () => {
    const [account] = await ethers.getSigners();
    const nftFactory = await ethers.deployContract("DCentralNFT");
    await nftFactory.waitForDeployment();

    nftContract = nftFactory;
    owner = account;
  });

  describe("Deployment", () => {
    it("Should deploy correctly", async () => {
      expect(nftContract.target).to.not.equal(0);
    });
  });

  describe("Passing Asset Creation", () => {
    it("Can Mint 1 NFT", async () => {
      const cost = TOKEN_PRICE;

      await nftContract.mint(owner.address, TOKEN_PINATA_URI, 1, {
        value: cost,
      });
      expect(await nftContract.balanceOf(owner.address)).to.equal(1);
    });

    it("Can Mint multiple NFTs", async () => {
      const cost = TOKEN_PRICE * ethers.toBigInt(3);

      await nftContract.mint(owner.address, TOKEN_PINATA_URI, 3, {
        value: cost,
      });
      expect(await nftContract.balanceOf(owner.address)).to.equal(3);
    });
  });

  describe("Fail Asset Creation", () => {
    it("Cannot mint with wrong cost", async () => {
      await expect(
        nftContract.mint(owner.address, TOKEN_PINATA_URI, 1, {
          value: 0,
        })
      ).to.be.revertedWith("DCentralNFT: Ether value sent is not correct");
    });

    it("Cannot mint more than MAX_NFT_PER_TX", async () => {
      const amount = 11;
      const cost = TOKEN_PRICE * ethers.toBigInt(amount);

      await expect(
        nftContract.mint(owner.address, TOKEN_PINATA_URI, amount, {
          value: cost,
        })
      ).to.be.revertedWith("DCentralNFT: Cannot mint more than MAX_MINT_PER_TX");
    });
  });
});
