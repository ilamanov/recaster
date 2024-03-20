"use client";

import { useContext, useEffect, useState } from "react";
import { useTheme } from "next-themes";
import { Address } from "viem";

import { fetchComponent } from "@/lib/on-chain-component";
import { OnChainComponentProps } from "@/lib/types";
import { ComponentConfigContext } from "@/components/contexts/component-config";

export function OnChainComponent({
  componentType,
  data,
  iframeClassName,
}: OnChainComponentProps & {
  iframeClassName?: string;
}) {
  const [fetchedComponent, setFetchedComponent] = useState<string | null>(null);

  const { resolvedTheme } = useTheme();

  const componentConfigContext = useContext(ComponentConfigContext);

  if (componentConfigContext === null) {
    throw new Error("ComponentConfigContext is null");
  }

  useEffect(() => {
    if (componentConfigContext.componentConfig !== null) {
      fetchComponent({
        address: componentConfigContext.componentConfig[
          componentType
        ] as Address,
        componentType: componentType as any,
        data: data as any,
        colorTheme: resolvedTheme || "dark",
        screenSize: "md",
        themeComponentAddress: componentConfigContext.componentConfig.theme,
      }).then(setFetchedComponent);
    }
  }, [componentConfigContext, componentType, data, resolvedTheme]);

  return (
    <iframe
      className={iframeClassName}
      srcDoc={fetchedComponent || ""}
    ></iframe>
  );
}
