import { NextRequest, NextResponse } from "next/server";

import { updateAnnouncementSchema } from "@/validators";
import { AnnouncementCollection } from "@/models";
import { logEntry } from "@/functions/server";
import { dbConnect } from "@/libs/server";
import { IProduct } from "@/types";

export const GET = async (
  req: NextRequest,
  { params }: { params: { announcement_id: string } },
  res: NextResponse
) => {
  try {
    await dbConnect();

    const { announcement_id } = params;

    const announcement = (await AnnouncementCollection.findOne({
      _id: announcement_id,
      is_deleted: false,
    }).lean()) as IProduct;

    if (!announcement) {
      return NextResponse.json(
        {
          success: false,
          message: "Announcement not found",
        },
        { status: 400 }
      );
    }

    return NextResponse.json(
      {
        success: true,
        message: "Announcement found",
        response: announcement,
      },
      { status: 200 }
    );
  } catch (error: any) {
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

export const PUT = async (
  req: NextRequest,
  { params }: { params: { announcement_id: string } }
) => {
  try {
    await dbConnect();

    const { announcement_id } = params;
    const reqBody = await req.json();

    const announcement = await AnnouncementCollection.findById(
      announcement_id
    ).lean();

    if (!announcement) {
      return NextResponse.json(
        {
          success: false,
          message: "Product not found",
        },
        { status: 400 }
      );
    }

    const announcementBody = await updateAnnouncementSchema(reqBody);

    const updatedAnnouncement = await AnnouncementCollection.findOneAndUpdate(
      { _id: announcement_id },
      announcementBody,
      { new: true }
    );

    if (!updatedAnnouncement) {
      return NextResponse.json(
        {
          success: false,
          message: "Failed to update announcement",
        },
        { status: 500 }
      );
    }

    await logEntry("announcement", announcementBody, "UPDATE");

    return NextResponse.json(
      {
        success: true,
        message: "Product updated",
        response: updatedAnnouncement,
      },
      { status: 200 }
    );
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      {
        error,
        message: "An unexpected error occurred",
      },
      { status: 500 }
    );
  }
};

export const DELETE = async (
  req: NextRequest,
  { params }: { params: { announcement_id: string } },
  res: NextResponse
) => {
  try {
    await dbConnect();

    const { announcement_id } = params;

    const announcement = await AnnouncementCollection.findById(
      announcement_id
    ).lean();

    if (!announcement) {
      return NextResponse.json(
        {
          success: false,
          message: "Announcement not found",
        },
        { status: 400 }
      );
    }

    const deletedAnnouncement = await AnnouncementCollection.findOneAndUpdate(
      { _id: announcement_id },
      { is_deleted: true },
      { new: true }
    );

    if (!deletedAnnouncement) {
      return NextResponse.json(
        {
          success: false,
          message: "Failed to delete announcement",
        },
        { status: 500 }
      );
    }

    await logEntry("announcement", { _id: announcement_id }, "DELETE");

    return NextResponse.json(
      {
        success: true,
        message: "Announcement deleted",
      },
      { status: 200 }
    );
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      {
        error,
        message: "An unexpected error occurred",
      },
      { status: 500 }
    );
  }
};
