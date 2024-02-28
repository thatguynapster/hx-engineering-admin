import { logout } from "@/functions/server";

export async function GET() {
  await logout();

  const response = {
    success: true,
    message: "Logged out successfully",
  };

  return new Response(JSON.stringify(response), {
    headers: {
      "Content-Type": "application/json",
    },
  });
}
