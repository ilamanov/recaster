import { useCallback, useEffect, useState } from "react";
import { User as UserType } from "@neynar/nodejs-sdk/build/neynar-api/v1";

import { AuthData, NEYNAR_AUTH_DATA_LOCAL_STORAGE_KEY } from "@/lib/neynar";

export function useClientUser() {
  const [authData, setAuthData] = useState<AuthData | null>(null);
  const [user, setUser] = useState<UserType | null>(null);

  const checkAuth = useCallback(() => {
    const localAuthData = localStorage.getItem(
      NEYNAR_AUTH_DATA_LOCAL_STORAGE_KEY
    );
    if (localAuthData) {
      setAuthData(JSON.parse(localAuthData));
    }
  }, []);

  useEffect(() => {
    checkAuth();
  }, []);

  useEffect(() => {
    const fid = authData?.fid;
    if (fid) {
      fetch(`/api/user`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          fid,
        }),
      })
        .then((res) => {
          return res.json();
        })
        .then(({ user }) => {
          setUser(user);
        })
        .catch((e) => {
          console.error("Error fetching user", e);
        });
    }
  }, [authData?.fid]);

  return {
    authData,
    user,
    checkAuth,
  };
}
