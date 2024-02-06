'use client';
import { MealDataContext } from '@/lib/contexts/meal';
import { AnimatePresence } from 'framer-motion';
import { useContext } from 'react';
import DeleteButton from './delete';
import Food from './food';
import Macro from './macro';
import NutritionalData from './nutritional-data';
import styles from './update-meal.module.css';

export default function AddedFoods() {
  const [mealData] = useContext(MealDataContext);
  return (
    <AnimatePresence>
      {mealData.foods.map(({ name, nutrients }, index) => (
        <Food key={index}>
          <div className={styles.foodData}>
            <h2 className={styles.foodName}>{name}</h2>
            <NutritionalData>
              <Macro
                amount={nutrients?.carbohydrates!}
                name='Carbos'
                key={'Carbos'}
              />
              <Macro
                amount={nutrients?.protein!}
                name='Proteínas'
                key={'Proteínas'}
              />
              <Macro
                amount={nutrients?.lipids!}
                name='Gorduras'
                key={'Gorduras'}
              />
            </NutritionalData>
          </div>
          <DeleteButton />
        </Food>
      ))}
    </AnimatePresence>
  );
}
