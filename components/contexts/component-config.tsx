"use client";

import React, { createContext, useEffect, useState } from "react";
import { Address, zeroAddress } from "viem";

export interface ComponentConfig {
  userSummary: Address;
  feed: Address;
  cast: Address;
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
        userSummary: "0x940303f089f4450a2398a8ed1c192929f070128b",
        feed: zeroAddress,
        cast: "0x710c7f4dbe1ea035a3f75d1e6607bdb58b92f42f",
        theme: "0xb56d7d872f42db707f06828674f8df2a0d5ed695",
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
