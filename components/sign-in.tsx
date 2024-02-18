"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import Script from "next/script";
import { User as UserType } from "@neynar/nodejs-sdk/build/neynar-api/v1";
import {
  coinbaseWallet,
  ConnectWallet,
  embeddedWallet,
  localWallet,
  metamaskWallet,
  ThirdwebProvider,
  walletConnect,
} from "@thirdweb-dev/react";
import { User } from "lucide-react";
import { useTheme } from "next-themes";

import {
  AuthData,
  client,
  NEYNAR_AUTH_DATA_LOCAL_STORAGE_KEY,
} from "@/lib/neynar";
import { buttonVariants } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { iconVariants } from "@/components/ui/icon";

declare global {
  interface Window {
    onSignInSuccess: (data: AuthData) => void;
  }
}

export function SignIn() {
  const [authData, setAuthData] = useState<AuthData | null>(null);
  const [user, setUser] = useState<UserType | null>(null);

  useEffect(() => {
    window.onSignInSuccess = (data: AuthData) => {
      localStorage.setItem(
        NEYNAR_AUTH_DATA_LOCAL_STORAGE_KEY,
        JSON.stringify(data)
      );
      setAuthData(data);
    };
  }, []);

  useEffect(() => {
    const fid = authData?.fid;
    if (fid) {
      client.lookupUserByFid(fid).then((clientResponse) => {
        setUser(clientResponse.result.user);
      });
    }
  }, [authData?.fid]);

  const { resolvedTheme } = useTheme();

  return (
    <ThirdwebProvider
      activeChain="mumbai"
      clientId="YOUR_CLIENT_ID"
      supportedWallets={[
        metamaskWallet(),
        coinbaseWallet({ recommended: true }),
        walletConnect(),
        localWallet(),
        embeddedWallet({
          auth: {
            options: ["email", "google", "apple", "facebook"],
          },
        }),
      ]}
    >
      <ConnectWallet theme={"dark"} modalSize={"wide"} />
    </ThirdwebProvider>
  );

  // return authData?.is_authenticated ? (
  //   <Link href="/profile">
  //     {user ? (
  //       <Image
  //         src={user.pfp.url}
  //         alt="Profile picture"
  //         width={40}
  //         height={40}
  //         priority
  //       />
  //     ) : (
  //       <div className="w-10 h-10 flex justify-center items-center">
  //         <User
  //           className={iconVariants({
  //             size: "lg",
  //           })}
  //         />
  //       </div>
  //     )}
  //   </Link>
  // ) : (
  //   <Dialog>
  //     <DialogTrigger className={buttonVariants({ variant: "outline" })}>
  //       Sign in
  //     </DialogTrigger>
  //     <DialogContent>

  //       <div className="flex justify-center items-center">
  //         <div
  //           className="neynar_signin"
  //           data-client_id={process.env.NEXT_PUBLIC_NEYNAR_CLIENT_ID}
  //           data-success-callback="onSignInSuccess"
  //           data-theme={resolvedTheme}
  //         ></div>
  //         <Script
  //           src="https://neynarxyz.github.io/siwn/raw/1.0.0/index.js"
  //           async
  //         ></Script>
  //       </div>
  //     </DialogContent>
  //   </Dialog>
  // );
}
