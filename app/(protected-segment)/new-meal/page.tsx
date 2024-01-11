'use client';

import React, { useState } from 'react';
import backSign from '@/app/ui/assets/back-sign.svg';
import Image from 'next/image';
import { poppins } from '@/app/fonts';
import styles from './new-meal.module.css';
import AddedFoods from './added-foods';
import ConfirmButton from './confirm-button';
import { FoodDTO } from '@/types/food';
import { createMeal } from '@/lib/actions/meal';

export default function NewMealPage() {
  const [addedFoods, setAddedFoods] = useState<FoodDTO[]>([]);
  const [mealName, setMealName] = useState('');
  const createMealAction = createMeal.bind(null, { mealName, addedFoods });

  return (
    <>
      <div className={styles.container}>
        <header className={styles.header}>
          <Image
            className={styles.backSign}
            src={backSign}
            alt=''
            height={12}
            width={12}
          />
          <h1 className={`${poppins.className} ${styles.heading}`}>
            Adicione sua refeição
          </h1>
        </header>
        <main className={styles.main}>
          <div className={styles.mealName}>
            <p className={styles.mealNameText}>Nome:</p>
            <input
              className={styles.nameInput}
              type='text'
              name='mealName'
              placeholder='Digite o nome da nova refeição'
              onChange={(event) => setMealName(event.target.value)}
            />
          </div>
          <AddedFoods addedFoods={addedFoods} setAddedFoods={setAddedFoods} />
        </main>
      </div>
      <footer className={styles.footer}>
        <ConfirmButton onClick={() => createMealAction()} />
      </footer>
    </>
  );
}
