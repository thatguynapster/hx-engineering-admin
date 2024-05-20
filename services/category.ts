import { http } from "@/libs";
import { ICategory } from "@/types";

export const createCategoryService = (payload: Partial<ICategory>) =>
  http.post<never, ICategory>(`/categories`, payload, {
    headers: {
      "Content-Type": "application/json",
    },
  });
