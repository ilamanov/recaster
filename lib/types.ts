export type UserSummaryProps = {
  pfp: { url: string };
  username: string;
  custodyAddress: string;
  displayName: string;
  fid: number;
  profile: { bio: { text: string } };
  followingCount: number;
  followerCount: number;
};

export interface CastProps {
  hash: string;
  timestamp: string;
  text: string;
  recastsCount: number;
  likesCount: number;
  repliesCount: number;
  author: {
    fid: number;
    username: string;
    displayName: string;
    pfpUrl: string;
  };
  channel?: { name: string; imageUrl: string };
  embeds: CastEmbed[];
}

export type CastEmbed = { cast: EmbeddedCast } | { embedUrl: string };

export interface EmbeddedCast {
  hash: string;
  timestamp: string;
  text: string;
  recastsCount: number;
  likesCount: number;
  repliesCount: number;
  author: {
    fid: number;
    username: string;
    displayName: string;
    pfpUrl: string;
  };
  channel?: { name: string; imageUrl: string };
}

export type OnChainComponentProps =
  | {
      componentType: "userSummary";
      data: UserSummaryProps;
    }
  | {
      componentType: "feed";
      data: CastProps[];
    }
  | {
      componentType: "cast";
      data: CastProps;
    };
