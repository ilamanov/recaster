"use client";

import { useContext } from "react";
import { useRouter } from "next/navigation";

import { NEYNAR_AUTH_DATA_LOCAL_STORAGE_KEY } from "@/lib/neynar";
import { Button } from "@/components/ui/button";
import { LoadingIndicator } from "@/components/ui/loading-indicator";
import { ClientUserContext } from "@/components/contexts/client-user";

export function ProfilePage() {
  const router = useRouter();

  const clientUserContext = useContext(ClientUserContext);

  if (clientUserContext === null) {
    throw new Error("ClientUserContext is null");
  }

  const { authData, checkAuth, user } = clientUserContext;

  if (authData === undefined) {
    return null;
  }

  if (user === null) {
    return <LoadingIndicator className="mx-auto mt-4" />;
  }

  // avatar on the left and the right is the name and username underneath. Below everything is a sign out button
  return (
    <div className="flex flex-col">
      <img
        src={user.pfp.url}
        alt="avatar"
        className="rounded-full h-20 w-20 mt-4"
      />
      <div className="my-4">
        <h1 className="text-2xl font-bold">{user.displayName}</h1>
        <p className="text-lg text-gray-500">@{user.username}</p>
      </div>
      <div className="flex justify-end">
        <Button
          onClick={() => {
            localStorage.removeItem(NEYNAR_AUTH_DATA_LOCAL_STORAGE_KEY);
            checkAuth();
            router.push("/");
          }}
          variant="destructive"
          className="w-fit"
        >
          Sign out
        </Button>
      </div>
    </div>
  );
}
