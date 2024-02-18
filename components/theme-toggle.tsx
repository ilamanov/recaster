"use client";

import { Monitor, Moon, SunMedium } from "lucide-react";
import { useTheme } from "next-themes";

import { cn } from "@/lib/utils";
import { ClientOnly } from "@/components/ui/client-only";
import { iconVariants } from "@/components/ui/icon";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
} from "@/components/ui/select";

export function ThemeToggle({ className }: { className?: string }) {
  const { setTheme, theme } = useTheme();

  const iconClassName = iconVariants({
    size: "sm",
  });
  const availableThemes = [
    {
      value: "light",
      label: "Light",
      icon: <SunMedium className={iconClassName} />,
    },
    { value: "dark", label: "Dark", icon: <Moon className={iconClassName} /> },
    {
      value: "system",
      label: "System",
      icon: <Monitor className={iconClassName} />,
    },
  ];

  return (
    <ClientOnly
      fallback={
        <svg
          className={iconVariants({
            size: "md",
          })}
        ></svg>
      }
    >
      <Select value={theme} onValueChange={setTheme}>
        <SelectTrigger className={cn("h-8 w-fit border-none", className)}>
          <div className="relative">
            <SunMedium
              className={iconVariants({
                variant: "bright",
                size: "md",
                className:
                  "rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0",
              })}
            />
            <Moon
              className={iconVariants({
                variant: "bright",
                size: "md",
                className:
                  "absolute left-0 top-0 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100",
              })}
            />
          </div>
        </SelectTrigger>
        <SelectContent align="end">
          {availableThemes.map((t) => (
            <SelectItem
              key={t.value}
              value={t.value}
              data-state={theme === t.value ? "checked" : "unchecked"}
            >
              <div className="flex w-full justify-between gap-4">
                <div>{t.label}</div>
                {t.icon}
              </div>
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </ClientOnly>
  );
}
