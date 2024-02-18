import { Chain } from "@/lib/chains";
import { createPublicClient, http } from "viem";
import { base, baseGoerli, goerli, mainnet, sepolia, baseSepolia } from "viem/chains";

export function getChain(chain: Chain) {
  switch (chain) {
    case "ETHEREUM":
      return mainnet;
    case "GOERLI":
      return goerli;
    case "SEPOLIA":
      return sepolia;
    case "BASE":
      return base;
    case "BASE_GOERLI":
      return baseGoerli;
      case "BASE_SEPOLIA":
        return baseSepolia;
  }
}

function getAlchemyUrl(chain: Chain) {
  let suffix;
  switch (chain) {
    case "ETHEREUM":
      suffix = "eth-mainnet";
      break;
    case "GOERLI":
      suffix = "eth-goerli";
      break;
    case "SEPOLIA":
      suffix = "eth-sepolia";
      break;
    case "BASE":
      suffix = "base-mainnet";
      break;
    case "BASE_GOERLI":
      suffix = "base-goerli";
      break;
      case "BASE_SEPOLIA":
        suffix = "base-sepolia";
        break;
  }
  return `https://${suffix}.g.alchemy.com/v2/${process.env.NEXT_PUBLIC_ALCHEMY_API_KEY}`;
}

export function getPublicClient(
  chain: Chain,
  multicall = false,
  fetchOptions: RequestInit | undefined = undefined
) {
  return createPublicClient({
    chain: getChain(chain),
    transport: http(getAlchemyUrl(chain), { fetchOptions }),
    batch: {
      multicall,
    },
  });
}

