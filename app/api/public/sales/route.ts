import { NextRequest, NextResponse } from "next/server";
import { Types } from "mongoose";

import { createSalesSchema } from "@/validators";
import { logEntry } from "@/functions/server";
import {
  addProductPrices,
  calculateTotalPrice,
  dbConnect,
  findDiscount,
  findMissingProducts,
  findUnavailableProducts,
  reduceProductQuantities,
  sendOrderConfirmationEmail,
} from "@/libs/server";
import { SaleCollection } from "@/models";
import { randomString } from "@/libs";

export const POST = async (req: NextRequest, res: NextResponse) => {
  try {
    await dbConnect();

    const reqBody = await req.json();

    const saleBody = await createSalesSchema(reqBody);

    const missingProducts = await findMissingProducts(saleBody.products);
    if (missingProducts.length > 0) {
      return NextResponse.json(
        {
          success: false,
          message: "Some products do not exist or are no longer in stock",
          missingProducts,
        },
        { status: 400 }
      );
    }

    const unavailableProducts = await findUnavailableProducts(
      saleBody.products
    );
    console.log("unavailable products:", unavailableProducts);

    if (unavailableProducts.length > 0) {
      return NextResponse.json(
        {
          success: false,
          message: "Some products are short in stock",
          unavailableProducts,
        },
        { status: 400 }
      );
    }

    const totalPrice = await calculateTotalPrice(saleBody.products);
    const discountExists = saleBody.discount
      ? await findDiscount(saleBody.discount)
      : true;

    if (!discountExists) {
      return NextResponse.json(
        { success: false, message: "Invalid discount code" },
        { status: 400 }
      );
    }

    const productsWithPrices = await addProductPrices(saleBody.products);

    const saleCode = randomString(6, "A#");

    const sale = new SaleCollection({
      ...saleBody,
      code: saleCode,
      products: productsWithPrices,
      _id: new Types.ObjectId(),
      is_dev: process.env.ENVIRONMENT === "development",
      price: totalPrice,
    });

    const savedSale = await sale.save();
    await logEntry("sale", saleBody, "CREATE");

    // send sale confirmation emails
    await sendOrderConfirmationEmail({ order: savedSale });

    // Reduce product quantities
    await reduceProductQuantities(saleBody.products);

    return NextResponse.json(
      {
        success: true,
        message: "Sale created successfully",
        sale: savedSale,
      },
      { status: 200 }
    );
  } catch (error: any) {
    console.error("Error creating sale:", error);
    return NextResponse.json(
      {
        success: false,
        message: error.message ?? "An unexpected error occurred",
      },
      { status: 500 }
    );
  }
};

export const OPTIONS = async () => {
  console.log("in options");
  return new NextResponse("", { status: 200 });
};
