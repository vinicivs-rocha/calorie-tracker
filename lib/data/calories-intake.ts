import { getLastFeeding } from '@/utils/documents';
import { getUserId } from '../session';

export async function getCaloriesIntake(): Promise<number> {
  const userUid = await getUserId();

  const { intake } = await getLastFeeding(userUid);
  return intake;
}
