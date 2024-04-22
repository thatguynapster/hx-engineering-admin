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
  await dbConnect();

  try {
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

export const PUT = async (
  req: NextRequest,
  { params }: { params: { product_id: string } },
  res: NextResponse
) => {
  await dbConnect();

  try {
    const { product_id } = params;
    const reqBody = await req.json();

    const product = await ProductCollection.findById(product_id).lean();

    if (!product) {
      return NextResponse.json(
        {
          success: false,
          message: "Product not found",
        },
        { status: 400 }
      );
    }

    const productBody = await updateProductSchema(reqBody);

    const updatedProduct = await ProductCollection.findOneAndUpdate(
      { _id: product_id },
      productBody,
      { new: true }
    );

    if (!updatedProduct) {
      return NextResponse.json(
        {
          success: false,
          message: "Failed to update product",
        },
        { status: 500 }
      );
    }

    await logEntry("product", productBody, "UPDATE");

    return NextResponse.json(
      {
        success: true,
        message: "Product updated",
        response: updatedProduct,
      },
      { status: 200 }
    );
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      {
        error,
        message: "An unexpected error occurred",
      },
      { status: 500 }
    );
  }
};

export const DELETE = async (
  req: NextRequest,
  { params }: { params: { product_id: string } },
  res: NextResponse
) => {
  await dbConnect();

  try {
    const { product_id } = params;

    const product = await ProductCollection.findById(product_id).lean();

    if (!product) {
      return NextResponse.json(
        {
          success: false,
          message: "Product not found",
        },
        { status: 400 }
      );
    }

    const deletedProduct = await ProductCollection.findOneAndUpdate(
      { _id: product_id },
      { is_deleted: true },
      { new: true }
    );

    if (!deletedProduct) {
      return NextResponse.json(
        {
          success: false,
          message: "Failed to delete product",
        },
        { status: 500 }
      );
    }

    await logEntry("product", { _id: product_id }, "DELETE");

    return NextResponse.json(
      {
        success: true,
        message: "Product deleted",
      },
      { status: 200 }
    );
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      {
        error,
        message: "An unexpected error occurred",
      },
      { status: 500 }
    );
  }
};
