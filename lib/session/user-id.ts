import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { SessionError } from "@/errors/session";
import { getServerSession } from "next-auth";
import 'server-only';

export async function getUserId() {
  const session = await getServerSession(authOptions);
  if (!session) throw new SessionError("No session found");
  return session.user.uid;
}