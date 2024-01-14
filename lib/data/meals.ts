import { getUserId } from '../session';
import { getDocData } from '@/lib/utils';
import { getLastDocument } from '@/lib/utils';
import { feedings, meals } from '@/lib/utils/collections';
import { getAllCollectionDocs } from '@/lib/utils';
import { Meal } from '@/types/documents';
import { ErrorMessage } from '@/types/error';

export async function getMealData(mealDoc: FirebaseFirestore.QueryDocumentSnapshot<Meal, FirebaseFirestore.DocumentData>): Promise<Meal> {
  const mealData = (await getDocData(mealDoc)) as Meal;

  return mealData;
}

export async function getMealsSnapshots(): Promise<[FirebaseFirestore.QueryDocumentSnapshot<Meal, FirebaseFirestore.DocumentData>[], ErrorMessage]> {
  const userUid = await getUserId();
  const feeding = (await getLastDocument(feedings(userUid))) ?? {
    exists: false,
  };

  if (!feeding.exists) {
    return [[], 'No feedings found'];
  }

  const mealsDocs = await getAllCollectionDocs(meals(userUid, feeding.id));
  
  return [mealsDocs, null];
}