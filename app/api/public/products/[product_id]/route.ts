import { NextRequest, NextResponse } from "next/server";

import { CategoryCollection, ProductCollection } from "@/models";
import { updateProductSchema } from "@/validators";
import { ICategory, IProduct } from "@/types";
import { logEntry } from "@/functions/server";
import { dbConnect } from "@/libs/server";

export const GET = async (
  req: NextRequest,
  { params }: { params: { product_id: string } },
  res: NextResponse
) => {
  try {
    await dbConnect();

    const { product_id } = params;
    const category_details =
      (req.nextUrl.searchParams.get(
        "category_details"
      ) as unknown as boolean) ?? false;

    const product = (await ProductCollection.findOne({
      _id: product_id,
      is_deleted: false,
      is_dev: process.env.ENVIRONMENT === "development",
    }).lean()) as IProduct;

    if (!product) {
      return NextResponse.json(
        {
          success: false,
          message: "Product not found",
        },
        { status: 400 }
      );
    }

    // get category details
    if (category_details) {
      const categoryDetails = (await CategoryCollection.findOne({
        _id: product.category,
      }).lean()) as ICategory;
      product.category_details = categoryDetails;
    }

    return NextResponse.json(
      {
        success: true,
        message: "Product found",
        response: product,
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
