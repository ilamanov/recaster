import { Address, isAddressEqual, zeroAddress } from "viem";

import { LOCAL_TEST_COMPONENT_CAST } from "../components/local-test-components/cast";
import { LOCAL_TEST_COMPONENT_FEED } from "../components/local-test-components/feed";
import { LOCAL_TEST_THEME } from "../components/local-test-components/theme";
import { LOCAL_TEST_COMPONENT_USER_SUMMARY } from "../components/local-test-components/user-summary";
import { Chain } from "./chains";
import { OnChainComponentProps } from "./types";
import { getPublicClient } from "./viem";

const chain: Chain = "BASE_SEPOLIA";

const USER_SUMMARY_ABI = [
  {
    inputs: [
      {
        components: [
          { internalType: "string", name: "fid", type: "string" },
          { internalType: "string", name: "username", type: "string" },
          { internalType: "string", name: "displayName", type: "string" },
          {
            components: [
              { internalType: "string", name: "url", type: "string" },
            ],
            internalType: "struct UserSummaryComponent.Pfp",
            name: "pfp",
            type: "tuple",
          },
          {
            components: [
              {
                components: [
                  { internalType: "string", name: "text", type: "string" },
                ],
                internalType: "struct UserSummaryComponent.Bio",
                name: "bio",
                type: "tuple",
              },
            ],
            internalType: "struct UserSummaryComponent.Profile",
            name: "profile",
            type: "tuple",
          },
          { internalType: "uint64", name: "followingCount", type: "uint64" },
          { internalType: "uint64", name: "followerCount", type: "uint64" },
        ],
        internalType: "struct UserSummaryComponent.UserSummary",
        name: "userSummary",
        type: "tuple",
      },
      {
        internalType: "enum CommonStyles.ColorTheme",
        name: "colorTheme",
        type: "uint8",
      },
      {
        internalType: "enum CommonStyles.ScreenSize",
        name: "screenSize",
        type: "uint8",
      },
      { internalType: "address", name: "themeComponent", type: "address" },
    ],
    name: "getComponent",
    outputs: [{ internalType: "string", name: "", type: "string" }],
    stateMutability: "view",
    type: "function",
  },
] as const;

export async function fetchComponent({
  address,
  componentType,
  data,
  colorTheme,
  screenSize,
  themeComponentAddress,
}: OnChainComponentProps & {
  address: Address;
  colorTheme: string;
  screenSize: string;
  themeComponentAddress: Address;
}): Promise<string> {
  const publicClient = getPublicClient(chain);

  if (componentType === "userSummary") {
    if (isAddressEqual(address, zeroAddress)) {
      return LOCAL_TEST_COMPONENT_USER_SUMMARY(
        data,
        colorTheme,
        screenSize,
        themeComponentAddress
      );
    }

    return await publicClient.readContract({
      address: address,
      abi: USER_SUMMARY_ABI,
      functionName: "getComponent",
      args: [
        {
          fid: data.fid.toString(),
          username: data.username,
          displayName: data.displayName,
          pfp: { url: data.pfp.url },
          profile: { bio: { text: data.profile.bio.text } },
          followingCount: BigInt(data.followingCount),
          followerCount: BigInt(data.followerCount),
        },
        colorTheme === "light" ? 0 : 1,
        screenSize === "sm" ? 0 : 1,
        themeComponentAddress,
      ],
    });
  } else if (componentType === "feed") {
    if (isAddressEqual(address, zeroAddress)) {
      return LOCAL_TEST_COMPONENT_FEED(
        data,
        colorTheme,
        screenSize,
        themeComponentAddress
      );
    }
    return "Feed component not implemented";
  } else if (componentType === "cast") {
    if (isAddressEqual(address, zeroAddress)) {
      return LOCAL_TEST_COMPONENT_CAST(
        data,
        colorTheme,
        screenSize,
        themeComponentAddress
      );
    }
    return "Cast component not implemented";
  } else {
    return "Unknown component type for default";
  }
}

const THEME_ABI = [
  {
    inputs: [
      {
        internalType: "enum DefaultTheme.ColorTheme",
        name: "colorTheme",
        type: "uint8",
      },
      { internalType: "enum DefaultTheme.ScreenSize", name: "", type: "uint8" },
    ],
    name: "getTheme",
    outputs: [{ internalType: "string", name: "", type: "string" }],
    stateMutability: "pure",
    type: "function",
  },
] as const;

export async function fetchTheme({
  address,
  colorTheme,
  screenSize,
}: {
  address: Address;
  colorTheme: string;
  screenSize: string;
}): Promise<string> {
  if (isAddressEqual(address, zeroAddress)) {
    return LOCAL_TEST_THEME(colorTheme, screenSize);
  }

  const publicClient = getPublicClient(chain);

  const theme = await publicClient.readContract({
    address: address,
    abi: THEME_ABI,
    functionName: "getTheme",
    args: [colorTheme === "light" ? 0 : 1, screenSize === "sm" ? 0 : 1],
  });

  return theme;
}
