'use client';

import React, { useState } from 'react';
import backSign from '@/app/ui/assets/back-sign.svg';
import Image from 'next/image';
import { poppins } from '@/app/fonts';
import Food from './food';
import AddFoodButton from './add-food';
import styles from './new-meal.module.css';
// TODO - add animations
export default function NewMealPage() {
  const [addedFoods, setAddedFoods] = useState([
    { name: 'Arroz', carboQuantity: 10, proteinQuantity: 10, fatQuantity: 10 },
  ]);

  return (
    <>
      <div className={styles.container}>
        <header className={styles.header}>
          <Image className={styles.backSign} src={backSign} alt='' height={12} width={12} />
          <h1 className={`${poppins.className} ${styles.heading}`}>Adicione sua refeição</h1>
        </header>
        <main className={styles.main}>
          <div className={styles.mealName}>
            <p className={styles.mealNameText}>Nome:</p>
            <input
              className={styles.nameInput}
              type='text'
              name='mealName'
              placeholder='Digite o nome da nova refeição'
            />
          </div>
          <div className={styles.foods}>
            {addedFoods
              .map(
                (
                  { name, carboQuantity, fatQuantity, proteinQuantity },
                  index
                ) => (
                  <Food
                    name={name}
                    carboQuantity={carboQuantity}
                    fatQuantity={fatQuantity}
                    proteinQuantity={proteinQuantity}
                    key={index}
                  />
                )
              )
              .concat(<AddFoodButton />)}
          </div>
        </main>
      </div>
      <footer className={styles.footer}>
        <button className={`${poppins.className} ${styles.confirmButton}`}>Adicionar refeição</button>
      </footer>
    </>
  );
}
