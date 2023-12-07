import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth";

export async function getUserId() {
  const session = await getServerSession(authOptions);
  if (!session) throw new Error("No session found");
  return session.user.uid;
}