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
    const limit =
      (req.nextUrl.searchParams.get("limit") as unknown as number) ?? 10;
    const page =
      (req.nextUrl.searchParams.get("page") as unknown as number) ?? 1;

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

    let query: any = {
      is_deleted: false,
      is_dev: process.env.ENVIRONMENT === "development",
      category: { $in: [product.category] },
    };

    // @ts-ignore this is valid
    const relatedProducts = await ProductCollection.paginate(query, {
      lean: true,
      limit,
      page,
      sort: { _id: -1 },
    });

    return NextResponse.json(
      {
        success: true,
        message: "Products found",
        response: relatedProducts,
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
