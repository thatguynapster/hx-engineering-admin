import { IDiscount } from "@/types";
import Joi from "joi";

export const createDiscountSchema = async (
  createDiscountBody: IDiscount
): Promise<IDiscount> => {
  const schema = Joi.object({
    name: Joi.string().required(),
    code: Joi.string().required(),
  });

  return await schema.validateAsync(createDiscountBody);
};
