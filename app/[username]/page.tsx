import { FilterType } from "@neynar/nodejs-sdk";

import { getFeed, getUser } from "@/lib/neynar";
import { ErrorMessage } from "@/components/ui/error-message";
import { UserPage } from "./UserPage";


export default async function UserServerPage({
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

  return <UserPage user={user} feed={feed} />;
}
