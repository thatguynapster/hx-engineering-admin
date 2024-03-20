"use client";

import { Dispatch, SetStateAction, createContext } from "react";

import { IUser } from "@/types";

export interface StoreInterface {
  token: string;
  user: IUser;
  logout: () => void;
}

export const StoreContext = createContext<{
  store: Partial<StoreInterface>;
  setStore: Dispatch<SetStateAction<Partial<StoreInterface>>>;
}>({
  store: {},
  setStore: () => null,
});
