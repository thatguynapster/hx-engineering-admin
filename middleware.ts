import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

import {
  DEFAULT_LOGIN_REDIRECT,
  apiAuthPrefix,
  apiRoutes,
  authRoutes,
  publicRoutes,
} from "@/routes";
import { corsOptions } from "./configs";

// This function can be marked `async` if using `await` inside
export async function middleware(req: NextRequest) {
  /**
   * cors
   */
  // Response
  const response = NextResponse.next();

  // Allowed origins check
  const origin = req.headers.get("origin") ?? "";
  if (
    corsOptions.allowedOrigins.includes("*") ||
    corsOptions.allowedOrigins.includes(origin)
  ) {
    response.headers.set("Access-Control-Allow-Origin", origin);
  }

  // Set default CORS headers
  response.headers.set(
    "Access-Control-Allow-Credentials",
    corsOptions.credentials.toString()
  );
  response.headers.set(
    "Access-Control-Allow-Methods",
    corsOptions.allowedMethods.join(",")
  );
  response.headers.set(
    "Access-Control-Allow-Headers",
    corsOptions.allowedHeaders.join(",")
  );
  response.headers.set(
    "Access-Control-Expose-Headers",
    corsOptions.exposedHeaders.join(",")
  );
  response.headers.set(
    "Access-Control-Max-Age",
    corsOptions.maxAge?.toString() ?? ""
  );
  /**
   * END cors
   */

  const { nextUrl } = req;

  const token = req.cookies.get("token");

  const isLoggedIn = !!token;

  const isApiAuthRoute = nextUrl.pathname.startsWith(apiAuthPrefix);
  const isPublicRoute = publicRoutes.includes(nextUrl.pathname);
  const isAuthRoute = authRoutes.includes(nextUrl.pathname);
  const isAPIRoute = nextUrl.pathname.startsWith(apiRoutes);

  if (isApiAuthRoute) {
    console.log("is api auth route");
    return response;
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

    return response;
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
