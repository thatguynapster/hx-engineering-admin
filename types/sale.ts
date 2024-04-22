import { Types } from "mongoose";
import { IDiscount, IProduct } from ".";

export type ISales = {
  code: string;
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
  status: "PENDING" | "READY_FOR_DELIVERY" | "COMPLETED";
};
