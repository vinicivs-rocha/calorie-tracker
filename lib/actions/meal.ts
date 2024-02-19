'use server';

import { FoodDTO } from '@/types/food';
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
  const foods = addedFoods.map(({ id, totalQuantity }) => ({
    id: id!,
    quantity: totalQuantity!,
  }));

  const userUid = await getUserId();

  const { id: feedingId, ref: lastFeeding } = await getLastDocument(
    feedings(userUid)
  );
  const mealsCollection = meals(userUid, feedingId);

  await mealsCollection.add({
    name: mealName,
    foods,
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
  mealData: z.infer<typeof updateMealSchema>,
  mealInitialState: {
    name: string;
    foods: FoodDTO[];
  }
) => {
  // TODO - Add error handling
  const result = updateMealSchema.safeParse(mealData);
  if (!result.success) {
    return {
      errors: result.error.flatten().fieldErrors,
    };
  }
  const { foods: newFoods, name } = result.data;
  const foods = newFoods.map(({ id, totalQuantity }) => ({
    id: id!,
    quantity: totalQuantity!,
  }));
  const { foods: lastFoods } = mealInitialState;

  const [mealsDocs, error] = await getMealsSnapshots();
  if (error) {
    throw new Error(error);
  }
  const desiredMealDoc = mealsDocs.find((meal) => meal.id === mealId);
  if (!desiredMealDoc) {
    throw new Error('No meal found');
  }

  await desiredMealDoc.ref.update({
    name: name,
    foods,
  });

  const feedingRef = desiredMealDoc.ref.parent.parent!;
  const feedingDoc = await feedingRef.get();
  if (!feedingDoc.exists) {
    throw new Error('No feeding found');
  }
  const feedingData = feedingDoc.data()!;

  const newCarbo = newFoods.reduce(
    (totalCarbo, food) => totalCarbo + food.nutrients?.carbohydrates!,
    0
  );
  const newProtein = newFoods.reduce(
    (totalProtein, food) => totalProtein + food.nutrients?.protein!,
    0
  );
  const newFat = newFoods.reduce(
    (totalFat, food) => totalFat + food.nutrients?.lipids!,
    0
  );
  const newIntake = newFoods.reduce(
    (totalIntake, food) => totalIntake + food.nutrients?.kcal!,
    0
  );

  const lastCarbo = lastFoods.reduce(
    (totalCarbo, food) => totalCarbo + food.nutrients?.carbohydrates!,
    0
  );
  const lastProtein = lastFoods.reduce(
    (totalProtein, food) => totalProtein + food.nutrients?.protein!,
    0
  );
  const lastFat = lastFoods.reduce(
    (totalFat, food) => totalFat + food.nutrients?.lipids!,
    0
  );
  const lastIntake = lastFoods.reduce(
    (totalIntake, food) => totalIntake + food.nutrients?.kcal!,
    0
  );

  await feedingRef.update({
    intake: newIntake - lastIntake + feedingData.intake,
    macros: {
      carbo: newCarbo - lastCarbo + feedingData.macros.carbo,
      protein: newProtein - lastProtein + feedingData.macros.protein,
      fat: newFat - lastFat + feedingData.macros.fat,
    },
  });
  revalidatePath('/home');
  revalidatePath('/update-meal/[id]', 'page');
  redirect('/home');
};
