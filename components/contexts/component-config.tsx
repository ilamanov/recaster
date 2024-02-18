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
        userSummary: "0xbea6d1d4ebd1e4c6053aea6e1a0e1e6215ab0bb2",
        feed: zeroAddress,
        cast: zeroAddress,
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
