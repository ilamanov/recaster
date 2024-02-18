import { CastWithInteractions as CastWithInteractionsV1 } from "@neynar/nodejs-sdk/build/neynar-api/v1";
import { CastWithInteractions as CastWithInteractionsV2 } from "@neynar/nodejs-sdk/build/neynar-api/v2";

const CHANNEL_PREFIX = "https://warpcast.com/~/channel/";

export function getPostedInChannel(
  cast: CastWithInteractionsV1 | CastWithInteractionsV2
): string | null {
  const parentUrl = "parent_url" in cast ? cast.parent_url : cast.parentUrl;

  if (!parentUrl || !parentUrl.startsWith(CHANNEL_PREFIX)) {
    return null;
  }
  return parentUrl.slice(CHANNEL_PREFIX.length);
}

export function isEmbedACast(url: string) {
  return url.startsWith("https://warpcast.com/~/cast/");
}
