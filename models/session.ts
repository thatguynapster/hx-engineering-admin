import {
  Model,
  PaginateOptions,
  PaginateResult,
  Schema,
  model,
  models,
} from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";

import { ISession } from "@/types";

export interface ISessionDocument extends Model<ISession> {
  paginate: (
    query?: unknown,
    options?: PaginateOptions,
    callback?: (err: unknown, result: PaginateResult<ISession>) => void
  ) => Promise<PaginateResult<ISession>>;
}

const sessionSchema = new Schema(
  {
    token: { type: String },
    expires: { type: Number },
    is_dev: { type: Boolean, default: false, required: true },
  },
  { timestamps: true }
);

sessionSchema.plugin(mongoosePaginate);

export const Sessions =
  models.Sessions ||
  model<ISession, ISessionDocument>("Sessions", sessionSchema, "Sessions");
