import { http } from "@/libs";
import { ILogin, IRegister } from "@/types";

export const createUserService = (payload: IRegister) =>
  http.post<never, unknown>(`/v1.0/signup`, payload);

export const loginUserService = (payload: ILogin) =>
  http.post<never, unknown>(`/v1.0/login`, payload);
