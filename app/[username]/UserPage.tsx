"use client";

import dynamic from "next/dynamic";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { OnChainComponent } from "@/components/on-chain-component";
import { CastProps, UserSummaryProps } from "@/lib/types";

const Component = dynamic(() => import("@/components/near/component"), {
  ssr: false,
});

export function UserPage({user, feed}: {user: UserSummaryProps, feed: CastProps[]}) {
    const castsOnly = feed.filter((cast) => cast.author.fid === user.fid);

  return (
    <>
      <Component
        src="recaster.testnet/widget/UserSummary"
        props={{ ...user, mutualFollows: [], appUrl: "https://recaster.vercel.app", onFollow: () => {
          console.log("followed");
        } }}
      />
      <OnChainComponent
        componentType="userSummary"
        data={user}
        iframeClassName="h-[250px] md:h-[200px] w-full"
      />
      <Tabs defaultValue="casts" className="w-full">
        <TabsList className="w-full">
          <TabsTrigger value="casts">Casts</TabsTrigger>
          <TabsTrigger value="casts-replies">Casts + Replies</TabsTrigger>
        </TabsList>
        <TabsContent value="casts">
          <OnChainComponent
            componentType="feed"
            data={castsOnly}
            iframeClassName="h-[100vh] w-full"
          />
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