import { NextRequest, NextResponse } from "next/server";

import { updateStatusSchema } from "@/validators";
import { logEntry } from "@/functions/server";
import { dbConnect } from "@/libs/server";
import { SaleCollection } from "@/models";

export const PUT = async (
  req: NextRequest,
  { params }: { params: { sale_id: string } },
  res: NextResponse
) => {
  try {
    await dbConnect();

    const { sale_id } = params;
    const reqBody = await req.json();
    const saleBody = await updateStatusSchema(reqBody);

    const sale = await SaleCollection.findOneAndUpdate(
      { _id: sale_id },
      { status: saleBody.status },
      { new: true }
    );

    if (!sale) {
      return NextResponse.json(
        {
          success: false,
          message: "Failed to update sale",
        },
        { status: 500 }
      );
    }

    await logEntry("sale", saleBody, "UPDATE");

    return NextResponse.json(
      {
        success: true,
        message: "Sale updated",
        response: sale,
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
