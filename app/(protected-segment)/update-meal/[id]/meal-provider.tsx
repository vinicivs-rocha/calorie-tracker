"use client";

import { MealDataContext } from '@/lib/contexts/meal';
import { FoodDTO } from '@/types/food';
import React, { PropsWithChildren } from 'react';

export default function MealDataContextProvider({
  children,
  initialValue,
}: PropsWithChildren<{
  initialValue: { name: string; foods: FoodDTO & { selected: boolean }[] };
}>) {
  const [mealData, setMealData] = React.useState<{
    name: string;
    foods: FoodDTO[];
  }>(initialValue);
  return (
    <MealDataContext.Provider value={[mealData, setMealData]}>
      {children}
    </MealDataContext.Provider>
  );
}
