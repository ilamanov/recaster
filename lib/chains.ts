export const ALL_CHAINS = [
  "ETHEREUM",
  "SEPOLIA",
  "GOERLI",
  "BASE",
  "BASE_GOERLI",
  "BASE_SEPOLIA",
] as const;
export type Chain = (typeof ALL_CHAINS)[number];

export function getId(chain: Chain) {
  switch (chain) {
    case "ETHEREUM":
      return 1;
    case "GOERLI":
      return 5;
    case "SEPOLIA":
      return 11155111;
    case "BASE":
      return 8453;
    case "BASE_GOERLI":
      return 84531;
      case "BASE_SEPOLIA":
        return 84532;
  }
}
