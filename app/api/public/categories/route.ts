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
    const product_count =
      (req.nextUrl.searchParams.get("product_count") as unknown as boolean) ??
      false;

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

    if (product_count) {
      categories.docs = await Promise.all(
        categories.docs.map(async (category: ICategory) => {
          try {
            const products = (await ProductCollection.find({
              category: category._id,
            }).lean()) as IProduct[];
            console.log(products);

            category.product_count = products.length;
            return category;
          } catch (error) {
            console.error("Error fetching category products count:", error);
            return category;
          }
        })
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
