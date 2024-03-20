import { collectionPointer } from '@/lib/utils/collection-pointer';
import { Meal } from '@/types/documents';

export const meals = (userUid: string, feedingUid: string) =>
  collectionPointer<Meal>(
    `userMeals/${userUid}/dailyFeeding/${feedingUid}/meals`
  );
