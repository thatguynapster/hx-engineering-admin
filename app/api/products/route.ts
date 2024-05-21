import { NextRequest, NextResponse } from "next/server";
import mongoose from "mongoose";

import { CategoryCollection, ProductCollection } from "@/models";
import { dbConnect, validateToken } from "@/libs/server";
import { createProductSchema } from "@/validators";
import { logEntry } from "@/functions/server";
import { ICategory, IProduct } from "@/types";

export const GET = async (req: NextRequest, res: NextResponse) => {
  try {
    await dbConnect();

    const limit =
      (req.nextUrl.searchParams.get("limit") as unknown as number) ?? 10;
    const page =
      (req.nextUrl.searchParams.get("page") as unknown as number) ?? 1;
    const category_details =
      (req.nextUrl.searchParams.get(
        "category_details"
      ) as unknown as boolean) ?? false;
    const categories = req.nextUrl.searchParams.get("categories") as string;

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

    let query: any = {
      is_deleted: false,
      is_dev: process.env.ENVIRONMENT === "development",
    };

    if (categories) {
      query = { ...query, category: { $in: categories?.split(",") } };
    }

    // @ts-ignore this is valid
    const products = await ProductCollection.paginate(query, {
      lean: true,
      limit,
      page,
      sort: { _id: -1 },
    });

    // get category details for each product
    if (category_details) {
      products.docs = await Promise.all(
        products.docs.map(async (product: IProduct) => {
          try {
            const categoryDetails = (await CategoryCollection.findOne({
              _id: product.category,
            }).lean()) as ICategory;
            product.category_details = categoryDetails;
            return product;
          } catch (error) {
            console.error("Error fetching category details:", error);
            return product;
          }
        })
      );
    }

    if (!products) {
      return NextResponse.json(
        { success: false, message: "No products found" },
        { status: 204 }
      );
    }

    return NextResponse.json(
      {
        success: true,
        message: "Products found",
        response: products,
      },
      { status: 200 }
    );
  } catch (error: any) {
    console.log("ERROR: ", error);
    return NextResponse.json(
      {
        error,
        message: "Error error",
      },
      { status: 500 }
    );
  }
};

export const POST = async (req: NextRequest, res: NextResponse) => {
  try {
    await dbConnect();

    const reqBody = await req.json();

    const productBody = await createProductSchema(reqBody);

    const product = await new ProductCollection({
      ...productBody,
      // _id: new mongoose.Types.ObjectId(),
      is_dev: process.env.ENVIRONMENT === "development",
    }).save();

    await logEntry("product", productBody, "CREATE");

    return NextResponse.json(
      {
        success: true,
        message: "Product created",
        response: product.toObject(),
      },
      { status: 200 }
    );
  } catch (error: any) {
    console.log(error);
    return NextResponse.json(
      {
        success: false,
        error,
        message: error.message ?? "An unexpected error occurred",
      },
      { status: 500 }
    );
  }
};

// export const OPTIONS = async () => {
//   console.log("in options");
//   return new NextResponse("", { status: 200 });
// };
