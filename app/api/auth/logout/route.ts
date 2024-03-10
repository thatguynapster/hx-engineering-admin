import { logout } from "@/functions/server";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const { nextUrl } = req;
  await logout();
  const response = NextResponse.redirect(new URL("/", nextUrl));

  response.cookies.delete("token");

  return response;
}
