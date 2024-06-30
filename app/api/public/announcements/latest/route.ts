import { NextRequest, NextResponse } from "next/server";

import { AnnouncementCollection } from "@/models";
import { dbConnect } from "@/libs/server";

export const GET = async (req: NextRequest, res: NextResponse) => {
  try {
    await dbConnect();

    const limit =
      (req.nextUrl.searchParams.get("limit") as unknown as number) ?? 10;
    const page =
      (req.nextUrl.searchParams.get("page") as unknown as number) ?? 1;

    let query: any = {
      is_deleted: false,
    };

    // @ts-ignore this is valid
    const announcements = await AnnouncementCollection.findOne(query)
      .sort({ _id: -1 })
      .lean();

    if (!announcements) {
      return NextResponse.json(
        { success: false, message: "No announcements found" },
        { status: 200 }
      );
    }

    return NextResponse.json(
      {
        success: true,
        message: "Announcements found",
        response: announcements,
      },
      { status: 200 }
    );
  } catch (error: any) {
    console.log("ERROR: ", error);
    return NextResponse.json(
      {
        error,
        message: "Error error",
      },
      { status: 500 }
    );
  }
};
