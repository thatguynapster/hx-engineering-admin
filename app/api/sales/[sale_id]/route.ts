import { NextRequest, NextResponse } from "next/server";

import { ProductCollection, SaleCollection } from "@/models";
import { IProduct, ISales } from "@/types";
import { dbConnect } from "@/libs/server";

export const GET = async (
  req: NextRequest,
  { params }: { params: { sale_id: string } },
  res: NextResponse
) => {
  await dbConnect();

  try {
    const { sale_id } = params;
    const product_details =
      (req.nextUrl.searchParams.get("product_details") as unknown as boolean) ??
      false;
    const discount_details =
      (req.nextUrl.searchParams.get(
        "discount_details"
      ) as unknown as boolean) ?? false;

    const sale = (await SaleCollection.findOne({
      _id: sale_id,
    }).lean()) as ISales;

    if (!sale) {
      return NextResponse.json(
        {
          success: false,
          message: "Sale not found",
        },
        { status: 200 }
      );
    }

    // get product details for each product in sale
    if (product_details) {
      sale.products = await Promise.all(
        sale.products.map(async (product) => {
          const product_details = (await ProductCollection.findOne({
            _id: product._id,
            is_dev: process.env.NODE_ENV === "development",
          }).lean()) as IProduct;

          if (product_details) {
            product.details = product_details;
          }
          return product;
        })
      );
    }
    // END get product details for each product in sale

    return NextResponse.json(
      {
        success: true,
        message: "Sale found",
        response: sale,
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
