import { http } from "@/libs";
import { ICategory } from "@/types";

export const createCategoryService = (payload: Partial<ICategory>) =>
  http.post<never, ICategory>(`/categories`, payload, {
    headers: {
      "Content-Type": "application/json",
    },
  });

export const updateCategoryService = (
  categoryID: string,
  payload: Partial<ICategory>
) =>
  http.put<never, ICategory>(`/categories/${categoryID}`, payload, {
    headers: {
      "Content-Type": "application/json",
    },
  });

export const deleteCategoryService = (categoryID: string) =>
  http.delete<never, ICategory>(`/categories/${categoryID}`, {
    headers: {
      "Content-Type": "application/json",
    },
  });
