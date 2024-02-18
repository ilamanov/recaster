"use client";

import React, { ReactNode, useEffect } from "react";
import { ThemeProvider } from "next-themes";

import { TooltipProvider } from "@/components/ui/tooltip";
import { ComponentConfigProvider } from "@/components/contexts/component-config";

import { OnChainThemeProvider } from "./on-chain-theme-provider";

export function Providers({ children }: { children: ReactNode }) {
  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      const { command, fid } = event.data as { command: string; fid: string }; // should return https://monobase.xyz/api/ocui/rpc/ethereum
      if (command === "follow") {
        if (event.source) {
          event.source.postMessage(
            { followed: true },
            {
              targetOrigin: event.origin,
            }
          );
        }
      } else if (command === "like") {
        if (event.source) {
          event.source.postMessage(
            { liked: true },
            {
              targetOrigin: event.origin,
            }
          );
        }
      }
    };

    window.addEventListener("message", handleMessage);
  }, []);

  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      <TooltipProvider>
        <ComponentConfigProvider>
          <OnChainThemeProvider>{children}</OnChainThemeProvider>
        </ComponentConfigProvider>
      </TooltipProvider>
    </ThemeProvider>
  );
}
