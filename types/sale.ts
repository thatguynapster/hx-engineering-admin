import { Types } from "mongoose";
import { IDiscount, IProduct } from ".";

export type ISales = {
  _id: Types.ObjectId;
  discount: string;
  is_dev: boolean;
  products: {
    _id: string;
    price: number;
    quantity: number;
    details?: IProduct;
  }[];
  price: number;
  discount_details?: IDiscount;
  user: {
    _id?: Types.ObjectId;
    name: string;
    phone: string;
    email?: string;
  };
  completed: boolean;
};
