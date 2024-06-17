import { NextRequest, NextResponse } from "next/server";
import dayjs from "dayjs";

import { dbConnect } from "@/libs/server";
import { SaleCollection } from "@/models";

export const GET = async (req: NextRequest, res: NextResponse) => {
  const from_date =
    req.nextUrl.searchParams.get("from_date") ??
    dayjs().subtract(30, "days").startOf("day").toDate();
  const to_date =
    req.nextUrl.searchParams.get("to_date") ?? dayjs().endOf("day").toDate();

  try {
    await dbConnect();

    const sales = await SaleCollection.find({
      createdAt: {
        $gte: from_date,
        $lte: to_date,
      },
    }).lean();

    if (!sales) {
      return NextResponse.json(
        { success: false, message: "No sales found", code: 204 },
        { status: 200 }
      );
    }

    const total = {
      count: sales.length,
      amount: sales.reduce((acc, s) => acc + s.price, 0),
    };

    // completed orders
    const completed = (() => {
      const completed = sales.filter((s) => s.status === "COMPLETED");
      return {
        count: completed.length,
        amount: completed.reduce((acc, s) => acc + s.price, 0),
      };
    })();

    // pending orders
    const pending = (() => {
      const pending = sales.filter((s) => s.status === "PENDING" || !s.status);
      return {
        count: pending.length,
        amount: pending.reduce((acc, s) => acc + s.price, 0),
      };
    })();

    return NextResponse.json(
      {
        success: true,
        message: "Sales found",
        response: {
          total,
          completed,
          pending,
        },
      },
      { status: 200 }
    );
  } catch (error: any) {
    console.error("Error getting sales summary:", error);
    return NextResponse.json(
      {
        success: false,
        message: error.message ?? "An unexpected error occurred",
      },
      { status: 500 }
    );
  }
};
