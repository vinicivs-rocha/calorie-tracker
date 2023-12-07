import { goals } from "@/utils/collections";
import { getUserId } from "../session";

export async function getCalorieGoal(): Promise<number> {
  const userUid = await getUserId();

  const userDailyConsumptionGoals = await goals.doc(userUid).get();
  const { calories } = userDailyConsumptionGoals.data()!;

  return calories;
}