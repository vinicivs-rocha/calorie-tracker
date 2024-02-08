'use client';
import { MealDataContext } from '@/lib/contexts/meal';
import { AnimatePresence } from 'framer-motion';
import { useContext } from 'react';
import WindowWidthProvider from '../../window-provider';
import DragOpacityContextProvider from './drag-provider';
import Food from './food';
import Macro from './macro';
import NutritionalData from './nutritional-data';
import styles from './update-meal.module.css';

export default function AddedFoods() {
  const [mealData] = useContext(MealDataContext);
  return (
    <AnimatePresence>
      <WindowWidthProvider>
        {mealData.foods.map(({ name, nutrients }, index) => (
          <DragOpacityContextProvider initialValue={0} key={index}>
            <Food index={index}>
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
            </Food>
          </DragOpacityContextProvider>
        ))}
      </WindowWidthProvider>
    </AnimatePresence>
  );
}
