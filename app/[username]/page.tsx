import { getUser } from "@/lib/neynar";
import { ErrorMessage } from "@/components/ui/error-message";

import { UserPage } from "./user-page";

export default async function UserServerPage({
  params,
}: {
  params: { username: string };
}) {
  const user = await getUser(params.username);
  if (!user) {
    return <ErrorMessage message="User not found" />;
  }

  return <UserPage user={user} />;
}
