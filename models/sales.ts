import {
  Model,
  PaginateOptions,
  PaginateResult,
  Schema,
  model,
  models,
} from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";
import { ISales } from "@/types";

export interface ISalesDocument extends Model<ISales> {
  paginate: (
    query?: unknown,
    options?: PaginateOptions,
    callback?: (err: unknown, result: PaginateResult<ISales>) => void
  ) => Promise<PaginateResult<ISales>>;
}

const saleSchema = new Schema<ISales>(
  {
    code: { type: String, required: true },
    discount: { type: String, default: null },
    is_dev: { type: Boolean, default: false },
    products: [
      {
        _id: { type: String, required: true },
        price: { type: Number },
        quantity: { type: Number },
      },
    ],
    price: { type: Number },
    user: {
      _id: { type: String, default: null },
      name: { type: String, required: true },
      email: { type: String, default: null },
      phone: { type: String, required: true },
    },
    completed: { type: Boolean, default: false },
  },
  { timestamps: true }
);

saleSchema.plugin(mongoosePaginate);

export const Sale =
  models.Sales || model<ISales, ISalesDocument>("Sales", saleSchema, "Sales");
