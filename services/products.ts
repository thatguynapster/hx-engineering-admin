import { http } from "@/libs";
import { IProduct } from "@/types";

export const uploadProductImageService = (payload: FormData) =>
  http.post<never, IProduct>(`/products/upload-product-image`, payload, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

export const createProductService = (payload: Partial<IProduct>) =>
  http.post<never, IProduct>(`/products`, payload, {
    headers: {
      "Content-Type": "application/json",
    },
  });

export const updateProductService = (
  productID: string,
  payload: Partial<IProduct>
) =>
  http.put<never, IProduct>(`/products/${productID}`, payload, {
    headers: {
      "Content-Type": "application/json",
    },
  });
