import Joi from "joi";
import { IUser } from "@/types";

export const registerSchema = async (
  registerUserBody: IUser
): Promise<IUser> => {
  const schema = Joi.object({
    name: Joi.string().required(),
    email: Joi.string().required(),
    phone: Joi.string(),
    password: Joi.string().required(),
    role: Joi.string().required(),
  });

  return await schema.validateAsync(registerUserBody);
};
