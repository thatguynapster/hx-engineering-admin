import { UserCollection } from "@/models";
import { IUser } from "@/types";
import jwt from "jsonwebtoken";

export const validateToken = async (token: string): Promise<boolean> => {
  try {
    const payload = jwt.verify(
      token,
      process.env.JWT_SECRET!
    ) as jwt.JwtPayload;

    const user = (await UserCollection.findById(payload._id).lean()) as IUser;

    if (!user) {
      return false;
    }

    return true;
  } catch (error) {
    return false;
  }
};
