"use client";

import { useContext, useEffect } from "react";
import { useTheme } from "next-themes";

import { fetchTheme } from "@/lib/on-chain-component";
import { ComponentConfigContext } from "@/components/contexts/component-config";

export function OnChainThemeProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const { resolvedTheme } = useTheme();

  const componentConfigContext = useContext(ComponentConfigContext);

  if (componentConfigContext === null) {
    throw new Error("ComponentConfigContext is null");
  }

  useEffect(() => {
    if (componentConfigContext.componentConfig !== null) {
      fetchTheme({
        address: componentConfigContext.componentConfig.theme,
        colorTheme: resolvedTheme || "dark",
        screenSize: "md",
      }).then((cssVars) => {
        const root = document.documentElement;
        cssVars.split(";").forEach((varStatement) => {
          if (varStatement.trim()) {
            const [key, value] = varStatement.split(":").map((s) => s.trim());
            if (key.startsWith("--")) {
              root.style.setProperty(key, value);
            }
          }
        });
      });
    }
  }, [componentConfigContext.componentConfig, resolvedTheme]);

  return children;
}
