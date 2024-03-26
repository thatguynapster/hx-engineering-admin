import { http } from "@/libs";
import { IProduct } from "@/types";

export const uploadProductImageService = (payload: FormData, token: string) =>
  http.post<never, IProduct>(`/products/upload-product-image`, payload, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

export const createProductService = (
  payload: Partial<IProduct>,
  token: string
) =>
  http.post<never, IProduct>(`/products`, payload, {
    headers: {
      "Content-Type": "application/json",
    },
  });
