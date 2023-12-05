import { feedings, goals } from "@/utils/collections";

export async function getCalorieGoal(userUid: string): Promise<number> {
  const userDailyConsumptionGoals = await goals.doc(userUid).get();
  if (!userDailyConsumptionGoals.exists || !userDailyConsumptionGoals.data())
    return 0;
  const { calories } = userDailyConsumptionGoals.data()!;

  return calories;
}

export async function getCaloriesIntake(userUid: string): Promise<number> {
  const lastFeeding = await feedings(userUid).orderBy('createdAt', 'desc').limit(1).get();
  const { intake } = lastFeeding.docs[0].data();
  return intake;
}
