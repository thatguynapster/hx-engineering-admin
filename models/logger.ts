import { Schema, model, models } from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";

import { ILog } from "../types";

const logSchema = new Schema<ILog>(
  {
    message: { type: String },
    document_data: { type: Schema.Types.Mixed },
    event: { type: String },
  },
  { timestamps: true }
);

logSchema.plugin(mongoosePaginate);

export const Log = models.Logs || model<ILog>("Logs", logSchema, "Logs");
