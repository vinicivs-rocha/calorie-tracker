import { meals } from '../collections/meals';

export const getMealsSnapshots = async (userUid: string, feedingId: string) =>
  (await meals(userUid, feedingId).get()).docs;
