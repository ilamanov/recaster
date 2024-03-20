"use client";

import { useContext, useState } from "react";
import { Repeat2 } from "lucide-react";
import { Address, isAddress } from "viem";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { iconVariants } from "@/components/ui/icon";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  ComponentConfig,
  ComponentConfigContext,
} from "@/components/contexts/component-config";

const USER_SUMMARY_SUGGESTIONS: Address[] = [];
const FEED_SUGGESTIONS: Address[] = [];
const CAST_SUGGESTIONS: Address[] = [];

export function RightColumn() {
  const componentConfigContext = useContext(ComponentConfigContext);
  if (componentConfigContext === null) {
    throw new Error("ComponentConfigContext is null");
  }

  if (componentConfigContext.componentConfig === null) {
    return null;
  }

  return (
    <Inner
      componentConfig={componentConfigContext.componentConfig}
      setComponentConfig={componentConfigContext.setComponentConfig}
    />
  );
}

function Inner({
  componentConfig,
  setComponentConfig,
}: {
  componentConfig: ComponentConfig;
  setComponentConfig: (config: ComponentConfig) => void;
}) {
  const [userSummary, setUserSummary] = useState<string>(
    componentConfig.userSummary
  );
  const [userSummaryError, setUserSummaryError] = useState<string | undefined>(
    undefined
  );

  const [feed, setFeed] = useState<string>(componentConfig.feed);
  const [feedError, setFeedError] = useState<string | undefined>(undefined);

  const [cast, setCast] = useState<string>(componentConfig.cast);
  const [castError, setCastError] = useState<string | undefined>(undefined);

  const [theme, setTheme] = useState<string>(componentConfig.theme);
  const [themeError, setThemeError] = useState<string | undefined>(undefined);

  return (
    <>
      <form
        className="flex flex-col gap-6 mt-4 px-2"
        onSubmit={(e) => {
          e.preventDefault();

          let errors = false;

          if (!isAddress(theme)) {
            setThemeError("Invalid address");
            errors = true;
          }

          if (errors) {
            return;
          }

          setComponentConfig({
            ...componentConfig,
            userSummary: userSummary,
            feed: feed,
            cast: cast as Address,
            theme: theme as Address,
          });
        }}
      >
        <div>
          <h2 className="text-base font-bold">Onchain component config</h2>
          <h2 className="text-base">
            Enter component addresses below. All contracts are on the Near
            blockchain.
          </h2>
        </div>

        <ComponentSelector
          label="Theme"
          id="theme-component"
          value={
            theme === "0xe91b043472ba7067a898a42b1f1881713dd5c4b7"
              ? "recaster.testnet/widget/Theme"
              : theme === "0x23f943b9bf6b6f0791ca17126ff89c2968abd6a1"
                ? "recaster.testnet/widget/Neobrutalism"
                : theme
          }
          setValue={setTheme}
          suggestions={
            theme === "0x23f943b9bf6b6f0791ca17126ff89c2968abd6a1"
              ? ["0xe91b043472ba7067a898a42b1f1881713dd5c4b7"]
              : theme === "0xe91b043472ba7067a898a42b1f1881713dd5c4b7"
                ? ["0x23f943b9bf6b6f0791ca17126ff89c2968abd6a1"]
                : ["0xe91b043472ba7067a898a42b1f1881713dd5c4b7"]
          }
          error={themeError}
        />

        <ComponentSelector
          label="User summary"
          id="user-summary-component"
          value={userSummary}
          setValue={setUserSummary}
          suggestions={USER_SUMMARY_SUGGESTIONS}
          error={userSummaryError}
        />

        <ComponentSelector
          label="Feed"
          id="feed-component"
          value={feed}
          setValue={setFeed}
          suggestions={FEED_SUGGESTIONS}
          error={feedError}
        />

        <ComponentSelector
          label="Cast"
          id="cast-component"
          value={cast}
          setValue={setCast}
          suggestions={CAST_SUGGESTIONS}
          error={castError}
        />

        <div className="flex justify-end mt-4">
          <Button type="submit" variant="outline">
            <Repeat2
              className={iconVariants({ size: "sm", className: "mr-2" })}
            />{" "}
            Apply
          </Button>
        </div>
      </form>
      {/* <div className="mt-4 flex justify-end">
        <ThemeToggle />
      </div> */}
    </>
  );
}

function ComponentSelector({
  label,
  id,
  value,
  setValue,
  suggestions,
  error,
}: {
  label: string;
  id: string;
  value: string;
  setValue: (value: string) => void;
  suggestions: Address[];
  error?: string;
}) {
  return (
    <div>
      <Label htmlFor={id}>{label}</Label>
      <Input id={id} value={value} onChange={(e) => setValue(e.target.value)} />
      {error && <p className="text-destructive">{error}</p>}

      <div className="mt-2 flex flex-wrap gap-2">
        {suggestions.map((address) => (
          <Badge
            className="hover:cursor-pointer hover:bg-accent hover:text-accent-foreground"
            key={address}
            variant="outline"
            onClick={() => {
              setValue(address);
            }}
          >
            {address === "0x23f943b9bf6b6f0791ca17126ff89c2968abd6a1"
              ? "recaster.testnet/widget/Neobrutalism"
              : address === "0xe91b043472ba7067a898a42b1f1881713dd5c4b7"
                ? "recaster.testnet/widget/Theme"
                : `${address.slice(0, 5)}...${address.slice(-4)}`}
          </Badge>
        ))}
      </div>
    </div>
  );
}
