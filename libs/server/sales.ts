import { DiscountCollection, ProductCollection } from "@/models";
import { ISales } from "@/types";

export async function findMissingProducts(
  products: ISales["products"]
): Promise<string[]> {
  const productsDetails = await Promise.all(
    products.map(async (productId) => {
      const productDetails = await ProductCollection.findOne({
        _id: productId,
        is_deleted: false,
        is_dev: process.env.ENVIRONMENT === "development",
      });
      return productDetails ? null : productId._id;
    })
  );

  return productsDetails.filter((product) => product) as unknown as string[];
}

export async function findUnavailableProducts(
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

export async function calculateTotalPrice(
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

export async function findDiscount(discountId: string): Promise<boolean> {
  const discountExists = await DiscountCollection.findOne({
    _id: discountId,
    is_deleted: false,
    is_dev: process.env.ENVIRONMENT === "development",
  });
  return !!discountExists;
}

export async function addProductPrices(products: ISales["products"]) {
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

export async function reduceProductQuantities(products: ISales["products"]) {
  await Promise.all(
    products.map(async (product) => {
      await ProductCollection.findOneAndUpdate(
        { _id: product._id },
        { $inc: { quantity: -product.quantity } }
      );
    })
  );
}
