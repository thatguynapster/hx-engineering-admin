import useSWR, { SWRResponse } from "swr";
import { IApiResponse, ICategory } from "@/types";
import { FiltersProps } from "@/types/ui";
import queryString from "query-string";

export function useCategories(
  filters?: Partial<FiltersProps>
): SWRResponse<IApiResponse> {
  const key = `/categories?${queryString.stringify({ ...filters })}`;

  return useSWR<IApiResponse>(key, null, {
    refreshInterval: 1000 * 60 * 60 * 10,
  });
}

export default useCategories;
