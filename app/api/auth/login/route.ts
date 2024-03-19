import { NextRequest, NextResponse } from "next/server";

import { comparePassword, dbConnect, hashPassword } from "@/libs/server";
import { loginSchema } from "@/validators";
import { UserCollection } from "@/models";
import { getJwtSecretKey, setUserDataCookie } from "@/functions/server";
import { IUser } from "@/types";
import { SignJWT } from "jose";
import jwt from "jsonwebtoken";

export const POST = async (req: NextRequest, res: NextResponse) => {
  try {
    const requestBody = await req.json();
    await dbConnect();

    const loginBody = await loginSchema(requestBody);

    // find user account
    const user = (await UserCollection.findOne({
      email: loginBody.email,
      is_deleted: false,
      is_dev: process.env.ENVIRONMENT === "development",
    }).lean()) as IUser;

    if (!user) {
      return NextResponse.json(
        {
          success: false,
          message: "Account not found",
        },
        { status: 400 }
      );
    }
    // END find user account

    // check password
    const hashedPassword = (await hashPassword(loginBody.password)) as string;
    const passwordValid = await comparePassword(
      user.password,
      loginBody.password
    );

    if (!passwordValid) {
      return NextResponse.json(
        {
          success: false,
          message: "Invalid password",
        },
        { status: 400 }
      );
    }
    // END check password

    // const token = await new SignJWT({
    //   _id: user._id,
    //   name: user.name,
    //   email: user.email,
    //   is_deleted: user.is_deleted,
    //   is_dev: user.is_dev,
    // })
    //   .setProtectedHeader({ alg: "HS256" })
    //   .setIssuedAt()
    //   .setExpirationTime(`6h`)
    //   .sign(getJwtSecretKey());
    const token = jwt.sign(
      {
        _id: user._id,
        name: user.name,
        email: user.email,
        is_deleted: user.is_deleted,
        is_dev: user.is_dev,
      },
      process.env.JWT_SECRET!,
      {
        algorithm: "HS256",
        expiresIn: "6h",
      }
    );

    const response = NextResponse.json(
      {
        success: true,
        message: "Login successful",
        response: { user, token },
      },
      { status: 200 }
    );

    response.cookies.set({
      name: "token",
      value: token,
      path: "/",
      maxAge: 21_600, // 6 hours
      httpOnly: true,
      sameSite: "strict",
      secure: true,
    });

    // setUserDataCookie({
    //   _id: user._id,
    //   name: user.name,
    //   email: user.email,
    //   is_deleted: user.is_deleted,
    //   is_dev: user.is_dev,
    //   role: "",
    //   createdAt: user.createdAt,
    //   updatedAt: user.updatedAt,
    // });

    return response;
  } catch (error) {
    return new NextResponse("Error logging in: " + error, { status: 500 });
  }
};
