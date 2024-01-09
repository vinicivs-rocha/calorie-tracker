import { getDocById } from '@/lib/utils/doc-by-id';
import { getUserId } from '../session';
import { goals } from '@/lib/utils/collections';
import { getDocData } from '@/lib/utils';

export async function getCalorieGoal(): Promise<number> {
  const userUid = await getUserId();

  const goalsDoc = await getDocById(goals, userUid);
  if (!goalsDoc.exists) {
    return 0;
  }

  const { calories } = (await getDocData(goalsDoc))!;

  return calories;
}
