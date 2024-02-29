import { IUserResponse } from "@/types";
import { jwtVerify, JWTPayload } from "jose";
import { Types } from "mongoose";
import { cookies } from "next/headers";

export function getJwtSecretKey() {
  const secret = process.env.JWT_SECRET;

  if (!secret) {
    throw new Error("JWT Secret key is not set");
  }

  const enc: Uint8Array = new TextEncoder().encode(secret);
  return enc;
}

export async function verifyJwtToken(
  token: string
): Promise<JWTPayload | null> {
  try {
    const { payload } = await jwtVerify(token, getJwtSecretKey());

    return payload;
  } catch (error) {
    return null;
  }
}

export async function getJwt() {
  const cookieStore = cookies();
  const token = cookieStore.get("token");

  if (token) {
    try {
      const payload = await verifyJwtToken(token.value);
      if (payload) {
        const authPayload: IUserResponse = {
          _id: payload.id as Types.ObjectId,
          name: payload.name as string,
          email: payload.email as string,
          role: payload.role as string,
          is_deleted: payload.is_deleted as boolean,
          is_dev: payload.is_dev as boolean,
          createdAt: payload.createdAt as string,
          updatedAt: payload.updatedAt as string,
        };
        return authPayload;
      }
    } catch (error) {
      return null;
    }
  }
  return null;
}

export async function logout() {
  const cookieStore = cookies();
  const token = cookieStore.get("token");

  if (token) {
    try {
      cookieStore.delete("token");
    } catch (_) {}
  }

  const userData = cookieStore.get("userData");
  if (userData) {
    try {
      cookieStore.delete("userData");
      return true;
    } catch (_) {}
  }

  return null;
}

export function setUserDataCookie(userData: IUserResponse) {
  const cookieStore = cookies();

  cookieStore.set({
    name: "userData",
    value: JSON.stringify(userData),
    path: "/",
    maxAge: 86400, // 24 hours
    sameSite: "strict",
  });
}
