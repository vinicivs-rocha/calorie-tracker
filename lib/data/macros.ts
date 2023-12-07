import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { getLastFeeding, getMacros } from '@/utils/documents';
import { getServerSession } from 'next-auth';

export async function getLastFeedingMacros() {
  const { user } = (await getServerSession(authOptions))!;
  const lastFeeding = await getLastFeeding(user.uid);
  return getMacros(lastFeeding);
}
