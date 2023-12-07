import { getUserId } from "../session";
import { getConsumptionGoal } from "@/utils/documents";

export async function getCalorieGoal(): Promise<number> {
  const userUid = await getUserId();

  const { calories } = await getConsumptionGoal(userUid);

  return calories;
}