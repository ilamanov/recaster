import {
  CastParamType,
  FeedType,
  FilterType,
  NeynarAPIClient,
} from "@neynar/nodejs-sdk";
import { CastWithInteractions as CastWithInteractionsV1 } from "@neynar/nodejs-sdk/build/neynar-api/v1";
import { CastWithInteractions as CastWithInteractionsV2 } from "@neynar/nodejs-sdk/build/neynar-api/v2";

import { getPostedInChannel, isEmbedACast } from "./farcaster";
import { CastEmbed, CastProps, UserSummaryProps } from "./types";

export const client = new NeynarAPIClient(process.env.NEYNAR_API_KEY as string);

export const NEYNAR_AUTH_DATA_LOCAL_STORAGE_KEY = "neynar_auth_data";

export interface AuthData {
  is_authenticated: boolean;
  signer_uuid: string;
  fid: number;
}

export async function getUser(
  username: string
): Promise<UserSummaryProps | null> {
  try {
    const user = (await client.lookupUserByUsername(username)).result.user;
    return {
      pfp: { url: user.pfp.url },
      username: user.username,
      displayName: user.displayName,
      fid: user.fid,
      profile: { bio: { text: user.profile.bio.text } },
      followingCount: user.followingCount,
      followerCount: user.followerCount,
    };
  } catch (e) {
    console.error("Error fetching user", e);
    return null;
  }
}

export async function getCast(castHash: string): Promise<CastProps | null> {
  try {
    const cast = (await client.lookUpCastByHash(castHash)).result.cast;
    return await convertCast(cast);
  } catch (e) {
    console.error("Error fetching cast", e);
    return null;
  }
}

async function convertCast(
  cast: CastWithInteractionsV1 | CastWithInteractionsV2
): Promise<CastProps> {
  // const reactionsHashes = (
  //   await client.fetchCastReactions(cast.hash)
  // ).result.casts.map((cast) => cast.hash);
  // let reactions = {
  //   casts: [] as CastWithInteractions[],
  //   embeddedCasts: {},
  //   channels: {},
  //   authors: {},
  // };
  // if (reactionsHashes.length > 0) {
  //   const reactionsCasts = (await client.fetchBulkCasts(reactionsHashes))
  //     .result.casts;
  //   const reactionsExtraData = await Promise.all(reactionsCasts.map((cast) => convertCast(cast)));
  //   reactions = {
  //     casts: reactionsCasts,
  //     ...reactionsExtraData,
  //   };
  // }

  let channel: { name: string; imageUrl: string } | undefined;
  const postedInChannel = getPostedInChannel(cast);
  if (postedInChannel) {
    const fetchedChannel = (await client.lookupChannel(postedInChannel))
      .channel;
    channel = {
      name: fetchedChannel.name || "",
      imageUrl: fetchedChannel.image_url || "",
    };
  }

  let author: {
    fid: number;
    username: string;
    displayName: string;
    pfpUrl: string;
  };
  if ("username" in cast.author) {
    author = {
      fid: cast.author.fid,
      username: cast.author.username,
      displayName:
        "displayName" in cast.author
          ? cast.author.displayName
          : cast.author.display_name,
      pfpUrl:
        "pfp_url" in cast.author ? cast.author.pfp_url : cast.author.pfp.url,
    };
  } else {
    const fetchedAuthor = (
      await client.lookupUserByFid(parseInt(cast.author.fid))
    ).result.user;
    author = {
      fid: fetchedAuthor.fid,
      username: fetchedAuthor.username,
      displayName: fetchedAuthor.displayName,
      pfpUrl: fetchedAuthor.pfp.url,
    };
  }

  const embeds: CastEmbed[] = [];
  if (cast.embeds.length > 0) {
    if ("url" in cast.embeds[0]) {
      const embedUrl = cast.embeds[0].url;
      if (isEmbedACast(embedUrl)) {
        const embeddedCast = (
          await client.lookUpCastByHashOrWarpcastUrl(
            embedUrl,
            CastParamType.Url
          )
        ).cast;
        embeds.push({ cast: await convertCast(embeddedCast) });
      }
    } else {
      const embeddedCast = (
        await client.lookUpCastByHashOrWarpcastUrl(
          cast.embeds[0].cast_id.hash,
          CastParamType.Hash
        )
      ).cast;
      embeds.push({ cast: await convertCast(embeddedCast) });
    }
  }

  return {
    hash: cast.hash,
    timeDelta: getTimeDelta(cast.timestamp),
    text: cast.text,
    recastsCount:
      "recasts" in cast ? cast.recasts.count : cast.reactions.recasts.length,
    likesCount:
      "likes" in cast.reactions
        ? cast.reactions.likes.length
        : cast.reactions.count,
    repliesCount: cast.replies.count,
    author,
    channel,
    embeds,
  };
}

export async function getFeed(
  filterType: FilterType,
  forFids: number[]
): Promise<CastProps[] | null> {
  try {
    const feedResult = await client.fetchFeed(FeedType.Filter, {
      filterType,
      fids: forFids,
    });
    return await Promise.all(feedResult.casts.map((cast) => convertCast(cast)));
  } catch (e) {
    console.error("Error fetching feed", e);
    return null;
  }
}

function getTimeDelta(timestamp: string) {
  const timeElapsed = getTimeElapsed(timestamp);

  if (timeElapsed.days > 0) {
    return `${timeElapsed.days}d`;
  } else if (timeElapsed.hours > 0) {
    return `${timeElapsed.hours}h`;
  } else if (timeElapsed.minutes > 0) {
    return `${timeElapsed.minutes}m`;
  } else {
    return `${timeElapsed.seconds}s`;
  }
}

function getTimeElapsed(timestamp: string) {
  // Parse the given timestamp
  const pastDate = new Date(timestamp);

  // Get current date
  const currentDate = new Date();

  // Calculate difference in milliseconds
  let diff = currentDate.getTime() - pastDate.getTime();

  // Convert difference to a more readable format
  const seconds = Math.floor(diff / 1000); // Convert milliseconds to seconds
  const minutes = Math.floor(seconds / 60); // Convert seconds to minutes
  const hours = Math.floor(minutes / 60); // Convert minutes to hours
  const days = Math.floor(hours / 24); // Convert hours to days

  // Update diff to represent the remainder for the next largest unit
  diff -= days * 24 * 60 * 60 * 1000;
  diff -= (hours % 24) * 60 * 60 * 1000;
  diff -= (minutes % 60) * 60 * 1000;
  const remainingSeconds = Math.floor(diff / 1000);

  return {
    days,
    hours: hours % 24,
    minutes: minutes % 60,
    seconds: remainingSeconds,
  };
}
