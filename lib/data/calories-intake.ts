import { getUserId } from '../session';
import { getLastDocument } from '@/utils/last-doc';
import { feedings } from '@/utils/collections';
import { getDocData } from '@/utils';

export async function getCaloriesIntake(): Promise<number> {
  const userUid = await getUserId();

  const lastFeeding = await getLastDocument(feedings(userUid));
  if (!lastFeeding.exists) {
    return 0;
  }

  const { intake } = (await getDocData(lastFeeding))!;
  return intake;
}
