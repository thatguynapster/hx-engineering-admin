import useSWR, { SWRResponse } from "swr";
import { IAnnouncement, IApiResponse, ICategory } from "@/types";

export function useAnnouncement(id?: string): SWRResponse<IAnnouncement> {
  const key = id && `/announcements/${id}`;

  return useSWR<IAnnouncement>(key, null, {
    refreshInterval: 1000 * 60 * 60 * 10,
  });
}

export default useAnnouncement;
