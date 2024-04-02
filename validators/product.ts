import { IProduct } from "@/types";
import Joi from "joi";

export const createProductSchema = async (
  createProductBody: IProduct
): Promise<IProduct> => {
  const schema = Joi.object({
    name: Joi.string().required(),
    details: Joi.string().required(),
    images: Joi.array().items(Joi.string()).min(1).required(),
    features: Joi.object().keys().unknown(true),
    category: Joi.string().required(),
    quantity: Joi.number().required(),
    sale_price: Joi.number().required(),
    cost_price: Joi.number().required(),
  });

  return await schema.validateAsync(createProductBody);
};

export const updateProductSchema = async (
  updateProductBody: IProduct
): Promise<IProduct> => {
  const schema = Joi.object({
    name: Joi.string(),
    details: Joi.string(),
    images: Joi.array().items(Joi.string()).min(1),
    features: Joi.object().keys().unknown(true),
    category: Joi.string(),
    quantity: Joi.number(),
    sale_price: Joi.number(),
    cost_price: Joi.number(),
  });

  return await schema.validateAsync(updateProductBody);
};
