Recaster is <i>remixable</i> Farcaster client. Recaster allows you to remix your Farcaster experience to your liking. It's available at [recaster.vercel.app](https://recaster.vercel.app/).

Recaster does not render most of the UI itself. Instead it fetches the UI (HTML) from Base Sepolia. So anyone can contribute their own components and personalize/remix their Farcaster experience.

## How does it work?

This repo is a simple Next.js wrapper around the core on-chain components. The core components of the Farcaster client like the rendering of casts, the feed, the user profile, etc happens on-chain (on Base Sepolia). The Next.js wrapper is rendered off-chain. The Next.js wrapper serves the HTML returned from the on-chain contracts in an iframe.

![Components](assets/components.png)

Here are the components used in the above screenshot:

- User summary: [0x940303f089f4450a2398a8ed1c192929f070128b](https://sepolia.basescan.org/address/0x940303f089f4450a2398a8ed1c192929f070128b#code)
- Feed: [0xa046db7dbaac6a26913af2007d3f0f5978001893](https://sepolia.basescan.org/address/0xa046db7dbaac6a26913af2007d3f0f5978001893#code)
- Cast: [0x710c7f4dbe1ea035a3f75d1e6607bdb58b92f42f](https://sepolia.basescan.org/address/0x710c7f4dbe1ea035a3f75d1e6607bdb58b92f42f#code)
- Theme: [0xe91b043472ba7067a898a42b1f1881713dd5c4b7](https://sepolia.basescan.org/address/0xe91b043472ba7067a898a42b1f1881713dd5c4b7#code)

There are additional component already deployed to Base Sepolia which you can use by entering the address in the `On-chain component config` on the right bar of Recaster.

- Neobrutalism theme: [0x23f943b9bf6b6f0791ca17126ff89c2968abd6a1](https://sepolia.basescan.org/address/0x23f943b9bf6b6f0791ca17126ff89c2968abd6a1#code)

Here is what Neobrutalism theme looks like:
![neobrutalism](assets/neobrutalism.png)

You can add your own components too! **You can remix your Farcaster experience by deploying your own components and using them permissionlessly!**

If you want to go fully trustless, you can clone this repo and serve your own wrapper. You own the entire code!

## Why on-chain UI?

UI components and smart contracts have a lot in common. They are bother very composable and benefit from being decentralized.

On-chain UI might look ugly (see screenshot below) and probably wasteful for blockchain storage but having the UI code on-chain opens up lots of opportunities.

For example, it allows us to build products in a decentralized manner. Imagine building an Etherscan clone (or a Farcaster client). Someones builds a search bar, someone else builds a transaction table, etc. And the whole product can be built by small contributions from a lot of people. And these contributions can be rewarded by tokens or NFTs.

On-chain UI also opens up opportunities for UI marketplaces. People can create pretty UI components and others can use them in their projects for a small fee.

Here is the `UserSummary` component to demonstrate what on-chain UI looks like. It looks ugly but with the right tooling in the future, it can be made much better.

![user summary component](assets/on-chain-contract.png)

## Want to work together?

DM me on Twitter or Telegram (@nazar_ilamanov) and we can work on this together!
