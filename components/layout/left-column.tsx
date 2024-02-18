import Link from "next/link";
import { Home, Repeat2, Search } from "lucide-react";

import { cn } from "@/lib/utils";
import { iconVariants } from "@/components/ui/icon";
import { SignIn } from "@/components/sign-in";

const LINK_CLASS =
  "hover:no-underline hover:bg-muted hover:text-muted-foreground p-[6px] rounded-lg";
const ICON_CLASS = cn(
  iconVariants({ size: "sm" }),
  "text-muted-foreground inline-block"
);

export function LeftColumn() {
  return (
    <>
      <div className="flex flex-wrap lg:flex-nowrap lg:justify-between pt-4 px-4">
        <Link href="/">
          <div className="rounded-lg p-[2px] border bg-accent">
            <Repeat2
              className={cn(
                iconVariants({
                  size: "lg",
                }),
                "text-accent-foreground"
              )}
            />
          </div>
        </Link>
        <SignIn />
      </div>
      <div className="mt-6 pl-2 flex flex-col gap-1">
        <Link href="/" className={LINK_CLASS}>
          <Home className={ICON_CLASS} /> Home
        </Link>
        <Link href="/explore" className={LINK_CLASS}>
          <Search className={ICON_CLASS} /> Explore
        </Link>
      </div>
    </>
  );
}
