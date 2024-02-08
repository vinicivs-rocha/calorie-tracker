'use server';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import 'server-only';
import { z } from 'zod';
import { getMealsSnapshots } from '../data';
import { getUserId } from '../session';
import { getLastDocument } from '../utils';
import { feedings, meals } from '../utils/collections';

const parametersSchema = z.object({
  addedFoods: z
    .array(
      z.object({
        id: z.coerce.number().optional(),
        name: z.string().optional(),
        totalQuantity: z.number().optional(),
        nutrients: z
          .object({
            carbohydrates: z.coerce.number().optional(),
            protein: z.coerce.number().optional(),
            lipids: z.coerce.number().optional(),
            kcal: z.coerce.number().optional(),
          })
          .optional(),
      })
    )
    .min(1, 'Adicione ao menos um alimento'),
  mealName: z.string().trim().min(1, 'Digite um nome para a refeição'),
});

export const createMeal = async (
  prevState: any,
  newMealData: z.infer<typeof parametersSchema>
) => {
  const result = parametersSchema.safeParse(newMealData);
  if (!result.success) {
    return {
      errors: result.error.flatten().fieldErrors,
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

  const { id: feedingId, ref: lastFeeding } = await getLastDocument(
    feedings(userUid)
  );
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
    },
  });

  revalidatePath('/home');
  redirect('/home');
};

const updateMealSchema = z.object({
  foods: z
    .array(
      z.object({
        id: z.coerce.number().optional(),
        name: z.string().optional(),
        totalQuantity: z.number().optional(),
        nutrients: z
          .object({
            carbohydrates: z.coerce.number().optional(),
            protein: z.coerce.number().optional(),
            lipids: z.coerce.number().optional(),
            kcal: z.coerce.number().optional(),
          })
          .optional(),
        selected: z.boolean().optional(),
      })
    )
    .min(1, 'Adicione ao menos um alimento'),
  name: z.string().trim().min(1, 'Digite um nome para a refeição'),
});

export const updateMeal = async (
  prevState: any,
  mealId: string,
  mealData: z.infer<typeof updateMealSchema>
) => {
  const result = updateMealSchema.safeParse(mealData);
  if (!result.success) {
    return {
      errors: result.error.flatten().fieldErrors,
    };
  }
  const { foods, name } = result.data;
  const foodsIds = foods.map(({ id }) => id!);

  const [mealsDocs, error] = await getMealsSnapshots();
  if (error) {
    throw new Error(error);
  }
  const desiredMealDoc = mealsDocs.find((meal) => meal.id === mealId);
  if (!desiredMealDoc) {
    throw new Error('No meal found');
  }

  const updateRes = await desiredMealDoc.ref.update({
    name: name,
    foods: foodsIds,
  });

  const feedingRef = await desiredMealDoc.ref.parent.parent!;
  const feedingDoc = await feedingRef.get();
  if (!feedingDoc.exists) {
    throw new Error('No feeding found');
  }
  const feedingData = feedingDoc.data()!;
  // TODO - Take the difference between the already registered meal data and new meal data
  const carbo = foods.reduce(
    (totalCarbo, food) => totalCarbo + food.nutrients?.carbohydrates!,
    0
  );
  const protein = foods.reduce(
    (totalProtein, food) => totalProtein + food.nutrients?.protein!,
    0
  );
  const fat = foods.reduce(
    (totalFat, food) => totalFat + food.nutrients?.lipids!,
    0
  );
  const intake = foods.reduce(
    (totalIntake, food) => totalIntake + food.nutrients?.kcal!,
    0
  );

  await feedingRef.update({
    intake: intake + feedingData.intake,
    macros: {
      carbo: carbo + feedingData.macros.carbo,
      protein: protein + feedingData.macros.protein,
      fat: fat + feedingData.macros.fat,
    },
  });
  console.log('updated');
};
