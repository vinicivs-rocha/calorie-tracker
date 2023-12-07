import { getDocById } from '@/utils/doc-by-id';
import { getUserId } from '../session';
import { goals } from '@/utils/collections';
import { getDocData } from '@/utils';

export async function getCalorieGoal(): Promise<number> {
  const userUid = await getUserId();

  const goalsDoc = await getDocById(goals, userUid);
  if (!goalsDoc.exists) {
    return 0;
  }

  const { calories } = (await getDocData(goalsDoc))!;

  return calories;
}
