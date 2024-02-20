'use client';

import { updateMeal } from '@/lib/actions/meal';
import { FormStateContext, MealDataContext } from '@/lib/contexts';
import { FoodDTO } from '@/types/food';
import { PropsWithChildren, useContext } from 'react';
import { useFormState } from 'react-dom';

export default function FormStateContextProvider({
  children,
  mealId,
  mealInitialState,
}: PropsWithChildren<{
  mealId: string;
  mealInitialState: {
    name: string;
    foods: FoodDTO[];
  };
}>) {
  const [mealData] = useContext(MealDataContext);
  const updateMealAction = updateMeal.bind(
    null,
    null,
    mealId,
    { ...mealData },
    mealInitialState
  );
  const formState = useFormState(updateMealAction, {
    errors: {
      name: [],
      foods: [],
    },
  });
  return (
    <FormStateContext.Provider value={formState}>
      {children}
    </FormStateContext.Provider>
  );
}
