import useSWR, { SWRResponse } from "swr";
import queryString from "query-string";
import { IApiResponse, IProduct } from "@/types";

export function useProduct(
  id?: string,
  queries?: Partial<{
    category_details: boolean;
  }>
): SWRResponse<IProduct> {
  const key = id && `/products/${id}?${queryString.stringify({ ...queries })}`;

  return useSWR<IProduct>(key, null, {
    refreshInterval: 1000 * 60 * 60 * 10,
  });
}

export default useProduct;
