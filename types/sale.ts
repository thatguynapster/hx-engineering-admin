import { Types } from "mongoose";
import { IDiscount, IProduct } from ".";
import { ILocation } from "@/components/Map";

export type ISales = {
  _id: Types.ObjectId;
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
  location: ILocation;
  status: "PENDING" | "READY_FOR_DELIVERY" | "COMPLETED";
  createdAt: Date;
};
