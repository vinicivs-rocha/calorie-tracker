import { getLastFeeding, getMacros } from '@/utils/documents';
import { getUserId } from '../session';

export async function getLastFeedingMacros() {
  const userUid = await getUserId();

  const lastFeeding = await getLastFeeding(userUid);
  return getMacros(lastFeeding);
}
