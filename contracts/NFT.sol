// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

contract DCentralNFT is ERC721URIStorage {
    using Counters for Counters.Counter;
    Counters.Counter private _tokenIds;

    uint256 public constant MAX_SUPPLY = 10000;
    uint256 public constant MAX_MINT_PER_TX = 10;
    uint256 public constant PRICE = 0.05 ether;

    constructor() ERC721("DCentralNFT", "DCN") {}

    function mint(
        address receiver,
        string memory tokenURI,
        uint8 quantity
    ) public payable returns (uint256) {
        require(
            _tokenIds.current() + 1 <= MAX_SUPPLY,
            "DCentralNFT: Cannot mint more than max supply"
        );

        require(
            PRICE * quantity == msg.value,
            "DCentralNFT: Ether value sent is not correct"
        );

        require(
            quantity <= MAX_MINT_PER_TX,
            "DCentralNFT: Cannot mint more than MAX_MINT_PER_TX"
        );

        for (uint256 i = 0; i < quantity; i++) {
            uint256 newItemId = _tokenIds.current();
            _safeMint(receiver, newItemId);
            _setTokenURI(newItemId, tokenURI);
            _tokenIds.increment();
        }

        return _tokenIds.current();
    }
}