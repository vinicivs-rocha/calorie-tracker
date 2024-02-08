'use client';

import { MealDataContext, WindowWidthContext } from '@/lib/contexts';
import { DragOpacityContext } from '@/lib/contexts/drag';
import { motion } from 'framer-motion';
import { useContext, useEffect, useRef, useState } from 'react';
import DeleteButton from './delete';
import Select from './select';
import styles from './update-meal.module.css';

export default function Food({
  children,
  index,
}: {
  children: React.ReactNode;
  index: number;
}) {
  const foodRef = useRef<HTMLDivElement>(null);
  const [foodOffset, setFoodOffset] = useState<number>();
  const [_, setDragOpacity] = useContext(DragOpacityContext);
  const viewportWidth = useContext(WindowWidthContext);
  const [mealData, setMealData] = useContext(MealDataContext);

  if (setDragOpacity) {
    setDragOpacity(() => {
      if (!foodOffset) return 0;
      return -(foodOffset - 20.5) / 50;
    });
  }

  useEffect(() => {
    setFoodOffset(foodRef.current?.getBoundingClientRect().x);
  }, [foodRef]);

  function toggleSelect() {
    if (!setMealData) throw new Error('No context provider');

    setMealData((prev) => {
      const toggledFoods = prev.foods.map((food, foodIndex) => {
        if (index == foodIndex) {
          return {
            ...food,
            selected: !food.selected,
          };
        }
        return food;
      });
      return {
        ...prev,
        foods: toggledFoods,
      };
    });
  }

  return (
    <div className={styles.foodContainer}>
      <motion.div
        className={styles.food}
        initial={{ opacity: 0, x: -100 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{
          duration: 0.2,
          type: 'spring',
          stiffness: 200,
          damping: 9,
        }}
        drag={viewportWidth < 1440 ? 'x' : false}
        dragConstraints={{ left: -50, right: 0 }}
        dragElastic={0}
        onDrag={() => {
          setFoodOffset(foodRef.current?.getBoundingClientRect().x);
        }}
        ref={foodRef}
      >
        <Select
          onClick={toggleSelect}
          active={mealData.foods[index].selected!}
        />
        {children}
      </motion.div>
      <DeleteButton />
    </div>
  );
}
