import { NextRequest, NextResponse } from "next/server";

import { CategoryCollection, ProductCollection } from "@/models";
import { dbConnect } from "@/libs/server";
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

    // @ts-ignore this is valid
    const products = await ProductCollection.paginate(
      {
        is_deleted: false,
        featured: true,
        is_dev: process.env.ENVIRONMENT === "development",
      },
      { lean: true, limit, page, sort: { _id: -1 } }
    );

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
