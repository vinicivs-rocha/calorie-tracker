import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { getLastFeeding } from "@/utils/documents";
import { getServerSession } from "next-auth";

export async function getCaloriesIntake(): Promise<number> {
  const { user } = (await getServerSession(authOptions))!;

  const lastFeeding = await getLastFeeding(user.uid);
  const { intake } = lastFeeding.data();
  return intake;
}