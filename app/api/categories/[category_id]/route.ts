import { NextRequest, NextResponse } from "next/server";

import { CategoryCollection, ProductCollection } from "@/models";
import { updateCategorySchema, updateProductSchema } from "@/validators";
import { ICategory, IProduct } from "@/types";
import { logEntry } from "@/functions/server";
import { dbConnect } from "@/libs/server";

export const GET = async (
  req: NextRequest,
  { params }: { params: { category_id: string } },
  res: NextResponse
) => {
  try {
    await dbConnect();

    const { category_id } = params;

    const product = (await CategoryCollection.findOne({
      _id: category_id,
      is_deleted: false,
    }).lean()) as ICategory;

    if (!product) {
      return NextResponse.json(
        {
          success: false,
          message: "Category not found",
        },
        { status: 400 }
      );
    }

    return NextResponse.json(
      {
        success: true,
        message: "Category found",
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
  { params }: { params: { category_id: string } },
  res: NextResponse
) => {
  try {
    await dbConnect();

    const { category_id } = params;
    const reqBody = await req.json();

    const category = await CategoryCollection.findById(category_id).lean();

    if (!category) {
      return NextResponse.json(
        {
          success: false,
          message: "Category not found",
        },
        { status: 400 }
      );
    }

    const categoryBody = await updateCategorySchema(reqBody);

    const updatedCategory = await CategoryCollection.findOneAndUpdate(
      { _id: category_id },
      categoryBody,
      { new: true }
    );

    if (!updatedCategory) {
      return NextResponse.json(
        {
          success: false,
          message: "Failed to update category",
        },
        { status: 500 }
      );
    }

    await logEntry("category", categoryBody, "UPDATE");

    return NextResponse.json(
      {
        success: true,
        message: "Category updated",
        response: updatedCategory,
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
  { params }: { params: { category_id: string } },
  res: NextResponse
) => {
  try {
    await dbConnect();

    const { category_id } = params;

    const category = await CategoryCollection.findById(category_id).lean();

    if (!category) {
      return NextResponse.json(
        {
          success: false,
          message: "Category not found",
        },
        { status: 400 }
      );
    }

    const deletedCategory = await CategoryCollection.findOneAndUpdate(
      { _id: category_id },
      { is_deleted: true },
      { new: true }
    );

    if (!deletedCategory) {
      return NextResponse.json(
        {
          success: false,
          message: "Failed to delete category",
        },
        { status: 500 }
      );
    }

    await logEntry("category", { _id: category_id }, "DELETE");

    return NextResponse.json(
      {
        success: true,
        message: "Category deleted",
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
