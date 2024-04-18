import { http } from "@/libs";
import { ISales } from "@/types";

export const updateSalesStatus = (
  saleID: string,
  payload: { status: ISales["status"] }
) =>
  http.put<never, ISales>(`/sales/update-status/${saleID}`, payload, {
    headers: {
      "Content-Type": "application/json",
    },
  });
