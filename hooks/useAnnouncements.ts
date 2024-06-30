import useSWR, { SWRResponse } from "swr";
import { IApiResponse, ICategory } from "@/types";
import queryString from "query-string";

export function useAnnouncements(queries?: object): SWRResponse<IApiResponse> {
  const key = `/announcements?${queryString.stringify({ ...queries })}`;

  return useSWR<IApiResponse>(key, null, {
    refreshInterval: 1000 * 60 * 60 * 10,
  });
}

export default useAnnouncements;
