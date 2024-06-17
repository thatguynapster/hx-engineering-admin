import useSWR, { SWRResponse } from "swr";
import { IApiResponse, ICategory } from "@/types";

export function useCategory(): SWRResponse<IApiResponse> {
  const key = `/categories`;

  return useSWR<IApiResponse>(key, null, {
    refreshInterval: 1000 * 60 * 60 * 10,
  });
}

export default useCategory;
