import { getLastFeeding } from "@/utils/documents";

export async function getCaloriesIntake(userUid: string): Promise<number> {
  const lastFeeding = await getLastFeeding(userUid);
  const { intake } = lastFeeding.docs[0].data();
  return intake;
}