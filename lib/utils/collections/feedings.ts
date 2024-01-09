import { Feeding } from "@/types/documents";
import { collectionPointer } from "../collection-pointer";

export const feedings = (userUid: string) => collectionPointer<Feeding>(`userMeals/${userUid}/dailyFeeding`);