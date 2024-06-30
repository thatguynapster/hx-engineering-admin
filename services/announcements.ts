import { http } from "@/libs";
import { IAnnouncement, ICategory } from "@/types";

export const createAnnouncementService = (payload: Partial<IAnnouncement>) =>
  http.post<never, IAnnouncement>(`/announcements`, payload, {
    headers: {
      "Content-Type": "application/json",
    },
  });

export const updateAnnouncementService = (
  id: string,
  payload: Partial<IAnnouncement>
) =>
  http.put<never, IAnnouncement>(`/announcements/${id}`, payload, {
    headers: {
      "Content-Type": "application/json",
    },
  });

export const deleteAnnouncementService = (id: string) =>
  http.delete<never, IAnnouncement>(`/announcements/${id}`);
