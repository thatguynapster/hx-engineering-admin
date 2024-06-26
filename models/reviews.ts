import {
  Model,
  PaginateOptions,
  PaginateResult,
  Schema,
  model,
  models,
} from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";
import { IReview } from "@/types";

export interface IReviewDocument extends Model<IReview> {
  paginate: (
    query?: unknown,
    options?: PaginateOptions,
    callback?: (err: unknown, result: PaginateResult<IReview>) => void
  ) => Promise<PaginateResult<IReview>>;
}

const reviewSchema = new Schema<IReview>(
  {
    text: { type: String, required: true },
    product: { type: String, required: true },
    rating: { type: Number, required: true },
    is_dev: { type: Boolean, default: false },
    user: {
      _id: { type: String, default: null },
      name: { type: String, required: true },
      email: { type: String, default: null },
      phone: { type: String, required: true },
    },
  },
  { timestamps: true }
);

reviewSchema.plugin(mongoosePaginate);

export const Review =
  models.Reviews ||
  model<IReview, IReviewDocument>("Reviews", reviewSchema, "Reviews");
