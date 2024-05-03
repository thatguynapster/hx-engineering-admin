import { NextRequest, NextResponse } from "next/server";

import { dbConnect, validateToken } from "@/libs/server";
import { createDiscountSchema } from "@/validators";
import { DiscountCollection } from "@/models";
import { logEntry } from "@/functions/server";

export const POST = async (req: NextRequest, res: NextResponse) => {
  try {
    await dbConnect();

    const reqBody = await req.json();

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

    const discountBody = await createDiscountSchema(reqBody);

    // Check if discount exists
    const existingDiscount = await DiscountCollection.findOne({
      code: discountBody.code,
      is_deleted: { $ne: true },
    });

    if (existingDiscount) {
      return NextResponse.json(
        {
          success: false,
          message: `Discount with this code already exists`,
        },
        { status: 400 }
      );
    }

    const discount = await new DiscountCollection({
      ...discountBody,
      is_dev: process.env.ENVIRONMENT === "development",
    }).save();

    // Log discount entry
    await logEntry("discount", discountBody, "CREATE");

    return NextResponse.json(
      {
        success: true,
        message: "Discount created",
        response: discount.toObject(),
      },
      { status: 200 }
    );
  } catch (error) {
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

export const GET = async (req: NextRequest, res: NextResponse) => {
  try {
    await dbConnect();

    const limit =
      (req.nextUrl.searchParams.get("limit") as unknown as number) ?? 10;
    const page =
      (req.nextUrl.searchParams.get("page") as unknown as number) ?? 1;

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

    // @ts-ignore this is valid
    const discounts = await DiscountCollection.paginate(
      { is_deleted: false, is_dev: process.env.ENVIRONMENT === "development" },
      { lean: true, limit, page, sort: { _id: -1 } }
    );

    if (!discounts) {
      return NextResponse.json(
        { success: false, message: "No discounts found" },
        { status: 400 }
      );
    }

    return NextResponse.json(
      {
        success: true,
        message: "Discounts found",
        response: discounts,
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

export const OPTIONS = async () => {
  return new NextResponse("", { status: 200 });
};
