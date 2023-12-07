import { getUserId } from '../session';
import { getDocData } from '@/utils';
import { getLastDocument } from '@/utils';
import { feedings, meals } from '@/utils/collections';
import { getAllCollectionDocs } from '@/utils';

export async function getMeals() {
  const userUid = await getUserId();
  const { id: feedingUid } = await getLastDocument(feedings(userUid));

  const mealsDocs = await getAllCollectionDocs(meals(userUid, feedingUid));
  const mealsData = mealsDocs.map(getDocData);

  return Promise.all(mealsData);
}
