import { getCast } from "@/lib/neynar";
import { ErrorMessage } from "@/components/ui/error-message";
import { OnChainComponent } from "@/components/on-chain-component";

export default async function CastPage({
  params,
}: {
  params: { castHash: string };
}) {
  const cast = await getCast(params.castHash);

  if (!cast) {
    return <ErrorMessage message="Cast not found" />;
  }

  return (
    <>
      <OnChainComponent
        componentType="cast"
        data={cast}
        iframeClassName="w-full h-[500px] mt-6"
      />
      {/* <OnChainComponent
        componentType="feed"
        data={{
          casts: cast.reactions.casts,
          embeddedCasts: cast.reactions.embeddedCasts,
          channels: cast.reactions.channels,
          authors: cast.reactions.authors,
        }}
        iframeClassName="h-[100vh] w-full"
      /> */}
    </>
  );
}
