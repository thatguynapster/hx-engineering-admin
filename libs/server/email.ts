import { ProductCollection } from "@/models";
import { IProduct, ISales } from "@/types";
import dayjs from "dayjs";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export const sendOrderConfirmationEmail = async ({
  order,
}: {
  order: ISales;
}) => {
  console.log("sending order confirmation emails");
  console.log(order);

  let products_details: IProduct[] = [];

  // get products in order
  order.products = await Promise.all(
    order.products.map(async (product) => {
      const product_details = (await ProductCollection.findOne({
        _id: product._id,
      }).lean()) as IProduct;

      products_details.push(product_details);
      return product;
    })
  );
  console.log("products details");
  console.log(products_details);

  await resend.batch.send([
    {
      from: "HX Engineering <sales@hxcompanies.com>",
      to: [order.user.email || ""],
      subject: "Order Confirmation - HX Engineering",
      html: `<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" " http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.otd">
<html lang="en" xmlns="http://www.w3.org/1999/xhtml">
  <head>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>HX | Order Confirmation</title>

    <!-- style resets -->
    <style type="text/css">
      body {
        background-color: #edf6ff;
        margin: 0;
      }
      table {
        border-spacing: 0;
      }
      td {
        padding: 0;
      }
      img {
        border: 0;
      }
      h1,
      h2,
      h3,
      h4,
      h5,
      h6,
      hr,
      p {
        margin: 0;
      }
    </style>
  </head>
  <body>
    <center
      style="
        background-color: #edf6ff;
        padding-bottom: 60px;
        table-layout: fixed;
        width: 100%;
      "
    >
      <table
        style="
          font-family: sans-serif;
          border-spacing: 0;
          max-width: 600px;
          margin: 32px auto;
          width: 100%;
        "
      >
        <!-- EMAIL BODY -->

        <tr>
          <td style="border: 1px solid #eaebed">
            <center
              style="
                background-color: #ffffff;
                border-radius: 16px 16px 0 0;
                padding: 24px;
              "
            >
              <table style="width: 100%">
                <!-- LOGO -->

                <tr>
                  <td>
                    <center>
                      <a href="https://hxcompanies.com/"
                        ><img
                          src="https://hxcompanies.com/img/logo.png"
                          alt="HX Companies"
                          height="80"
                          width="80"
                          style="object-fit: contain"
                      /></a>
                    </center>
                  </td>
                </tr>

                <!-- header -->
                <tr>
                  <td>
                    <h1
                      style="
                        text-align: center;
                        font-weight: 900;
                        font-size: 1.5rem;
                      "
                    >
                      Your order is being processed.
                    </h1>
                  </td>
                </tr>

                <tr>
                  <td style="padding: 1rem 0"></td>
                </tr>

                <!-- summary -->
                <tr>
                  <td>
                    <table
                      style="
                        width: 100%;
                        background-color: #fcfcfc;
                        border: 1px solid #dfdfdf;
                      "
                    >
                      <tr>
                        <td
                          style="
                            width: 50%;
                            border-right: 1px solid #dfdfdf;
                            padding: 0.5rem;
                          "
                        >
                          <h2
                            style="
                              text-transform: uppercase;
                              font-weight: 700;
                              font-size: 1.125rem;
                              margin-bottom: 0.5rem;
                            "
                          >
                            summary
                          </h2>

                          <p style="font-size: 0.875rem">
                            Order #: ${order.code}
                          </p>
                          <p style="font-size: 0.875rem">
                            Date: ${dayjs(order.createdAt).format(
                              "MMM DD, YYYY"
                            )}
                          </p>
                          <p style="font-size: 0.875rem">
                            Order Total: &#8373; ${order.price.toFixed(2)}
                          </p>
                        </td>

                        <td style="width: 50%; padding: 0.5rem">
                          <h2
                            style="
                              text-transform: uppercase;
                              font-weight: 700;
                              font-size: 1rem;
                              margin-bottom: 0.5rem;
                            "
                          >
                            shipping address
                          </h2>

                          <p style="font-size: 0.875rem">${order.user.name}</p>
                          <p style="font-size: 0.875rem">
                            ${order.location.address}
                          </p>
                          <p style="font-size: 0.875rem">
                            ${order.location.city}, ${order.location.country}
                          </p>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>

                <tr>
                  <td style="padding: 1rem 0"></td>
                </tr>

                <tr>
                  <td>
                    <table style="width: 100%">
                      <thead>
                        <tr>
                          <th
                            scope="col"
                            style="
                              text-transform: uppercase;
                              font-size: 1rem;
                              font-weight: 700;
                              text-align: left;
                            "
                            colspan="2"
                          >
                            package
                          </th>
                          <th
                            scope="col"
                            style="
                              text-transform: uppercase;
                              font-size: 1rem;
                              font-weight: 700;
                              text-align: center;
                            "
                          >
                            qty
                          </th>
                          <th
                            scope="col"
                            style="
                              text-transform: uppercase;
                              font-size: 1rem;
                              font-weight: 700;
                              text-align: right;
                            "
                          >
                            price
                          </th>
                        </tr>
                        <tr>
                          <td colspan="4">
                            <hr style="border: 1px solid #f0f0f0" />
                          </td>
                        </tr>
                      </thead>
                      <tbody>
                      ${products_details.map((prod, i) => {
                        return `
                        
                        <tr>
                          <td style="width: 64px">
                            <img
                              src="${prod.images[0]}"
                              alt="product image"
                              style="
                                width: 64px;
                                height: 64px;
                                object-fit: contain;
                              "
                            />
                          </td>
                          <td style="padding-left: 1rem">${prod.name}</td>
                          <td style="text-align: center">${
                            order.products[i].quantity
                          }</td>
                          <td style="text-align: right">&#8373; ${order.products[
                            i
                          ].price.toFixed(2)}</td>
                        </tr>
              
                        <tr>
                            <td colspan="4">
                            <hr style="border: 1px solid #dfdfdf" />
                            </td>
                        </tr>`;
                      })}
                      </tbody>
                    </table>
                  </td>
                </tr>

                <tr>
                  <td style="padding: 1rem 0">
                    <table>
                      <!-- <tr>
                        <td style="width: 100%; text-align: right">
                          <p style="font-weight: 600">Subtotal (3 items):</p>
                        </td>
                        <td style="padding-left: 1rem; text-align: right">
                          GHc3600.00
                        </td>
                      </tr> -->

                      <!-- <tr>
                        <td style="width: 100%; text-align: right">
                          <p style="font-weight: 600">Discount:</p>
                        </td>
                        <td style="padding-left: 1rem; text-align: right">
                          GHc3600.00
                        </td>
                      </tr> -->

                      <!-- <tr>
                        <td style="padding: 0.375rem 0"></td>
                      </tr> -->

                      <tr>
                        <td style="width: 100%; text-align: right">
                          <p style="font-size: 1.25rem; font-weight: 800">
                            Order Total:
                          </p>
                        </td>
                        <td
                          style="
                            font-size: 1.25rem;
                            font-weight: 700;
                            color: #0099ff;
                            padding-left: 1rem;
                            text-align: right;
                            text-wrap: nowrap;
                          "
                        >
                          &#8373;${order.price.toFixed(2)}
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>
            </center>

            <center
              style="
                background-color: #0099ff;
                border-radius: 0 0 16px 16px;
                padding: 24px;
                text-align: center;
                color: white;
                font-weight: 600;
                font-size: 1.25rem;
              "
            >
              <table style="width: 100%">
                <tr>
                  <td>You can reach us at (+233) 0 597 447 768</td>
                </tr>
              </table>
            </center>
          </td>
        </tr>

        <!-- FOOTER -->

        <tr>
          <td>
            <center style="margin-top: 24px">
              <a
                href="https://hxcompanies.com/"
                style="filter: grayscale(); opacity: 70%"
              >
                <img
                  src="https://hxcompanies.com/img/logo.png"
                  alt="HX Companies"
                  height="60"
                  width="60"
                  style="object-fit: contain"
                />
              </a>
            </center>
          </td>
        </tr>
      </table>
    </center>
  </body>
</html>
`,
    },
    {
      from: "HX Engineering <info@hxcompanies.com>",
      to: ["hxeng.inc@gmail.com"],
      subject: "New Order - HX Engineering",
      html: `<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" " http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.otd">
<html lang="en" xmlns="http://www.w3.org/1999/xhtml">
  <head>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>HX | New Order</title>

    <!-- style resets -->
    <style type="text/css">
      body {
        background-color: #edf6ff;
        margin: 0;
      }
      table {
        border-spacing: 0;
      }
      td {
        padding: 0;
      }
      img {
        border: 0;
      }
      h1,
      h2,
      h3,
      h4,
      h5,
      h6,
      hr,
      p {
        margin: 0;
      }
    </style>
  </head>
  <body>
    <center
      style="
        background-color: #edf6ff;
        padding-bottom: 60px;
        table-layout: fixed;
        width: 100%;
      "
    >
      <table
        style="
          font-family: sans-serif;
          border-spacing: 0;
          max-width: 600px;
          margin: 32px auto;
          width: 100%;
        "
      >
        <!-- EMAIL BODY -->

        <tr>
          <td>
            <center
              style="
                background-color: #ffffff;
                border-radius: 16px;
                border: 1px solid #eaebed;
                padding: 24px;
              "
            >
              <table style="width: 100%">
                <!-- LOGO -->

                <tr>
                  <td>
                    <center>
                      <a href="https://hxcompanies.com/"
                        ><img
                          src="https://hxcompanies.com/img/logo.png"
                          alt="HX Companies"
                          height="80"
                          width="80"
                          style="object-fit: contain"
                      /></a>
                    </center>
                  </td>
                </tr>

                <!-- header -->
                <tr>
                  <td>
                    <h1
                      style="
                        text-align: center;
                        font-weight: 900;
                        font-size: 1.5rem;
                      "
                    >
                      You have a new order
                    </h1>
                  </td>
                </tr>

                <tr>
                  <td style="padding: 1rem 0"></td>
                </tr>

                <!-- summary -->
                <tr>
                  <td>
                    <table
                      style="
                        width: 100%;
                        background-color: #fcfcfc;
                        border: 1px solid #dfdfdf;
                      "
                    >
                      <tr>
                        <td
                          style="
                            width: 50%;
                            border-right: 1px solid #dfdfdf;
                            padding: 0.5rem;
                          "
                        >
                          <h2
                            style="
                              text-transform: uppercase;
                              font-weight: 700;
                              font-size: 1.125rem;
                              margin-bottom: 0.5rem;
                            "
                          >
                            summary
                          </h2>

                          <p style="font-size: 0.875rem">
                            Order #: ${order.code}
                          </p>
                          <p style="font-size: 0.875rem">
                            Date: ${dayjs(order.createdAt).format(
                              "MMM DD, YYYY"
                            )}
                          </p>
                          <p style="font-size: 0.875rem">
                            Order Total: &#8373; ${order.price.toFixed(2)}
                          </p>
                        </td>

                        <td style="width: 50%; padding: 0.5rem">
                          <h2
                            style="
                              text-transform: uppercase;
                              font-weight: 700;
                              font-size: 1rem;
                              margin-bottom: 0.5rem;
                            "
                          >
                            shipping address
                          </h2>

                          <p style="font-size: 0.875rem">${order.user.name}</p>
                          <p style="font-size: 0.875rem">
                            ${order.location.address}
                          </p>
                          <p style="font-size: 0.875rem">
                            ${order.location.city}, ${order.location.country}
                          </p>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>

                <tr>
                  <td style="padding: 1rem 0"></td>
                </tr>

                <tr>
                  <td>
                    <table style="width: 100%">
                      <thead>
                        <tr>
                          <th
                            scope="col"
                            style="
                              text-transform: uppercase;
                              font-size: 1rem;
                              font-weight: 700;
                              text-align: left;
                            "
                            colspan="2"
                          >
                            package
                          </th>
                          <th
                            scope="col"
                            style="
                              text-transform: uppercase;
                              font-size: 1rem;
                              font-weight: 700;
                              text-align: center;
                            "
                          >
                            qty
                          </th>
                          <th
                            scope="col"
                            style="
                              text-transform: uppercase;
                              font-size: 1rem;
                              font-weight: 700;
                              text-align: right;
                            "
                          >
                            price
                          </th>
                        </tr>
                        <tr>
                          <td colspan="4">
                            <hr style="border: 1px solid #f0f0f0" />
                          </td>
                        </tr>
                      </thead>
                      <tbody>
                          ${products_details.map((prod, i) => {
                            return `
                                <tr>
                                    <td style="width: 64px">
                                        <img
                                        src="${prod.images[0]}"
                                        alt="product image"
                                        style="
                                            width: 64px;
                                            height: 64px;
                                            object-fit: contain;
                                        "
                                        />
                                    </td>
                                    <td style="padding-left: 1rem">${
                                      prod.name
                                    }</td>
                                    <td style="text-align: center">${
                                      order.products[i].quantity
                                    }</td>
                                    <td style="text-align: right">&#8373; ${order.products[
                                      i
                                    ].price.toFixed(2)}</td>
                                </tr>
                    
                                <tr>
                                    <td colspan="4">
                                    <hr style="border: 1px solid #dfdfdf" />
                                    </td>
                                </tr>`;
                          })}
                      </tbody>
                    </table>
                  </td>
                </tr>

                <tr>
                  <td style="padding: 1rem 0">
                    <table>
                      <!-- <tr>
                        <td style="width: 100%; text-align: right">
                          <p style="font-weight: 600">Subtotal (3 items):</p>
                        </td>
                        <td style="padding-left: 1rem; text-align: right">
                          GHc3600.00
                        </td>
                      </tr> -->

                      <!-- <tr>
                        <td style="width: 100%; text-align: right">
                          <p style="font-weight: 600">Discount:</p>
                        </td>
                        <td style="padding-left: 1rem; text-align: right">
                          GHc3600.00
                        </td>
                      </tr> -->

                      <!-- <tr>
                        <td style="padding: 0.375rem 0"></td>
                      </tr> -->

                      <tr>
                        <td style="width: 100%; text-align: right">
                          <p style="font-size: 1.25rem; font-weight: 800">
                            Order Total:
                          </p>
                        </td>
                        <td
                          style="
                            font-size: 1.25rem;
                            font-weight: 700;
                            color: #0099ff;
                            padding-left: 1rem;
                            text-align: right;
                            text-wrap: nowrap;
                          "
                        >
                           &#8373;${order.price.toFixed(2)}
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>
            </center>
          </td>
        </tr>

        <!-- FOOTER -->

        <tr>
          <td>
            <center style="margin-top: 24px">
              <a
                href="https://hxcompanies.com/"
                style="filter: grayscale(); opacity: 70%"
              >
                <img
                  src="https://hxcompanies.com/img/logo.png"
                  alt="HX Companies"
                  height="60"
                  width="60"
                  style="object-fit: contain"
                />
              </a>
            </center>
          </td>
        </tr>
      </table>
    </center>
  </body>
</html>
`,
    },
  ]);
};
