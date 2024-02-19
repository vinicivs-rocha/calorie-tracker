'use client';

import { MealDataContext, WindowWidthContext } from '@/lib/contexts';
import { DragOpacityContext } from '@/lib/contexts/drag';
import { motion, useMotionValue } from 'framer-motion';
import { useCallback, useContext, useEffect } from 'react';
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
  const foodOffset = useMotionValue(0);
  const [_, setDragOpacity] = useContext(DragOpacityContext);
  const viewportWidth = useContext(WindowWidthContext);
  const [mealData, setMealData] = useContext(MealDataContext);
  const setOpacity = useCallback(
    (latestValue: number) => {
      if (!setDragOpacity) throw new Error('No drag opacity context provider');
      setDragOpacity(Math.abs(latestValue) / 50);
    },
    [setDragOpacity]
  );

  useEffect(() => foodOffset.on('change', setOpacity));

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
        style={{ x: foodOffset }}
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
      >
        <Select
          onClick={toggleSelect}
          active={mealData.foods[index].selected!}
        />
        {children}
      </motion.div>
      <DeleteButton foodIndex={index} />
    </div>
  );
}
