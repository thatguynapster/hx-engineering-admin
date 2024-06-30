import { NextRequest, NextResponse } from "next/server";

import { createAnnouncementSchema } from "@/validators";
import { dbConnect } from "@/libs/server";
import { AnnouncementCollection } from "@/models";
import { Types } from "mongoose";
import { logEntry } from "@/functions/server";

export const GET = async (req: NextRequest, res: NextResponse) => {
  try {
    await dbConnect();

    const limit =
      (req.nextUrl.searchParams.get("limit") as unknown as number) ?? 10;
    const page =
      (req.nextUrl.searchParams.get("page") as unknown as number) ?? 1;
    const latest = req.nextUrl.searchParams.get("latest") ?? true;
    console.log(typeof latest, latest);

    let query: any = {
      is_deleted: false,
    };
    let queryOptions = {
      lean: true,
      limit,
      page,
      sort: { _id: -1 },
      offset: 0,
    };

    if (latest == "false") {
      queryOptions = { ...queryOptions, offset: 1 };
    }
    console.log(queryOptions);

    // @ts-ignore this is valid
    const announcements = await AnnouncementCollection.paginate(
      query,
      queryOptions
    );

    if (!announcements.docs.length) {
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
