import { goals } from "@/utils/collections";

export async function getCalorieGoal(userUid: string): Promise<number> {
  const userDailyConsumptionGoals = await goals.doc(userUid).get();
  if (!userDailyConsumptionGoals.exists || !userDailyConsumptionGoals.data())
    return 0;
  const { calories } = userDailyConsumptionGoals.data()!;

  return calories;
}