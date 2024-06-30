import { NextRequest, NextResponse } from "next/server";

import { createAnnouncementSchema } from "@/validators";
import { AnnouncementCollection } from "@/models";
import { logEntry } from "@/functions/server";
import { dbConnect } from "@/libs/server";

export const POST = async (req: NextRequest, res: NextResponse) => {
  try {
    await dbConnect();

    const reqBody = await req.json();

    const announcementBody = await createAnnouncementSchema(reqBody);

    const announcement = new AnnouncementCollection({
      ...announcementBody,
      is_deleted: false,
    });

    const savedAnnouncement = await announcement.save();
    await logEntry("announcement", announcementBody, "CREATE");

    return NextResponse.json(
      {
        success: true,
        message: "Announcement created successfully",
        response: savedAnnouncement,
      },
      { status: 200 }
    );
  } catch (error: any) {
    console.error("Error creating announcement:", error);
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
    const announcements = await AnnouncementCollection.paginate(query, {
      lean: true,
      limit,
      page,
      sort: { _id: -1 },
    });

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
