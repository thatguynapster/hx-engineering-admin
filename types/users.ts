import { Types } from "mongoose";

export type IUser = {
  _id: Types.ObjectId;
  name: string;
  email: string;
  password: string;
  phone?: string;
  role: string;
  is_deleted: boolean;
  is_dev: boolean;
  createdAt: string;
  updatedAt: string;
};
