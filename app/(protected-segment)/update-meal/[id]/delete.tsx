'use client';

import trashSign from '@/app/ui/assets/trash-sign.svg';
import { MealDataContext } from '@/lib/contexts';
import { DragOpacityContext } from '@/lib/contexts/drag';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { useCallback, useContext } from 'react';
import styles from './update-meal.module.css';

export default function DeleteButton({ foodIndex }: { foodIndex: number }) {
  const [dragOpacity] = useContext(DragOpacityContext);
  const [_, setMealData] = useContext(MealDataContext);

  const deleteFood = useCallback(() => {
    if (!setMealData) throw new Error('No meal data context provider');
    setMealData((prev) => ({
      ...prev,
      foods: prev.foods.filter((_, index) => index !== foodIndex),
    }));
  }, [foodIndex, setMealData]);
  return (
    <motion.button
      className={`${styles.delete}`}
      style={{ opacity: dragOpacity }}
      onClick={deleteFood}
    >
      <Image src={trashSign} alt='' height={30} width={30} />
    </motion.button>
  );
}
