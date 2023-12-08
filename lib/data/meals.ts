import { getUserId } from '../session';
import { getDocData } from '@/utils';
import { getLastDocument } from '@/utils';
import { feedings, meals } from '@/utils/collections';
import { getAllCollectionDocs } from '@/utils';

export async function getMeals() {
  const userUid = await getUserId();
  const feeding = await getLastDocument(feedings(userUid)) ?? { exists: false };

  if (!feeding.exists) {
    return [];
  }

  const mealsDocs = await getAllCollectionDocs(meals(userUid, feeding.id));
  const mealsData = mealsDocs.map(getDocData);

  return Promise.all(mealsData);
}
