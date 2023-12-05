import { Goal } from "@/types/documents";
import { collectionPointer } from "../collection-pointer";

export const goals = collectionPointer<Goal>('dailyConsumptionGoals');
