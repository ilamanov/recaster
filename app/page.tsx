import { FilterType } from "@neynar/nodejs-sdk";

import { getFeed } from "@/lib/neynar";
import { ErrorMessage } from "@/components/ui/error-message";
import { OnChainComponent } from "@/components/on-chain-component";
import { Search } from "@/components/search";

export default async function HomePage({}: {}) {
  const feed = await getFeed(FilterType.GlobalTrending, []);

  if (!feed) {
    return <ErrorMessage message="Error fetching feed" />;
  }

  return (
    <>
      <div className="w-full">
        <h3 className="text-2xl font-bold text-accent pt-4">
          Welcome to Recaster!
        </h3>
        <p className="py-2 text-lg">
          Recaster allows you to remix your Farcaster experience to your liking.
          Simply change the on-chain component config on the right to change the
          appearance of your feed. If you want to contribute and add your own
          components head over to TODO
        </p>
        <p className="py-2 text-lg">
          Check out your favorite person&apos;s feed!
        </p>
        <Search />
        <p className="py-6 text-lg border-b-[2px]">
          Or check out trending casts below!
        </p>
      </div>
      <OnChainComponent
        componentType="feed"
        data={feed}
        iframeClassName="h-[100vh] w-full"
      />
    </>
  );
}
