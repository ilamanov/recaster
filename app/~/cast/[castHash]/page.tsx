import { CastPage } from "./cast-page";

export default async function ServerCastPage({
  params,
}: {
  params: { castHash: string };
}) {
  return <CastPage castHash={params.castHash} />;
}
