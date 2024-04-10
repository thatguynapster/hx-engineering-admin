import Joi from "joi";
import { ISales } from "@/types";

export const createSalesSchema = async (
  createSalesBody: ISales
): Promise<ISales> => {
  const schema = Joi.object({
    discount: Joi.string(),
    products: Joi.array()
      .items(
        Joi.object({
          _id: Joi.string(),
          quantity: Joi.number(),
        })
      )
      .min(1)
      .required(),
    user: Joi.object({
      name: Joi.string().required(),
      phone: Joi.string().required(),
    }).required(),
  });

  return await schema.validateAsync(createSalesBody);
};

export const updateStatusSchema = async (updateStatusBody: {
  status: ISales["status"];
}): Promise<ISales> => {
  const schema = Joi.object({
    status: Joi.string()
      .valid("PENDING", "READY_FOR_DELIVERY", "COMPLETED")
      .required(),
  });

  return await schema.validateAsync(updateStatusBody);
};
