import { NextRequest, NextResponse } from "next/server";
import mongoose from "mongoose";

import { createProductSchema } from "@/validators";
import { logEntry, upload_file } from "@/functions/server";
import { ProductCollection } from "@/models";
import { dbConnect } from "@/libs/server";

export const POST = async (req: NextRequest, res: NextResponse) => {
  try {
    await dbConnect();

    const reqBody = await req.formData();

    const file = reqBody.get("file");

    const uploadPath = await upload_file(
      file,
      String(process.env.APPWRITE_PRODUCTS_BUCKET_ID)
    );

    return NextResponse.json(
      {
        success: true,
        message: "File uploaded",
        response: uploadPath,
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
