import type { Metadata } from "next";

import { fontMono } from "./fonts";
import { Providers } from "./providers";

import "/styles/globals.css";
import "/styles/code/line-numbers-prism.css";
import "/styles/code/prism-theme-vsc-plus.css";

import Link from "next/link";
import { Home, Repeat2, Search } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { iconVariants } from "@/components/ui/icon";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { LeftColumn } from "@/components/layout/left-column";
import { RightColumn } from "@/components/layout/right-column";
import { SignIn } from "@/components/sign-in";

const ICON_CLASS = cn(
  iconVariants({ size: "md" }),
  "text-muted-foreground inline-block"
);

const PAGE_TITLE = "Recaster";
const PAGE_DESCRIPTION = "Remixable Farcaster client";

export const metadata: Metadata = {
  title: {
    default: PAGE_TITLE,
    template: `%s • ${PAGE_TITLE}`,
  },
  description: PAGE_DESCRIPTION,
  openGraph: {
    title: {
      default: PAGE_TITLE,
      template: `%s • ${PAGE_TITLE}`,
    },
    description: PAGE_DESCRIPTION,
    url: "https://todo.xyz",
  },
  twitter: {
    title: {
      default: PAGE_TITLE,
      template: `%s • ${PAGE_TITLE}`,
    },
    description: PAGE_DESCRIPTION,
    card: "summary_large_image",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      suppressHydrationWarning // https://github.com/pacocoursey/next-themes#with-app
    >
      <head></head>
      <body
        className={`font-sans text-sm md:text-base ${fontMono.variable} antialiased`}
      >
        <Providers>
          <div className="pb-16">
            <div className="bg-background sticky top-0 lg:hidden py-2 px-4 border-b flex justify-between">
              <Link href="/">
                <div className="rounded-lg p-[2px] border bg-accent w-fit">
                  <Repeat2
                    className={cn(
                      iconVariants({
                        size: "lg",
                      }),
                      "text-accent-foreground"
                    )}
                  />
                </div>
              </Link>
              <Sheet>
                <SheetTrigger asChild>
                  <Button variant="outline" className="text-base">
                    Onchain component config
                  </Button>
                </SheetTrigger>
                <SheetContent>
                  <RightColumn />
                </SheetContent>
              </Sheet>
            </div>
            <div className="grid grid-cols-5 gap-4 max-w-[1300px] mx-auto">
              <div className="hidden lg:block lg:col-span-1">
                <LeftColumn />
              </div>
              <div className="col-start-1 col-span-5 mx-5 lg:mx-0 lg:col-start-2 lg:col-span-3">
                {children}
              </div>
              <div className="hidden lg:block lg:col-span-1">
                <RightColumn />
              </div>
            </div>
            <div className="border-t fixed bottom-0 bg-background flex justify-between lg:hidden py-2 px-4 w-full items-center">
              <div className="w-1/3">
                <Link href="/">
                  <Home className={ICON_CLASS} />
                </Link>
              </div>
              <Link href="/">
                <Search className={ICON_CLASS} />
              </Link>
              <div className="w-1/3 flex justify-end">
                <SignIn />
              </div>
            </div>
          </div>
        </Providers>
      </body>
    </html>
  );
}
