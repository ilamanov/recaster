"use client";

import React, { createContext, useCallback, useEffect, useState } from "react";
import {
  FollowResponseUser,
  User as UserType,
} from "@neynar/nodejs-sdk/build/neynar-api/v1";

import { AuthData, NEYNAR_AUTH_DATA_LOCAL_STORAGE_KEY } from "@/lib/neynar";

interface ClientUserContextType {
  authData: AuthData | null;
  checkAuth: () => void;
  user: UserType | null;
  followingUsers: FollowResponseUser[] | null;
}

export const ClientUserContext = createContext<ClientUserContextType | null>(
  null
);

export function ClientUserProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [authData, setAuthData] = useState<AuthData | undefined | null>(
    undefined
  );
  const [user, setUser] = useState<UserType | null>(null);
  const [followingUsers, setFollowingUsers] = useState<
    FollowResponseUser[] | null
  >(null);

  const checkAuth = useCallback(() => {
    const localAuthData = localStorage.getItem(
      NEYNAR_AUTH_DATA_LOCAL_STORAGE_KEY
    );
    if (localAuthData) {
      setAuthData(JSON.parse(localAuthData));
    } else {
      setAuthData(null);
    }
  }, []);

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  useEffect(() => {
    async function fetchData() {
      const [{ user: fetchedUser }, { users: fetchedFollowingUsers }] =
        await Promise.all([
          fetch(`/api/user`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              fid,
            }),
          }).then((res) => res.json()),
          fetch(`/api/user/following`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              fid,
            }),
          }).then((res) => res.json()),
        ]);

      setUser(fetchedUser);
      setFollowingUsers(fetchedFollowingUsers);
    }

    const fid = authData?.fid;
    if (fid) {
      fetchData();
    }
  }, [authData?.fid]);

  return (
    <ClientUserContext.Provider
      value={{
        authData,
        checkAuth,
        user,
        followingUsers,
      }}
    >
      {children}
    </ClientUserContext.Provider>
  );
}
