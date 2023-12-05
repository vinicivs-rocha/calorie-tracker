import { db } from "@/lib/firebase";
import { feedingConverter } from "../converters";

export function feedingsCollection(userUid: string) {
  return db.collection(`userMeals/${userUid}/dailyFeeding`).withConverter(feedingConverter);
}