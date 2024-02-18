import { Address, isAddressEqual, zeroAddress } from "viem";

import { LOCAL_TEST_COMPONENT_CAST } from "../components/local-test-components/cast";
import { LOCAL_TEST_COMPONENT_FEED } from "../components/local-test-components/feed";
import { LOCAL_TEST_THEME } from "../components/local-test-components/theme";
import { LOCAL_TEST_COMPONENT_USER_SUMMARY } from "../components/local-test-components/user-summary";
import { CAST_ABI, THEME_ABI, USER_SUMMARY_ABI } from "./abi";
import { Chain } from "./chains";
import { OnChainComponentProps } from "./types";
import { getPublicClient } from "./viem";

const chain: Chain = "BASE_SEPOLIA";

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

    return await publicClient.readContract({
      address: address,
      abi: CAST_ABI,
      functionName: "getComponent",
      args: [
        {
          hash: data.hash,
          timeDelta: data.timeDelta,
          text: data.text,
          recastsCount: BigInt(data.recastsCount),
          likesCount: BigInt(data.likesCount),
          repliesCount: BigInt(data.repliesCount),
          author: {
            fid: data.author.fid.toString(),
            username: data.author.username,
            displayName: data.author.displayName,
            pfpUrl: data.author.pfpUrl,
          },
          isInChannel: !!data.channel,
          channel: {
            name: data.channel?.name || "",
            imageUrl: data.channel?.imageUrl || "",
          },
          embeds: data.embeds.map((embed) => ({
            isCast: "cast" in embed,
            cast:
              "cast" in embed
                ? {
                    hash: embed.cast.hash,
                    timeDelta: embed.cast.timeDelta,
                    text: embed.cast.text,
                    recastsCount: BigInt(embed.cast.recastsCount),
                    likesCount: BigInt(embed.cast.likesCount),
                    repliesCount: BigInt(embed.cast.repliesCount),
                    author: {
                      fid: embed.cast.author.fid.toString(),
                      username: embed.cast.author.username,
                      displayName: embed.cast.author.displayName,
                      pfpUrl: embed.cast.author.pfpUrl,
                    },
                    isInChannel: !!embed.cast.channel,
                    channel: embed.cast.channel
                      ? {
                          name: embed.cast.channel.name,
                          imageUrl: embed.cast.channel.imageUrl,
                        }
                      : { name: "", imageUrl: "" },
                  }
                : {
                    hash: "",
                    timeDelta: "",
                    text: "",
                    recastsCount: BigInt(0),
                    likesCount: BigInt(0),
                    repliesCount: BigInt(0),
                    author: {
                      fid: "",
                      username: "",
                      displayName: "",
                      pfpUrl: "",
                    },
                    isInChannel: false,
                    channel: {
                      name: "",
                      imageUrl: "",
                    },
                  },
            embedUrl: "embedUrl" in embed ? embed.embedUrl : "",
          })),
        },
        colorTheme === "light" ? 0 : 1,
        screenSize === "sm" ? 0 : 1,
        themeComponentAddress,
      ],
    });
  } else {
    return "Unknown component type for default";
  }
}

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
