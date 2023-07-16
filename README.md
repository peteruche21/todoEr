# TodoEr

A basic ToDo list application that utilizes a decentralized database for data storage.

## Features

- [x] create, read, update, delete todo
- [x] NFT authentication
- [x] Data encryption
- [x] Data decryption
- [x] ENS avatar resolution
- [x] ENS name resolution
- [x] UX/UI

## Technologies Used

||  Tech    |   How it is used    |
|---|---|---|
|1| Alchemy NFT API | Alchemy NFT API is used to authenticate users with their NFTs|
|2|Polybase.xyz|polybase.xyz is decentralized database solution, all todos are stored on a polybase collection|
|3|Ethers.js|ethers.js is used to interact with the ethereum blockchain (sepolia testnet)|
|4|DaisyUI|daisyUI is a component library for tailwindcss, the UI was built with daisyUI components|
|5|TailwindCSS|tailwindcss is a utility first css framework, it was used to style the application|
|6|react-hook-form|react-hook-form is a library for managing forms in react, it was used to manage the form in the application|
|7|nextjs13|The application is based on Nextjs13|
|8|hardhat|hardhat is a development environment for ethereum, it was used to deploy the smart contract used in the application|
|9|zustand|zustand is a state management library, it was used to manage the global state of the application|

## File Structure

    📂app
    ┣ 📂mint            # seperate route for minting NFTs
    ┣ 📜layout.tsx 
    ┗ 📜page.tsx
    📂components
    ┣ 📂UI              # all the UI components
    ┗ 📂navigation      
    ┃ ┗ 📜NavBar.tsx
    📂contracts
    ┗ 📜NFT.sol        # simple ERC721 contract
    📂db
    ┣ 📜auth.ts        # polybase auth implementation
    ┣ 📜client.ts      # polybase Todo DB client
    ┣ 📜schema.ts      # Todo Database schema
    ┗ 📜utils.ts       # polybase encryption/decryption implementation
    📂provider         # polybase react hooks wrapper
    📂scripts          # contract deployment scripts
    📂store            # global store implemented with zustand
    📂test             # NFT tests
    📂types 
    📂utils
    ┣ 📜addresses.ts   # address utitlities (name resolution, address shortening, avatar resolution)
    ┣ 📜constants.ts 
    ┗ 📜nftApi.ts      # NFT gate with Alchemy API. implementation
    📂views
    ┣ 📜login.tsx      # Login component
    ┗ 📜main.tsx       # Todo app

## How to run

```sh
# clone the repo
git clone https://github.com/peteruche21/todoEr.git

# change directory
cd todoEr

# install dependencies
pnpm i
#or
npm i
```

for the smart contract, you need to create a `.env` file in the root directory and add the following variables:

```sh
cp .env.example .env
#update the .env file with your own values
```

then run the following commands:

```sh
# compile the smart contract
pnpm hardhat compile
#or
npx hardhat compile

# run the tests
pnpm hardhat test
#or
npx hardhat test

# deploy the smart contract
pnpm hardhat run scripts/deploy.ts --network sepolia
#or
npx hardhat run scripts/deploy.ts --network sepolia
```

then run the following command to start the application:

```sh
# start the application
pnpm dev
#or
npm run dev

```

## Commits

- basic todo app `(with UI/UX)` from [commit 1827655](https://github.com/peteruche21/todoEr/commit/182765591d02a2c30219c334b4b4c8457083914c) to [commit f192b1a](https://github.com/peteruche21/todoEr/commit/f192b1aaf8a58576dbf7bbe842446cf7e916eb85)

- extras (`nft auth`, `encryption`, `decryption`, `ens avatar/name resolution`, `etc...`) from [commit 9289a2a](https://github.com/peteruche21/todoEr/commit/9289a2a19dc4cc31269f23adcc0aa15f00ad3644)
