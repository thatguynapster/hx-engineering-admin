import { http } from "@/libs";
import { ILogin, IRegister, IUser } from "@/types";

export const createUserService = (payload: IRegister) =>
  http.post<never, unknown>(`/auth/signup`, payload);

export const loginUserService = (payload: ILogin) =>
  http.post<never, { user: IUser; token: string }>(`/auth/login`, payload);

export const logoutUserService = (token: string) =>
  http.get<never, IUser>(`/auth/logout`, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Access-Control-Allow-Origin": "*",
    },
  });
