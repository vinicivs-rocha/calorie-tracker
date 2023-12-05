import { meals } from "@/utils/collections/meals";
import { getLastFeeding } from "@/utils/documents";

export async function getMeals(userUid: string) {
  const lastFeeding = await getLastFeeding(userUid);
  const {id: feedingId} = lastFeeding.docs[0]
  const mealsCollection = await meals(userUid, feedingId).get()
  return mealsCollection.docs.map(doc => doc.data())
}