import { getDocData, getLastDocument } from '@/lib/utils';
import { feedings } from '@/lib/utils/collections';
import { Macros } from '@/types/documents/macros';
import { getUserId } from '../session';

export async function getLastFeedingMacros(): Promise<Macros> {
  const userUid = await getUserId();

  const lastFeeding = (await getLastDocument(feedings(userUid))) ?? {
    exists: false,
  };
  if (!lastFeeding.exists) {
    return {
      carbo: 0,
      fat: 0,
      protein: 0,
    } as Macros;
  }

  const { macros } = (await getDocData(lastFeeding))!;
  return macros;
}
