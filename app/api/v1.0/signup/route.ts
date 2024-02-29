import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";

import { dbConnect, hashPassword } from "../../../../libs/server";
import { registerSchema } from "../../../../validators";
import { UserCollection } from "@/models";
import mongoose from "mongoose";
import { getJwtSecretKey, logEntry } from "../../../../functions/server";
import { SignJWT } from "jose";

export const POST = async (req: NextRequest, res: NextResponse) => {
  try {
    const requestBody = await req.json();
    await dbConnect();

    const registerBody = await registerSchema(requestBody);

    const existingUser = await UserCollection.findOne({
      email: registerBody.email,
      is_deleted: false,
      is_dev: process.env.ENVIRONMENT === "development",
    });
    if (existingUser) {
      return NextResponse.json(
        {
          success: false,
          message: "User already registered",
        },
        { status: 400 }
      );
    }

    const newUser = await new UserCollection({
      ...registerBody,
      _id: new mongoose.Types.ObjectId(),
      is_deleted: false,
      is_dev: process.env.ENVIRONMENT === "development",
    }).save();

    const token = await new SignJWT({
      _id: newUser._id,
      name: newUser.name,
      email: newUser.email,
      is_deleted: newUser.is_deleted,
      is_dev: newUser.is_dev,
    })
      .setProtectedHeader({ alg: process.env.JWT_ALGO! })
      .setIssuedAt()
      .setExpirationTime(`1h`)
      .sign(getJwtSecretKey());

    await logEntry("user", { ...registerBody, password: null }, "CREATE");

    return NextResponse.json(
      {
        success: true,
        message: "User registered successfully",
        response: { ...newUser.toObject(), password: null, token },
      },
      { status: 200 }
    );
  } catch (error) {
    return new NextResponse("Error signing up: " + error, { status: 500 });
  }
};
