"use client";

import { useEffect, useState } from "react";
import { useSWRConfig } from "swr";
import Cookies from "js-cookie";

import { StoreContext } from "@/context";
import { IUser } from "@/types";
import { injectLogout, injectStore } from "@/libs";

export interface StoreInterface {
  token: string;
  user: IUser;
  logout: () => void;
}

export default function StoreProvider({ children }: { children: any }) {
  const { mutate } = useSWRConfig();

  const [store, setStore] = useState<Partial<StoreInterface>>(() => {
    if (typeof window !== "undefined") {
      const store = window.localStorage.getItem(
        process.env["NEXT_PUBLIC_STORAGE_KEY"]!
      );

      if (store) {
        return JSON.parse(store);
      }
    }

    return null;
  });

  const logout = () => {
    setStore({});

    if (typeof window !== undefined) {
      window.localStorage.clear();
    }

    mutate(() => true, undefined, false);
  };

  useEffect(() => {
    if (store) {
      window.localStorage.setItem(
        process.env["NEXT_PUBLIC_STORAGE_KEY"]!,
        JSON.stringify(store)
      );
    }

    injectStore({ ...store });
    injectLogout(() => logout());
  }, [store]);

  return (
    <StoreContext.Provider value={{ store: { ...store, logout }, setStore }}>
      {children}
    </StoreContext.Provider>
  );
}
