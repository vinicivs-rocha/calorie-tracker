'use client';

import { useContext } from 'react';
import styles from './update-meal.module.css';
import { MealDataContext } from '@/lib/contexts/meal';

export default function NameInput() {
  const [mealData, setMealData] = useContext(MealDataContext);

  function handleNameChange(event: React.ChangeEvent<HTMLInputElement>) {
    if (!setMealData) throw Error('setMealData is not defined');
    if (!event.target) throw Error('event.target is not defined');

    setMealData({
      ...mealData,
      name: event.target.value,
    });
  }

  return (
    <input type='text' placeholder='Digite o nome da refeição' className={styles.nameInput} value={mealData.name} onChange={handleNameChange}/>
  )
}
