import { goals } from './collections';

export const updateGoalUtil = async (
  userUid: string,
  newCaloriesGoal: number
) => goals.doc(userUid).update({ calories: newCaloriesGoal });
