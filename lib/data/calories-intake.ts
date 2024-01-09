import { getUserId } from '../session';
import { getLastDocument } from '@/lib/utils/last-doc';
import { feedings } from '@/lib/utils/collections';
import { getDocData } from '@/lib/utils';

export async function getCaloriesIntake(): Promise<number> {
  const userUid = await getUserId();

  const lastFeeding = await getLastDocument(feedings(userUid)) ?? { exists: false };
  if (!lastFeeding.exists) {
    return 0;
  }

  const { intake } = (await getDocData(lastFeeding))!;
  return intake;
}
