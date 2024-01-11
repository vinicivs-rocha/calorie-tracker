'use server';

import { FoodDTO } from '@/types/food';
import { feedings, meals } from '../utils/collections';
import { getUserId } from '../session';
import { getLastDocument } from '../utils';
import 'server-only';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

export const createMeal = async ({
  addedFoods,
  mealName,
}: {
  addedFoods: FoodDTO[];
  mealName: string;
}) => {
  const carbo = addedFoods.reduce(
    (totalCarbo, food) => totalCarbo + food.nutrients?.carbohydrates!,
    0
  );
  const protein = addedFoods.reduce(
    (totalProtein, food) => totalProtein + food.nutrients?.protein!,
    0
  );
  const fat = addedFoods.reduce(
    (totalFat, food) => totalFat + food.nutrients?.lipids!,
    0
  );
  const intake = addedFoods.reduce(
    (totalIntake, food) => totalIntake + food.nutrients?.kcal!,
    0
  );
  const foodsIds = addedFoods.map(({ id }) => id!);
  const userUid = await getUserId();
  const { id: feedingId, ref: lastFeeding } = await getLastDocument(feedings(userUid));
  const lastFeedingDoc = await lastFeeding.get();
  if (!lastFeedingDoc.exists) {
    throw new Error('No feeding found');
  }
  const lastFeedingData = lastFeedingDoc.data()
  const mealsCollection = meals(userUid, feedingId);

  await mealsCollection.add({
    name: mealName,
    foods: foodsIds,
  });
  await lastFeeding.update({
    intake: intake + (lastFeedingData?.intake || 0),
    macros: {
      carbo: carbo + (lastFeedingData?.macros?.carbo || 0),
      protein: protein + (lastFeedingData?.macros?.protein || 0),
      fat: fat + (lastFeedingData?.macros?.fat || 0),
    }
  })

  revalidatePath('/home')
  redirect('/home')
};
