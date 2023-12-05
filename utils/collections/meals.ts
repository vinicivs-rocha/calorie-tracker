import { Meal } from "@/types/documents";
import { collectionPointer } from "@/utils/collection-pointer";

export const meals = (userUid: string, feedingUid: string) => collectionPointer<Meal>(`userMeals/${userUid}/dailyFeeding/${feedingUid}/meals`);