import { Types } from "mongoose";

export type ILogin = {
  email: string;
  password: string;
};

export type IRegister = {
  email: string;
  name: string;
  password: string;
};

export type IUserResponse = {
  _id: Types.ObjectId;
  name: string;
  email: string;
  password: null;
  is_deleted: boolean;
  is_dev: boolean;
  createdAt: string;
  updatedAt: string;
  role: string;
};
