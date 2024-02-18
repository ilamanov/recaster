"use client";

import React from "react";
import { Copy } from "lucide-react";

import { Button } from "./button";
import { iconVariants } from "./icon";
import { Popover, PopoverContent, PopoverTrigger } from "./popover";

export function CopyToClipboard({
  getValueToCopy,
  copiedText,
  buttonClassName,
}: {
  getValueToCopy: () => string;
  copiedText?: string;
  buttonClassName?: string;
}) {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant="ghost"
          title="Copy"
          className={buttonClassName}
          onClick={() => navigator.clipboard.writeText(getValueToCopy())}
        >
          <Copy
            className={iconVariants({
              size: "tiny",
            })}
          />
        </Button>
      </PopoverTrigger>
      <PopoverContent
        className="border-foreground bg-background text-foreground"
        side="top"
      >
        {copiedText || "copied!"}
      </PopoverContent>
    </Popover>
  );
}
