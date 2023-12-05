import { db } from '@/lib/firebase';
import { goalConverter } from '../converters';

export function goalsCollection() {
  return db.collection('dailyConsumptionGoals').withConverter(goalConverter);
}
