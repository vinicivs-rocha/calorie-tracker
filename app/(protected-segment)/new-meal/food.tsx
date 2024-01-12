'use client';

import React from 'react';
import styles from './new-meal.module.css';
import { motion } from 'framer-motion';
import { FoodDTO } from '@/types/food';

export default function Food({
  name,
  nutrients
}: FoodDTO) {
  return (
    <motion.div
      className={styles.addedFood}
      initial={{ opacity: 0, x: -100 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.2 , type: 'spring', stiffness: 200, damping: 9 }}
    >
      <p className={styles.foodName}>{name}</p>
      <div className={styles.nutritionalData}>
        <div className={styles.macro}>
          <span className={styles.carboQuantity}>{nutrients!.carbohydrates?.toFixed(1)}g</span>
          <span className={styles.macroName}>Carbos</span>
        </div>
        <div className={styles.macro}>
          <span className={styles.proteinQuantity}>{nutrients!.protein?.toFixed(1)}g</span>
          <span className={styles.macroName}>Proteínas</span>
        </div>
        <div className={styles.macro}>
          <span className={styles.fatQuantity}>{nutrients!.lipids?.toFixed(1)}g</span>
          <span className={styles.macroName}>Gorduras</span>
        </div>
      </div>
    </motion.div>
  );
}
