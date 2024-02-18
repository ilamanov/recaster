"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { LoadingIndicator } from "@/components/ui/loading-indicator";

const SUGGESTED_USERS = ["dwr.eth", "v", "vitalik.eth"];

export function Search() {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  return (
    <>
      <form
        className="flex gap-2"
        onSubmit={(e) => {
          e.preventDefault();
          const formElement = e.target as HTMLFormElement;
          const inputElement = formElement.elements.namedItem(
            "username"
          ) as HTMLInputElement;
          setIsLoading(true);
          router.push(`/${inputElement.value}`);
        }}
      >
        <Input name="username" className="w-[250px]" />
        <Button type="submit" status={isLoading ? "loading" : undefined}>
          Go!
        </Button>
      </form>
      <div className="flex gap-2 pt-2">
        {SUGGESTED_USERS.map((username) => (
          <UsernameBadge key={username} username={username} />
        ))}
      </div>
    </>
  );
}

function UsernameBadge({ username }: { username: string }) {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  return (
    <Badge
      className="hover:cursor-pointer hover:bg-accent hover:text-accent-foreground"
      variant="outline"
      onClick={() => {
        setIsLoading(true);
        router.push(`/${username}`);
      }}
    >
      {isLoading ? <LoadingIndicator /> : username}
    </Badge>
  );
}
