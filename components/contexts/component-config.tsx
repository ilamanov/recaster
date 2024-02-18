"use client";

import React, { createContext, useEffect, useState } from "react";
import { Address } from "viem";

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
        feed: "0xa046db7dbaac6a26913af2007d3f0f5978001893",
        cast: "0x710c7f4dbe1ea035a3f75d1e6607bdb58b92f42f",
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
