import { Types } from "mongoose";

export type IReview = {
  text: string;
  product: string;
  rating: number;
  is_dev: boolean;
  user: {
    _id?: Types.ObjectId;
    name: string;
    phone: string;
    email?: string;
  };
};
