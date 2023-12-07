import { meals } from "@/utils/collections/meals";
import { getLastFeeding } from "@/utils/documents";
import { getUserId } from "../session";

export async function getMeals() {
  const userUid = await getUserId();

  const lastFeeding = await getLastFeeding(userUid);
  const {id: feedingId} = lastFeeding
  const mealsCollection = await meals(userUid, feedingId).get()
  return mealsCollection.docs.map(doc => doc.data())
}