import goalsCollection from "@/utils/collections/goals";

export async function getCalorieGoal(userUid: string): Promise<number> {
  const userDailyConsumptionGoals = await goalsCollection().doc(userUid).get();
  if (!userDailyConsumptionGoals.exists || !userDailyConsumptionGoals.data())
    return 0;
  const { calories } = userDailyConsumptionGoals.data()!;
  
  return calories;
}