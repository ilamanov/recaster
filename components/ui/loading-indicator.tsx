import { Loader2 } from "lucide-react";

import { cn } from "@/lib/utils";

import { iconVariants } from "./icon";

export function LoadingIndicator({ className }: { className?: string }) {
  return (
    <Loader2
      className={iconVariants({
        size: "xs",
        className: cn("animate-spin text-brand", className),
      })}
    />
  );
}
