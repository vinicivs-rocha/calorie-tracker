'use server';

import { feedings, meals } from '../utils/collections';
import { getUserId } from '../session';
import { getLastDocument } from '../utils';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import 'server-only';
import { z } from 'zod';

const parametersSchema = z.object({
  addedFoods: z.array(z.object({
    id: z.coerce.number().optional(),
    name: z.string().optional(),
    totalQuantity: z.number().optional(),
    nutrients: z.object({
      carbohydrates: z.coerce.number().optional(),
      protein: z.coerce.number().optional(),
      lipids: z.coerce.number().optional(),
      kcal: z.coerce.number().optional(),
    }).optional(),
  })).min(1, 'Adicione ao menos um alimento'),
  mealName: z.string().trim().min(1, 'Digite um nome para a refeição'),
})

export const createMeal = async (prevState: any, newMealData: z.infer<typeof parametersSchema>) => {
  const result = parametersSchema.safeParse(newMealData);
  if (!result.success) {
    return {
      errors: result.error.flatten().fieldErrors
    };
  }
  const { addedFoods, mealName } = result.data;

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
  const mealsCollection = meals(userUid, feedingId);

  await mealsCollection.add({
    name: mealName,
    foods: foodsIds,
  });

  const lastFeedingDoc = await lastFeeding.get();
  if (!lastFeedingDoc.exists) {
    throw new Error('No feeding found');
  }
  const lastFeedingData = lastFeedingDoc.data();

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
