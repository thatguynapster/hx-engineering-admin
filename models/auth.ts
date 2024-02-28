import {
  Model,
  PaginateOptions,
  PaginateResult,
  Schema,
  model,
  models,
} from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";
import argon2 from "argon2";

import { IUser } from "@/types";

export interface IUserDocument extends Model<IUser> {
  paginate: (
    query?: unknown,
    options?: PaginateOptions,
    callback?: (err: unknown, result: PaginateResult<IUser>) => void
  ) => Promise<PaginateResult<IUser>>;
}

const userSchema = new Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String },
    password: { type: String, required: true },
    is_deleted: { type: Boolean, default: false },
    is_dev: { type: Boolean, default: false, required: true },
  },
  { timestamps: true }
);

userSchema.pre("save", async function (next) {
  const user = this;

  if (this.isModified("password") || this.isNew) {
    user.password = await argon2.hash(user.password);
    next();
  }

  return next();
});

userSchema.plugin(mongoosePaginate);

export const User =
  models.Users || model<IUser, IUserDocument>("Users", userSchema, "Users");
