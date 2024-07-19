import { NextRequest, NextResponse } from "next/server";
import { NextApiResponse } from "next";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export const POST = async (req: NextRequest, res: NextApiResponse) => {
  // Parse request body
  const reqBody = await req.json();

  const { name, email, message } = reqBody;

  try {
    console.log("sending email");
    await resend.batch.send([
      // Send notification email to myself
      {
        from: "HX Engineering Website <no-reply@hxcompanies.com>",
        to: ["hxeng.inc@gmail.com"],
        subject: "New Message - HX Engineering",
        html: `<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" " http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.otd">
<html lang="en" xmlns="http://www.w3.org/1999/xhtml">
  <head>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>HX | New Message</title>

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
                      You have a new message
                    </h1>
                  </td>
                </tr>

                <tr>
                  <td style="padding: 1rem 0"></td>
                </tr>

                <!-- summary -->
                <tr>
                  <td>
                    <table style="width: 100%; background-color: #fcfcfc">
                      <tr>
                        <td style="padding: 0.5rem; width: max-content">
                          <div style="display: flex; margin-bottom: 16px">
                            <p
                              style="
                                width: 15%;
                                font-size: 0.75rem;
                                font-weight: bold;
                              "
                            >
                              From:
                            </p>
                          <p style="width: 85%; font-size: 0.75rem">${name}</p>
                          </div>

                          
                          <div style="display: flex; margin-bottom: 16px">
                            <p
                              style="
                                width: 15%;
                                font-size: 0.75rem;
                                font-weight: bold;
                              "
                            >
                              Email:
                            </p>
                            <p style="width: 85%; font-size: 0.75rem">
                              ${email}
                            </p>
                          </div>


                          <div style="display: flex">
                            <p
                              style="
                                width: 15%;
                                font-size: 0.75rem;
                                font-weight: bold;
                              "
                            >
                              Message:
                            </p>
                            <p style="width: 85%; font-size: 0.75rem">
                             ${message}
                            </p>
                          </div>
                        </td>
                       
                      </tr>
                    </table>
                  </td>
                </tr>

                <tr>
                  <td style="padding: 1rem 0"></td>
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

      // Send response email to user
      {
        from: "HX Engineering <info@hxcompanies.com>",
        to: [email],
        subject: "Message Received - HX Engineering",
        html: `<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" " http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.otd">
<html lang="en" xmlns="http://www.w3.org/1999/xhtml">
  <head>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>HX | Contact Acknowledgement</title>

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
                      We've received your message
                    </h1>
                  </td>
                </tr>

                <tr>
                  <td style="padding: 1rem 0"></td>
                </tr>

                <!-- summary -->
                <tr>
                  <td>
                    <table style="width: 100%; background-color: #fcfcfc">
                      <tr>
                        <td style="padding: 0.5rem; width: max-content">
                          <div style="display: flex">
                            <p style="width: 85%; font-size: 0.75rem">
                              Hello ${name},
                              <br /><br />
                              This is to let you know we've received your
                              message. We'll reach out to you shortly.
                              <br /><br />
                              Regards
                            </p>
                          </div>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>

                <tr>
                  <td style="padding: 1rem 0"></td>
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

    return NextResponse.json(
      {
        success: true,
        message: "Message sent",
        code: 200,
      },
      { status: 200 }
    );
  } catch (error: any) {
    return NextResponse.json(
      {
        ...error,
        message: "Error",
      },
      { status: 500 }
    );
  }
};

export const OPTIONS = async () => {
  console.log("in options");
  return new NextResponse("", { status: 200 });
};
