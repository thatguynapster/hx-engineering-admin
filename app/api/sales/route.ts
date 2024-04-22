import { NextRequest, NextResponse } from "next/server";

import { dbConnect } from "@/libs/server";
import { logEntry } from "@/functions/server";
import { createSalesSchema } from "@/validators";
import {
  DiscountCollection,
  ProductCollection,
  SaleCollection,
} from "@/models";
import { IDiscount, IProduct, ISales } from "@/types";
import { Types } from "mongoose";
import { randomString } from "@/libs";

export const POST = async (req: NextRequest, res: NextResponse) => {
  await dbConnect();

  try {
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

export const GET = async (req: NextRequest, res: NextResponse) => {
  await dbConnect();
  const limit =
    (req.nextUrl.searchParams.get("limit") as unknown as number) ?? 10;
  const page = (req.nextUrl.searchParams.get("page") as unknown as number) ?? 1;
  const product_details =
    (req.nextUrl.searchParams.get("product_details") as unknown as boolean) ??
    false;
  const discount_details =
    (req.nextUrl.searchParams.get("discount_details") as unknown as boolean) ??
    false;

  try {
    // @ts-ignore this is valid
    const sales = await SaleCollection.paginate(
      {
        is_deleted: { $ne: true },
        is_dev: process.env.ENVIRONMENT === "development",
      },
      { lean: true, limit, page, sort: { _id: -1 } }
    );

    // get product details for each sale
    if (product_details) {
      sales.docs = await Promise.all(
        sales.docs.map(async (sale: ISales) => {
          sale.products = await Promise.all(
            // Wait for all inner promises to resolve
            sale.products.map(async (product) => {
              try {
                const productDetails = (await ProductCollection.findOne({
                  _id: product._id,
                }).lean()) as IProduct;

                product.details = productDetails;
                return product;
              } catch (error) {
                console.log("Error fetching product details");
                return product;
              }
            })
          );

          return sale;
        })
      );
    }
    // END get product details for each sale

    // get discount details for each sale
    if (discount_details) {
      sales.docs = await Promise.all(
        sales.docs.map(async (sale: ISales) => {
          const discountDetails = (await DiscountCollection.findOne({
            _id: sale.discount,
            is_dev: process.env.ENVIRONMENT === "development",
          }).lean()) as IDiscount;

          sale.discount_details = discountDetails;
          return sale;
        })
      );
    }
    // END get discount details for each sale

    if (!sales) {
      return NextResponse.json(
        { success: false, message: "No sales found", code: 204 },
        { status: 200 }
      );
    }

    return NextResponse.json(
      {
        success: true,
        message: "Sales found",
        response: sales,
      },
      { status: 200 }
    );
  } catch (error: any) {
    console.error("Error getting sales:", error);
    return NextResponse.json(
      {
        success: false,
        message: error.message ?? "An unexpected error occurred",
      },
      { status: 500 }
    );
  }
};

async function findMissingProducts(
  products: ISales["products"]
): Promise<string[]> {
  const productsDetails = await Promise.all(
    products.map(async (productId) => {
      const productDetails = await ProductCollection.findOne({
        _id: productId,
        is_deleted: false,
        is_dev: process.env.ENVIRONMENT === "development",
      });
      return productDetails ? null : productId;
    })
  );

  return productsDetails.filter(
    (product) => product?._id
  ) as unknown as string[];
}

async function findUnavailableProducts(
  products: ISales["products"]
): Promise<string[]> {
  const unavailableProducts = await Promise.all(
    products.map(async (product) => {
      const productDetails = await ProductCollection.findOne({
        _id: product._id,
        quantity: { $gte: product.quantity },
      });
      return productDetails ? null : product._id;
    })
  );
  return unavailableProducts.filter((product) => product) as string[];
}

async function calculateTotalPrice(
  products: ISales["products"]
): Promise<number> {
  let totalPrice = 0;
  await Promise.all(
    products.map(async (productId) => {
      const productDetails = await ProductCollection.findOne({
        _id: productId,
        is_deleted: false,
        is_dev: process.env.ENVIRONMENT === "development",
      });
      totalPrice += productDetails?.sale_price || 0;
    })
  );
  return totalPrice;
}

async function findDiscount(discountId: string): Promise<boolean> {
  const discountExists = await DiscountCollection.findOne({
    _id: discountId,
    is_deleted: false,
    is_dev: process.env.ENVIRONMENT === "development",
  });
  return !!discountExists;
}

async function addProductPrices(products: ISales["products"]) {
  const productsWithPrices = [];

  for (const product of products) {
    const productDetails = await ProductCollection.findOne({
      _id: product._id,
      is_deleted: false,
      is_dev: process.env.ENVIRONMENT === "development",
    });

    if (productDetails) {
      product.price = productDetails.sale_price;
      productsWithPrices.push(product);
    }
  }

  return productsWithPrices;
}

async function reduceProductQuantities(products: ISales["products"]) {
  await Promise.all(
    products.map(async (product) => {
      await ProductCollection.findOneAndUpdate(
        { _id: product._id },
        { $inc: { quantity: -product.quantity } }
      );
    })
  );
}
