import { NextRequest, NextResponse } from "next/server";

import { dbConnect, validateToken } from "@/libs/server";
import { createDiscountSchema, createReviewSchema } from "@/validators";
import {
  DiscountCollection,
  ProductCollection,
  ReviewCollection,
} from "@/models";
import { logEntry } from "@/functions/server";
import mongoose from "mongoose";

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

    const reviewBody = await createReviewSchema(reqBody);
    console.log(reviewBody);

    // Check if discount exists
    const productExists = await ProductCollection.exists({
      _id: reviewBody.product,
    });

    if (!productExists) {
      return NextResponse.json(
        {
          success: false,
          message: `Product not found`,
        },
        { status: 400 }
      );
    }

    const review = await new ReviewCollection({
      ...reviewBody,
      is_dev: process.env.ENVIRONMENT === "development",
    }).save();

    // Log discount entry
    await logEntry("review", reviewBody, "CREATE");

    return NextResponse.json(
      {
        success: true,
        message: "Review created",
        response: review.toObject(),
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
    const reviews = await ReviewCollection.paginate(
      { is_dev: process.env.ENVIRONMENT === "development" },
      { lean: true, limit, page, sort: { _id: -1 } }
    );

    if (!reviews) {
      return NextResponse.json(
        { success: false, message: "No reviews found" },
        { status: 400 }
      );
    }

    return NextResponse.json(
      {
        success: true,
        message: "Reviews found",
        response: reviews,
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
