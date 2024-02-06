'use client';

import { DragOpacityContext } from '@/lib/contexts/drag';
import { motion } from 'framer-motion';
import { useContext, useEffect, useRef, useState } from 'react';
import DeleteButton from './delete';
import Select from './select';
import styles from './update-meal.module.css';

// TODO - Add mobile drag animation
export default function Food({ children }: { children: React.ReactNode }) {
  const foodRef = useRef<HTMLDivElement>(null);
  const [foodOffset, setFoodOffset] = useState<number>();
  const [_, setDragOpacity] = useContext(DragOpacityContext);

  if (setDragOpacity) {
    setDragOpacity(() => {
      if (!foodOffset) return 0;
      return -(foodOffset - 20.5) / 50;
    });
  }

  useEffect(() => {
    setFoodOffset(foodRef.current?.getBoundingClientRect().x);
  }, [foodRef]);

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
        drag='x'
        dragConstraints={{ left: -50, right: 0 }}
        dragElastic={0}
        onDrag={() => {
          setFoodOffset(foodRef.current?.getBoundingClientRect().x);
        }}
        ref={foodRef}
      >
        <Select />
        {children}
      </motion.div>
      <DeleteButton />
    </div>
  );
}
