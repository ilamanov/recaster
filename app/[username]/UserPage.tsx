"use client";

import { useContext, useEffect } from "react";
import dynamic from "next/dynamic";

import { CastProps, UserSummaryProps } from "@/lib/types";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ComponentConfigContext } from "@/components/contexts/component-config";
import { OnChainComponent } from "@/components/on-chain-component";

const Component = dynamic(() => import("@/components/near/component"), {
  ssr: false,
});

declare const Hls: any | undefined;

export function UserPage({
  user,
  feed,
}: {
  user: UserSummaryProps;
  feed: CastProps[];
}) {
  const castsOnly = feed.filter((cast) => cast.author.fid === user.fid);

  const componentConfigContext = useContext(ComponentConfigContext);

  if (componentConfigContext === null) {
    throw new Error("ComponentConfigContext is null");
  }

  const componentConfig = componentConfigContext.componentConfig;

  function initializeHLS(videoElement: HTMLVideoElement) {
    var videoSrc = videoElement.getAttribute("data-src");
    if (Hls.isSupported()) {
      var hls = new Hls();
      hls.loadSource(videoSrc);
      hls.attachMedia(videoElement);
      hls.on(Hls.Events.MANIFEST_PARSED, function () {
        // videoElement.play();
      });
    } else if (
      videoElement.canPlayType("application/vnd.apple.mpegurl") &&
      videoSrc
    ) {
      videoElement.src = videoSrc;
      videoElement.addEventListener("loadedmetadata", function () {
        // videoElement.play();
      });
    }
  }

  useEffect(() => {
    var videoPlayers = document.querySelectorAll(".rc-video-player");
    videoPlayers.forEach((p) => initializeHLS(p as HTMLVideoElement));
  }, []);

  return (
    <>
      {componentConfig && (
        <Component
          src={componentConfig.userSummary}
          props={{
            ...user,
            mutualFollows: [],
            appUrl: "https://recaster.vercel.app",
            onFollow: () => {
              console.log("followed");
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
          <OnChainComponent
            componentType="feed"
            data={feed}
            iframeClassName="h-[80vh] w-[60vw]"
          />
        </TabsContent>
      </Tabs>
    </>
  );
}
