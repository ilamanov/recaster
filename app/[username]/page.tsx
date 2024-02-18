import { FilterType } from "@neynar/nodejs-sdk";

import { getFeed, getUser } from "@/lib/neynar";
import { ErrorMessage } from "@/components/ui/error-message";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { OnChainComponent } from "@/components/on-chain-component";

export default async function UserPage({
  params,
}: {
  params: { username: string };
}) {
  const user = await getUser(params.username);
  if (!user) {
    return <ErrorMessage message="User not found" />;
  }
  const feed = await getFeed(FilterType.Fids, user ? [user.fid] : []);
  if (!feed) {
    return <ErrorMessage message="Error fetching feed" />;
  }

  const castsOnly = feed.filter((cast) => cast.author.fid === user?.fid);

  return (
    <>
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
