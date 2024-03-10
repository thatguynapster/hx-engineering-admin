import { http } from "@/libs";
import { ILogin, IRegister, IUser } from "@/types";

export const createUserService = (payload: IRegister) =>
  http.post<never, unknown>(`/auth/signup`, payload);

export const loginUserService = (payload: ILogin) =>
  http.post<never, IUser>(`/auth/login`, payload);

export const logoutUserService = () => http.get<never, IUser>(`/auth/logout`);
