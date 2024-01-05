import React from 'react';
import styles from './new-meal.module.css'

export default function Food({
  name,
  carboQuantity,
  proteinQuantity,
  fatQuantity,
}: {
  name: string;
  carboQuantity: number;
  proteinQuantity: number;
  fatQuantity: number;
}) {
  return (
    <div className={styles.addedFood}>
      <p className={styles.foodName}>{name}</p>
      <div className={styles.nutritionalData}>
        <div className={styles.macro}>
          <span className={styles.carboQuantity}>{carboQuantity}g</span>
          <span className={styles.macroName}>Carbos</span>
        </div>
        <div className={styles.macro}>
          <span className={styles.proteinQuantity}>{proteinQuantity}g</span>
          <span className={styles.macroName}>Proteínas</span>
        </div>
        <div className={styles.macro}>
          <span className={styles.fatQuantity}>{fatQuantity}g</span>
          <span className={styles.macroName}>Gorduras</span>
        </div>
      </div>
    </div>
  );
}
