import { NextRequest, NextResponse } from "next/server";

import { DiscountCollection, ProductCollection } from "@/models";
import { logEntry } from "@/functions/server";
import { dbConnect, validateToken } from "@/libs/server";
import { IProduct } from "@/types";

export const GET = async (
  req: NextRequest,
  { params }: { params: { discount_id: string } },
  res: NextResponse
) => {
  try {
    await dbConnect();

    const { discount_id } = params;

    // NOTE: do this in every route
    // at this point the authorization header exists
    const authorization = req.headers.get("Authorization")!;
    // TODO check if token is valid
    const token = authorization.split("Bearer ")[1];

    const isValidToken = await validateToken(token);
    if (!isValidToken) {
      return Response.json(
        {
          message: "Authentication failed",
          code: 401,
        },
        { status: 401 }
      );
    }
    //END check if token is valid
    //END NOTE: do this on every route

    const discount = (await DiscountCollection.findOne({
      _id: discount_id,
      is_deleted: false,
      is_dev: process.env.ENVIRONMENT === "development",
    }).lean()) as IProduct;

    if (!discount) {
      return NextResponse.json(
        {
          success: false,
          message: "Discount not found",
        },
        { status: 400 }
      );
    }

    return NextResponse.json(
      {
        success: true,
        message: "Discount found",
        response: discount,
      },
      { status: 200 }
    );
  } catch (error: any) {
    console.log(error);
    return NextResponse.json(
      {
        error,
        message: "Error",
      },
      { status: 500 }
    );
  }
};
