import { cookies } from "next/headers";

export async function POST() {
  const c = await cookies();
  c.delete("token");
  c.delete("refresh-token");

  return Response.json({ message: "Logout is done" });
}
