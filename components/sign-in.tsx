"use client";

import { useContext, useEffect } from "react";
import Link from "next/link";
import Script from "next/script";
// import {
//   coinbaseWallet,
//   ConnectWallet,
//   embeddedWallet,
//   localWallet,
//   metamaskWallet,
//   ThirdwebProvider,
//   walletConnect,
// } from "@thirdweb-dev/react";
import { User } from "lucide-react";
import { useTheme } from "next-themes";

import { AuthData, NEYNAR_AUTH_DATA_LOCAL_STORAGE_KEY } from "@/lib/neynar";
import { iconVariants } from "@/components/ui/icon";

import { ClientUserContext } from "./contexts/client-user";

declare global {
  interface Window {
    onSignInSuccess: (data: AuthData) => void;
  }
}

export function SignIn() {
  const clientUserContext = useContext(ClientUserContext);

  if (clientUserContext === null) {
    throw new Error("ClientUserContext is null");
  }

  const { authData, checkAuth, user } = clientUserContext;

  useEffect(() => {
    window.onSignInSuccess = (data: AuthData) => {
      localStorage.setItem(
        NEYNAR_AUTH_DATA_LOCAL_STORAGE_KEY,
        JSON.stringify(data)
      );
      checkAuth();
    };
  }, [checkAuth]);

  const { resolvedTheme } = useTheme();

  // return (
  //   <ThirdwebProvider
  //     activeChain="base-goerli"
  //     clientId={process.env.NEXT_PUBLIC_THIRDWEB_CLIENT_ID}
  //     supportedWallets={[
  //       metamaskWallet(),
  //       coinbaseWallet({ recommended: true }),
  //       walletConnect(),
  //       localWallet(),
  //       embeddedWallet({
  //         auth: {
  //           options: ["email", "google", "apple", "facebook"],
  //         },
  //       }),
  //     ]}
  //   >
  //     <ConnectWallet theme={"dark"} modalSize={"wide"} />
  //   </ThirdwebProvider>
  // );

  if (authData === undefined) {
    return null;
  }

  if (authData === null) {
    return (
      <>
        <div
          className="neynar_signin"
          data-client_id={process.env.NEXT_PUBLIC_NEYNAR_CLIENT_ID}
          data-success-callback="onSignInSuccess"
          data-theme={resolvedTheme}
          data-text="Sign in"
          data-styles='{ "height": "fit-content", "width": "fit-content", "min-width": "unset", "padding": "6px 15px", "background-color": "transparent", "color": "black" }'
        ></div>
        <Script
          src="https://neynarxyz.github.io/siwn/raw/1.2.0/index.js"
          async
        ></Script>
      </>
    );
  }

  return (
    <Link href="/~/profile">
      {user ? (
        <img
          src={user.pfp.url}
          alt="Profile picture"
          width={40}
          height={40}
          className="rounded-full"
        />
      ) : (
        <div className="w-10 h-10 flex justify-center items-center">
          <User
            className={iconVariants({
              size: "md",
              variant: "ghost",
            })}
          />
        </div>
      )}
    </Link>
  );
}
