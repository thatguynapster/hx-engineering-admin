import { IReview } from "@/types";
import Joi from "joi";

export const createReviewSchema = async (
  createCategoryBody: IReview
): Promise<IReview> => {
  const schema = Joi.object({
    text: Joi.string().required(),
    product: Joi.string().required(),
    rating: Joi.number().required(),
    user: Joi.object({
      name: Joi.string().required(),
      phone: Joi.string().required(),
    }).required(),
  });

  return await schema.validateAsync(createCategoryBody);
};

export const updateReviewSchema = async (
  updateProductBody: IReview
): Promise<IReview> => {
  const schema = Joi.object({
    text: Joi.string(),
    product: Joi.string(),
    rating: Joi.number(),
  });

  return await schema.validateAsync(updateProductBody);
};
