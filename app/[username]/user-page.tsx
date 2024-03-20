"use client";

import { useContext, useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { BulkFollowResponse } from "@neynar/nodejs-sdk/build/neynar-api/v2";

import { AuthData } from "@/lib/neynar";
import { CastProps, UserSummaryProps } from "@/lib/types";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ClientUserContext } from "@/components/contexts/client-user";
import { ComponentConfigContext } from "@/components/contexts/component-config";

const Component = dynamic(() => import("@/components/near/component"), {
  ssr: false,
});

// declare const Hls: any | undefined;

async function followOrUnfollowUser(
  authData: AuthData | null,
  fid: number,
  follow: boolean
) {
  const signerUuid = authData?.signer_uuid;
  if (!signerUuid) {
    console.error("You need to sign in first.");
    return false;
  }

  const res = await fetch(follow ? "/api/user/follow" : "/api/user/unfollow", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      signerUuid,
      fid,
    }),
  });
  const result: BulkFollowResponse = await res.json();

  if (!result.success || !result.details[0].success) {
    console.error(follow ? "Error following user" : "Error unfollowing user");
    return false;
  }

  return true;
}

export function UserPage({
  user,
  feed,
}: {
  user: UserSummaryProps;
  feed: CastProps[];
}) {
  const [isFollowing, setIsFollowing] = useState(false);

  const clientUserContext = useContext(ClientUserContext);
  const componentConfigContext = useContext(ComponentConfigContext);

  if (clientUserContext === null) {
    throw new Error("ClientUserContext is null");
  }
  if (componentConfigContext === null) {
    throw new Error("ComponentConfigContext is null");
  }

  const { authData, followingUsers } = clientUserContext;
  const componentConfig = componentConfigContext.componentConfig;

  const castsOnly = feed.filter((cast) => cast.author.fid === user.fid);

  useEffect(() => {
    if (!isFollowing && followingUsers) {
      setIsFollowing(
        followingUsers.some((followingUser) => followingUser.fid === user.fid)
      );
    }
  }, [isFollowing, user.fid, followingUsers]);

  // function initializeHLS(videoElement: HTMLVideoElement) {
  //   var videoSrc = videoElement.getAttribute("data-src");
  //   if (Hls.isSupported()) {
  //     var hls = new Hls();
  //     hls.loadSource(videoSrc);
  //     hls.attachMedia(videoElement);
  //     hls.on(Hls.Events.MANIFEST_PARSED, function () {
  //       // videoElement.play();
  //     });
  //   } else if (
  //     videoElement.canPlayType("application/vnd.apple.mpegurl") &&
  //     videoSrc
  //   ) {
  //     videoElement.src = videoSrc;
  //     videoElement.addEventListener("loadedmetadata", function () {
  //       // videoElement.play();
  //     });
  //   }
  // }

  // useEffect(() => {
  //   var videoPlayers = document.querySelectorAll(".rc-video-player");
  //   videoPlayers.forEach((p) => initializeHLS(p as HTMLVideoElement));
  // }, []);

  return (
    <>
      {componentConfig && (
        <Component
          src={componentConfig.userSummary}
          props={{
            ...user,
            appUrl: "https://recaster.vercel.app",
            isFollowing,
            onFollow: () => {
              followOrUnfollowUser(authData, user.fid, true).then((result) => {
                if (result) {
                  setIsFollowing(true);
                }
              });
            },
            onUnfollow: () => {
              followOrUnfollowUser(authData, user.fid, false).then((result) => {
                if (result) {
                  setIsFollowing(false);
                }
              });
            },
          }}
        />
      )}
      <Tabs defaultValue="casts" className="w-full py-3">
        <TabsList className="w-full p-3">
          <TabsTrigger value="casts">Casts</TabsTrigger>
          <TabsTrigger value="casts-replies">Casts + Replies</TabsTrigger>
        </TabsList>
        <TabsContent value="casts">
          {componentConfig && (
            <Component
              src={componentConfig.feed}
              props={{
                casts: castsOnly,
                appUrl: "https://recaster.vercel.app",
              }}
            />
          )}
        </TabsContent>
        <TabsContent value="casts-replies">
          {componentConfig && (
            <Component
              src={componentConfig.feed}
              props={{
                casts: feed,
                appUrl: "https://recaster.vercel.app",
              }}
            />
          )}
        </TabsContent>
      </Tabs>
    </>
  );
}
