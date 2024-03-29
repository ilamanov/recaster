"use client";

import React, { createContext, useEffect, useState } from "react";
import { Address } from "viem";

export interface ComponentConfig {
  userSummary: string;
  feed: string;
  cast: string;
  theme: Address;
}

interface ComponentConfigContextType {
  componentConfig: ComponentConfig | null;
  setComponentConfig: (config: ComponentConfig) => void;
}

export const ComponentConfigContext =
  createContext<ComponentConfigContextType | null>(null);

const LOCAL_STORAGE_KEY = "componentConfig";

export function ComponentConfigProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [componentConfig, setComponentConfig] =
    useState<ComponentConfig | null>(null);

  useEffect(() => {
    const localConfig = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (localConfig === null) {
      setComponentConfig({
        userSummary: "recaster.testnet/widget/UserSummary",
        feed: "recaster.testnet/widget/Feed",
        cast: "recaster.testnet/widget/Cast",
        theme: "0xe91b043472ba7067a898a42b1f1881713dd5c4b7",
      });
    } else {
      setComponentConfig(JSON.parse(localConfig));
    }
  }, []);

  return (
    <ComponentConfigContext.Provider
      value={{
        componentConfig,
        setComponentConfig: (config: ComponentConfig) => {
          localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(config));
          setComponentConfig(config);
        },
      }}
    >
      {children}
    </ComponentConfigContext.Provider>
  );
}
