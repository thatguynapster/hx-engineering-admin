import { NextRequest, NextResponse } from "next/server";

import { CategoryCollection } from "@/models";
import { dbConnect, validateToken } from "@/libs/server";
import { createCategorySchema } from "@/validators";
import { logEntry } from "@/functions/server";

export const GET = async (req: NextRequest, res: NextResponse) => {
  try {
    await dbConnect();

    const limit =
      (req.nextUrl.searchParams.get("limit") as unknown as number) ?? 10;
    const page =
      (req.nextUrl.searchParams.get("page") as unknown as number) ?? 1;

    //NOTE do this in every route
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

    // @ts-ignore this is valid
    const categories = await CategoryCollection.paginate(
      {
        is_deleted: false,
        is_dev: process.env.ENVIRONMENT === "development",
      },
      { lean: true, limit, page, sort: { _id: -1 } }
    );

    if (categories.docs.length === 0) {
      return NextResponse.json(
        { success: false, message: "No categories found" },
        { status: 200 }
      );
    }

    return NextResponse.json(
      {
        success: true,
        message: "Categories",
        response: categories,
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

export const POST = async (req: NextRequest, res: NextResponse) => {
  try {
    await dbConnect();

    const reqBody = await req.json();

    const categoryBody = await createCategorySchema(reqBody);

    const existingCategory = await CategoryCollection.findOne({
      name: categoryBody.name,
      is_deleted: { $ne: true },
    });

    if (existingCategory) {
      return NextResponse.json(
        {
          success: false,
          message: "Category with the same name already exists",
        },
        { status: 400 }
      );
    }

    const category = await new CategoryCollection({
      ...categoryBody,
      // _id: new mongoose.Types.ObjectId(),
      is_dev: process.env.ENVIRONMENT === "development",
    }).save();

    await logEntry("category", categoryBody, "CREATE");

    return NextResponse.json(
      {
        success: true,
        message: "Category created",
        response: category.toObject(),
      },
      { status: 200 }
    );
  } catch (error: any) {
    console.log(error);
    return NextResponse.json(
      {
        success: false,
        message: error.message ?? "An unexpected error occurred",
      },
      { status: 500 }
    );
  }
};
