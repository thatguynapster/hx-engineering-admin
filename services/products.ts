import { http } from "@/libs";
import { IProduct } from "@/types";

export const UploadProductImageService = (payload: FormData, token: string) =>
  http.post<never, IProduct>(`/products/upload-product-image`, payload, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
