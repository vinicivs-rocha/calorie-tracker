import { goals } from '../collections';

export const getConsumptionGoal = async (userUid: string) => {
  const goalDoc = (await goals.doc(userUid).get()).data();
  if (!goalDoc) {
    throw new Error('No goal document found');
  }
  return goalDoc;
};
