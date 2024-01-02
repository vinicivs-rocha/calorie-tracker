import { getUserId } from '../session';
import { getDocData } from '@/utils';
import { getLastDocument } from '@/utils';
import { feedings, meals } from '@/utils/collections';
import { getAllCollectionDocs } from '@/utils';
import { Meal } from '@/types/documents';
import { ErrorMessage } from '@/types/error';

export async function getMeals(): Promise<[Meal[], ErrorMessage]> {
  const userUid = await getUserId();
  const feeding = await getLastDocument(feedings(userUid)) ?? { exists: false };

  if (!feeding.exists) {
    return [[], 'No feedings found'];
  }

  const mealsDocs = await getAllCollectionDocs(meals(userUid, feeding.id));
  const mealsData = (await Promise.all(mealsDocs.map(getDocData))).filter(meal => meal !== undefined) as Meal[];

  return [mealsData, null];
}
