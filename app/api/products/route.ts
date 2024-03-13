import { NextApiRequest } from "next";
import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";

import { CategoryCollection, ProductCollection } from "@/models";
import { ICategory, IProduct } from "@/types";
import { dbConnect, validateToken } from "@/libs/server";
import { createProductSchema } from "@/validators";
import mongoose from "mongoose";
import { logEntry } from "@/functions/server";

export const GET = async (req: NextRequest, res: NextResponse) => {
  await dbConnect();

  try {
    const limit =
      (req.nextUrl.searchParams.get("limit") as unknown as number) ?? 10;
    const page =
      (req.nextUrl.searchParams.get("page") as unknown as number) ?? 1;
    const category_details =
      (req.nextUrl.searchParams.get(
        "category_details"
      ) as unknown as boolean) ?? false;

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
        },
        { status: 500 }
      );
    }
    //END check if token is valid

    // @ts-ignore this is valid
    const products = await ProductCollection.paginate(
      { is_deleted: false, is_dev: process.env.ENVIRONMENT === "development" },
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
  await dbConnect();

  try {
    const reqBody = await req.json();

    const productBody = await createProductSchema(reqBody);

    // const existingProduct = await ProductCollection.findOne({
    //   name: productBody.name,
    //   is_deleted: { $ne: true },
    // });

    // if (existingProduct) {
    //   const error = new Error("Product with the same name already exists");
    //   error.name = "AlreadyExists";
    //   throw error;
    // }

    const product = await new ProductCollection({
      ...productBody,
      _id: new mongoose.Types.ObjectId(),
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
