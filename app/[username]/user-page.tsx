"use client";

import { useContext, useEffect, useMemo, useState } from "react";
import dynamic from "next/dynamic";
import { FilterType } from "@neynar/nodejs-sdk";
import { BulkFollowResponse } from "@neynar/nodejs-sdk/build/neynar-api/v2";

import { AuthData } from "@/lib/neynar";
import { CastProps, UserSummaryProps } from "@/lib/types";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/components/ui/use-toast";
import { ClientUserContext } from "@/components/contexts/client-user";
import { ComponentConfigContext } from "@/components/contexts/component-config";

const Component = dynamic(() => import("@/components/near/component"), {
  ssr: false,
});

// declare const Hls: any | undefined;

async function followOrUnfollowUser(
  authData: AuthData | undefined | null,
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

export function UserPage({ user }: { user: UserSummaryProps }) {
  const [isFollowing, setIsFollowing] = useState(false);
  const [feed, setFeed] = useState<CastProps[] | null>(null);

  const { toast } = useToast();

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

  useEffect(() => {
    if (!isFollowing && followingUsers) {
      setIsFollowing(
        followingUsers.some((followingUser) => followingUser.fid === user.fid)
      );
    }
  }, [isFollowing, user.fid, followingUsers]);

  useEffect(() => {
    if (authData === undefined) {
      // have not yet decided whether user is signed in or not
      return;
    }

    async function fetchFeed() {
      const res = await fetch(`/api/feed`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          filterType: FilterType.Fids,
          forFids: [user.fid],
          fid: authData === null ? undefined : authData?.fid,
        }),
      });
      const data = await res.json();

      if ("error" in data) {
        toast({
          title: "Error fetching feed",
          description: data.error,
          variant: "destructive",
        });
        return;
      }

      if (!data.feed) {
        toast({
          title: "No feed found",
          variant: "destructive",
        });
        return;
      }

      setFeed(data.feed);
    }

    fetchFeed();
  }, [authData, toast, user.fid]);

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

  const castsOnly = useMemo(() => {
    return feed === null
      ? null
      : feed.filter((cast) => cast.author.fid === user.fid);
  }, [feed, user.fid]);

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
          {componentConfig && castsOnly !== null && (
            <Component
              src={componentConfig.feed}
              props={{
                casts: castsOnly,
                appUrl: "https://recaster.vercel.app",
                onLike: (castHash: string) => {
                  if (authData) {
                    fetch("/api/cast/react", {
                      method: "POST",
                      headers: {
                        "Content-Type": "application/json",
                      },
                      body: JSON.stringify({
                        signerUuid: authData.signer_uuid,
                        reaction: "like",
                        castHash: castHash,
                      }),
                    })
                      .then((res) => res.json())
                      .then((result) => {
                        if ("error" in result) {
                          throw new Error(result.error);
                        }

                        setFeed((oldFeed) => {
                          if (!oldFeed) {
                            return oldFeed;
                          }
                          return oldFeed.map((cast) => {
                            if (cast.hash === castHash) {
                              return {
                                ...cast,
                                reactions: {
                                  liked: true,
                                },
                                likesCount: cast.likesCount + 1,
                              };
                            }
                            return cast;
                          });
                        });
                      })
                      .catch((err) => {
                        toast({
                          title: "Error liking the cast",
                          description: err.toString(),
                          variant: "destructive",
                        });
                      });
                  }
                },
              }}
            />
          )}
        </TabsContent>
        <TabsContent value="casts-replies">
          {componentConfig && feed !== null && (
            <Component
              src={componentConfig.feed}
              props={{
                casts: feed,
                appUrl: "https://recaster.vercel.app",
                onLike: (castHash: string) => {
                  if (authData) {
                    fetch("/api/cast/react", {
                      method: "POST",
                      headers: {
                        "Content-Type": "application/json",
                      },
                      body: JSON.stringify({
                        signerUuid: authData.signer_uuid,
                        reaction: "like",
                        castHash: castHash,
                      }),
                    })
                      .then((res) => res.json())
                      .then((result) => {
                        if ("error" in result) {
                          throw new Error(result.error);
                        }

                        setFeed((oldFeed) => {
                          if (!oldFeed) {
                            return oldFeed;
                          }
                          return oldFeed.map((cast) => {
                            if (cast.hash === castHash) {
                              return {
                                ...cast,
                                reactions: {
                                  liked: true,
                                },
                                likesCount: cast.likesCount + 1,
                              };
                            }
                            return cast;
                          });
                        });
                      })
                      .catch((err) => {
                        toast({
                          title: "Error liking the cast",
                          description: err.toString(),
                          variant: "destructive",
                        });
                      });
                  }
                },
              }}
            />
          )}
        </TabsContent>
      </Tabs>
    </>
  );
}
