import { http } from "@/libs";
import { IRegister } from "@/types";

export const createUserService = (payload: IRegister) =>
  http.post<never, unknown>(`/v1.0/signup`, payload);
