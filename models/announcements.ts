import {
  Model,
  PaginateOptions,
  PaginateResult,
  Schema,
  model,
  models,
} from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";
import { IAnnouncement } from "@/types";

export interface IAnnouncementDocument extends Model<IAnnouncement> {
  paginate: (
    query?: unknown,
    options?: PaginateOptions,
    callback?: (err: unknown, result: PaginateResult<IAnnouncement>) => void
  ) => Promise<PaginateResult<IAnnouncement>>;
}

const announcementSchema = new Schema<IAnnouncement>(
  {
    details: { type: String, required: true },
    title: { type: String, required: true },
    is_deleted: { type: Boolean, default: false },
  },
  { timestamps: true }
);

announcementSchema.plugin(mongoosePaginate);

export const Announcement =
  models.Announcement ||
  model<IAnnouncement, IAnnouncementDocument>(
    "Announcement",
    announcementSchema,
    "Announcement"
  );
