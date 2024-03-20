import { verifyJwtToken } from "@/functions/server";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import jwt from "jsonwebtoken";

import {
  DEFAULT_LOGIN_REDIRECT,
  apiAuthPrefix,
  apiRoutes,
  authRoutes,
  publicRoutes,
} from "@/routes";

// Config
// ========================================================
const corsOptions: {
  allowedMethods: string[];
  allowedOrigins: string[];
  allowedHeaders: string[];
  exposedHeaders: string[];
  maxAge?: number;
  credentials: boolean;
} = {
  allowedMethods: (process.env?.ALLOWED_METHODS || "").split(","),
  allowedOrigins: (process.env?.ALLOWED_ORIGIN || "").split(","),
  allowedHeaders: (process.env?.ALLOWED_HEADERS || "").split(","),
  exposedHeaders: (process.env?.EXPOSED_HEADERS || "").split(","),
  maxAge: (process.env?.MAX_AGE && parseInt(process.env?.MAX_AGE)) || undefined, // 60 * 60 * 24 * 30, // 30 days
  credentials: process.env?.CREDENTIALS == "true",
};

// This function can be marked `async` if using `await` inside
export async function middleware(req: NextRequest, res: NextResponse) {
  const { nextUrl } = req;

  const token = req.cookies.get("token");

  const isLoggedIn = !!token;

  const isApiAuthRoute = nextUrl.pathname.startsWith(apiAuthPrefix);
  const isPublicRoute = publicRoutes.includes(nextUrl.pathname);
  const isAuthRoute = authRoutes.includes(nextUrl.pathname);
  const isAPIRoute = nextUrl.pathname.startsWith(apiRoutes);

  if (isApiAuthRoute) {
    console.log("is api auth route");
    return null;
  }

  if (isAuthRoute) {
    console.log("is auth page route");
    if (isLoggedIn) {
      return Response.redirect(new URL(DEFAULT_LOGIN_REDIRECT, nextUrl));
    }
    return null;
  }

  if (isAPIRoute && !isAuthRoute) {
    console.log("is api route");

    const authorization = req.headers.get("Authorization");

    if (!authorization) {
      return Response.json(
        {
          message: "Missing authentication",
        },
        { status: 500 }
      );
    }

    // TODO check if token exists
    const token = authorization.split("Bearer ")[1];

    if (!token) {
      return Response.json(
        {
          message: "Authentication failed",
        },
        { status: 500 }
      );
    }

    return null;
  }

  if (!isLoggedIn && !isPublicRoute) {
    return Response.redirect(new URL("/", nextUrl));
  }

  return null;
}

// Optionally, don't invoke Middleware on some paths
// Read more: https://nextjs.org/docs/app/building-your-application/routing/middleware#matcher
export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};
