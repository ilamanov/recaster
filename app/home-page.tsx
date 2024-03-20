"use client";

import { useContext, useEffect, useState } from "react";
import dynamic from "next/dynamic";

import { CastProps } from "@/lib/types";
import { ErrorMessage } from "@/components/ui/error-message";
import { LoadingIndicator } from "@/components/ui/loading-indicator";
import { useToast } from "@/components/ui/use-toast";
import { ClientUserContext } from "@/components/contexts/client-user";
import { ComponentConfigContext } from "@/components/contexts/component-config";

const Component = dynamic(() => import("@/components/near/component"), {
  ssr: false,
});

export function HomePage({}: {}) {
  const [feed, setFeed] = useState<CastProps[] | null>(null);
  const [error, setError] = useState<string | null>(null);

  const { toast } = useToast();

  const clientUserContext = useContext(ClientUserContext);
  const componentConfigContext = useContext(ComponentConfigContext);

  if (clientUserContext === null) {
    throw new Error("ClientUserContext is null");
  }
  if (componentConfigContext === null) {
    throw new Error("ComponentConfigContext is null");
  }

  const { authData } = clientUserContext;
  const componentConfig = componentConfigContext.componentConfig;

  useEffect(() => {
    if (authData === undefined) {
      // have not yet decided whether user is signed in or not
      return;
    }

    async function fetchFeed() {
      let res;
      if (authData === null) {
        // user is not signed in
        res = await fetch(`/api/signed-out/trending-feed`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });
      } else {
        res = await fetch(`/api/user/feed`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            fid: authData?.fid,
          }),
        });
      }

      const data = await res.json();

      if ("error" in data) {
        setError(data.error);
        return;
      }

      if (!data.feed) {
        setError("No feed found");
        return;
      }

      setFeed(data.feed);
    }

    fetchFeed();
  }, [authData]);

  let checkOutMessage;
  if (authData !== undefined) {
    if (authData === null) {
      checkOutMessage = (
        <p className="py-6 text-lg">Or check out trending casts below!</p>
      );
    } else {
      checkOutMessage = (
        <p className="py-6 text-lg">
          Or check out your own customizable feed below!
        </p>
      );
    }
  }

  if (!componentConfig) {
    return checkOutMessage;
  }

  if (error) {
    return (
      <>
        {checkOutMessage}
        <ErrorMessage message={error} />
      </>
    );
  }

  if (feed === null) {
    return (
      <>
        {checkOutMessage}
        <LoadingIndicator className="mx-auto mt-8 text-primary" />
      </>
    );
  }

  return (
    <>
      {checkOutMessage}
      <Component
        src={componentConfig.feed}
        props={{
          casts: feed,
          appUrl: "https://recaster.vercel.app",
          onLike: async (castHash: string) => {
            const res = await fetch("/api/cast/react", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                signerUuid: authData?.signer_uuid,
                reaction: "like",
                castHash: castHash,
              }),
            });
            const result = await res.json();
            if ("error" in result) {
              toast({
                title: "Error liking the cast",
                description: result.error,
                variant: "destructive",
              });
              return;
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
          },
        }}
      />
    </>
  );
}
