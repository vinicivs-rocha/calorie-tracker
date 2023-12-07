import { feedings } from '../collections';

export const getLastFeedingSnapshot = async (userUid: string) =>
  (await feedings(userUid).orderBy('createdAt', 'desc').limit(1).get()).docs[0];
