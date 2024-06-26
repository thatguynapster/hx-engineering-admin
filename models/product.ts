import {
  Model,
  PaginateOptions,
  PaginateResult,
  Schema,
  model,
  models,
} from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";
import { IProduct } from "@/types";

export interface IProductDocument extends Model<IProduct> {
  paginate: (
    query?: unknown,
    options?: PaginateOptions,
    callback?: (err: unknown, result: PaginateResult<IProduct>) => void
  ) => Promise<PaginateResult<IProduct>>;
}

const productSchema = new Schema<IProduct>(
  {
    category: { type: String },
    details: { type: String },
    features: { type: Schema.Types.Mixed },
    images: { type: [String], required: true },
    is_deleted: { type: Boolean, default: false },
    is_dev: { type: Boolean, default: false, required: true },
    name: { type: String, required: true },
    cost_price: { type: Number, required: true },
    sale_price: { type: Number, required: true },
    quantity: { type: Number, required: true },
    featured: { type: Boolean, default: false },
  },
  { timestamps: true }
);

productSchema.plugin(mongoosePaginate);

export const Product =
  models.Products ||
  model<IProduct, IProductDocument>("Products", productSchema, "Products");
