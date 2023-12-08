import { getUserId } from '../session';
import { getLastDocument } from '@/utils';
import { feedings } from '@/utils/collections';
import { getDocData } from '@/utils';

export async function getLastFeedingMacros() {
  const userUid = await getUserId();

  const lastFeeding = await getLastDocument(feedings(userUid)) ?? { exists: false };
  if (!lastFeeding.exists) {
    return {
      carbs: 0,
      fats: 0,
      proteins: 0,
    };
  }

  const { macros } = (await getDocData(lastFeeding))!;
  return macros;
}
