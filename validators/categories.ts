import { ICategory } from "@/types";
import Joi from "joi";

export const createCategorySchema = async (
  createCategoryBody: ICategory
): Promise<ICategory> => {
  const schema = Joi.object({
    name: Joi.string().required(),
    description: Joi.string().required(),
  });

  return await schema.validateAsync(createCategoryBody);
};

export const updateCategorySchema = async (
  updateProductBody: ICategory
): Promise<ICategory> => {
  const schema = Joi.object({
    name: Joi.string(),
    description: Joi.string(),
  });

  return await schema.validateAsync(updateProductBody);
};
