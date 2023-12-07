import { getLastFeeding } from "@/utils/documents";
import { getUserId } from "../session";

export async function getCaloriesIntake(): Promise<number> {
  const userUid = await getUserId();


  const lastFeeding = await getLastFeeding(userUid);
  const { intake } = lastFeeding.data();
  return intake;
}