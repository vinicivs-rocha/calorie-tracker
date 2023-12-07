import { getUserId } from "../session";
import { getLastFeedingSnapshot, getMealsSnapshots } from "@/utils/snapshots";
import { getMeal } from "@/utils/documents";

export async function getMeals() {
  const userUid = await getUserId();
  const { id: feedingId } = await getLastFeedingSnapshot(userUid);

  const mealsSnapshots = await getMealsSnapshots(userUid, feedingId);
  const meals = mealsSnapshots.map(getMeal);
  
  return Promise.all(meals);
}