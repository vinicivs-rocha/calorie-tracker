import { getLastFeeding } from '@/utils/documents';
import { getUserId } from '../session';

export async function getLastFeedingMacros() {
  const userUid = await getUserId();

  const { macros } = await getLastFeeding(userUid);
  return macros;
}
