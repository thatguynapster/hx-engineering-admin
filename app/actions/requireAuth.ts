"use server";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export const checkAuthentication = async (path: string) => {
  const token = cookies().get("token");
  console.log(!!token);
  if (!!token) {
    revalidatePath(path); // Update cached posts
    redirect(`/`); // Navigate to the new post page
  }
};
