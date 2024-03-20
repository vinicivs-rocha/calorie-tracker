'use client';

import { ConsumedMeal } from '@/types/consumed-meal';
import { motion } from 'framer-motion';
import { useCallback, useEffect, useRef } from 'react';
import styles from './history.module.css';

export function MealOverviewCard({
  name,
  totalIntake,
  totalQuantity,
}: ConsumedMeal) {
  const card = useRef<HTMLDivElement>(null);

  const getImage = useCallback(
    () =>
      fetch(
        `https://api.api-ninjas.com/v1/randomimage?category=food&width=150&height=120`,
        {
          headers: {
            'X-Api-Key': 'nugxCkDiHySPu+RDKXM2+Q==0vNG5eHUnbdCrq6j',
            Accept: 'image/jpg',
          },
        }
      )
        .then((res) => res.blob())
        .then((blob) => {
          if (
            card.current !== null &&
            card.current.style.backgroundImage === ''
          ) {
            const url = URL.createObjectURL(blob);
            card.current.style.backgroundImage = `url(${url})`;
          }
        })
        .catch((err) => console.error(err)),
    [card]
  );

  useEffect(() => {
    getImage();
  }, [getImage]);

  return (
    <motion.div
      initial={{
        opacity: 0,
        scale: 0.5,
      }}
      animate={{
        opacity: 1,
        scale: 1,
      }}
      className={styles.consumedMealCard}
      ref={card}
    >
      <div className={styles.consumedMealCardInfo}>
        <h3 className={styles.consumedMealCardInfoName}>{name}</h3>
        <span>{totalQuantity}g</span>
        <span>{totalIntake} kcal</span>
      </div>
    </motion.div>
  );
}
