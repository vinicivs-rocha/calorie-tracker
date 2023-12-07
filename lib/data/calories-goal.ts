import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { goals } from "@/utils/collections";
import { getServerSession } from "next-auth";

export async function getCalorieGoal(): Promise<number> {
  const { user } = (await getServerSession(authOptions))!;

  const userDailyConsumptionGoals = await goals.doc(user.uid).get();
  if (!userDailyConsumptionGoals.exists || !userDailyConsumptionGoals.data())
    return 0;
  const { calories } = userDailyConsumptionGoals.data()!;

  return calories;
}