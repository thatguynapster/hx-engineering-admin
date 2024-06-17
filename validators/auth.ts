import Joi from "joi";
import { ILogin, IRegister } from "@/types";

export const registerSchema = async (
  registerUserBody: IRegister
): Promise<IRegister> => {
  const schema = Joi.object({
    email: Joi.string().required(),
    name: Joi.string().required(),
    password: Joi.string().required(),
  });

  return await schema.validateAsync(registerUserBody);
};

export const loginSchema = async (loginBody: ILogin): Promise<ILogin> => {
  const schema = Joi.object({
    email: Joi.string().required(),
    password: Joi.string().required(),
  });

  return await schema.validateAsync(loginBody);
};
