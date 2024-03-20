"use client";

import { useContext, useEffect, useState } from "react";
import dynamic from "next/dynamic";

import { CastProps } from "@/lib/types";
import { LoadingIndicator } from "@/components/ui/loading-indicator";
import { useToast } from "@/components/ui/use-toast";
import { ClientUserContext } from "@/components/contexts/client-user";
import { ComponentConfigContext } from "@/components/contexts/component-config";

const Component = dynamic(() => import("@/components/near/component"), {
  ssr: false,
});

export function CastPage({ castHash }: { castHash: string }) {
  const [cast, setCast] = useState<CastProps | null>(null);

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

    async function fetchCast() {
      const res = await fetch(`/api/cast`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          castHash,
          //   fid: authData === null ? undefined : authData.fid,
        }),
      });

      const data = await res.json();

      if ("error" in data) {
        toast({
          title: "Error fetching cast",
          description: data.error,
          variant: "destructive",
        });
        return;
      }

      if (!data.cast) {
        toast({
          title: "Error fetching cast",
          description: "No cast returned",
          variant: "destructive",
        });
        return;
      }

      setCast(data.cast);
    }

    fetchCast();
  }, [authData, castHash, toast]);

  if (!componentConfig) {
    return null;
  }

  if (cast === null) {
    return <LoadingIndicator className="mx-auto" />;
  }

  return (
    <Component
      src={componentConfig.cast}
      props={{
        ...cast,
      }}
    />
  );
}
