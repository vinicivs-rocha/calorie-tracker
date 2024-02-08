'use client';

import { poppins } from '@/app/fonts';
import { updateMeal } from '@/lib/actions/meal';
import { MealDataContext } from '@/lib/contexts';
import clsx from 'clsx';
import { useContext } from 'react';
import styles from './update-meal.module.css';

export default function ConfirmButton({
  text,
  mealId,
}: {
  text: string;
  mealId: string;
}) {
  const [mealData] = useContext(MealDataContext);
  const updateMealAction = updateMeal.bind(null, null, mealId, { ...mealData });
  return (
    <button
      className={clsx(styles.confirm, poppins.className)}
      onClick={() => updateMealAction()}
    >
      {text}
    </button>
  );
}
