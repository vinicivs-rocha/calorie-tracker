'use client';

import ErrorAlert from '@/app/error-alert';
import { poppins } from '@/app/fonts';
import backSign from '@/app/ui/assets/back-sign.svg';
import { createMeal } from '@/lib/actions/meal';
import { formatErrors } from '@/lib/utils/format-errors';
import { FoodDTO } from '@/types/food';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useFormState } from 'react-dom';
import AddedFoods from './added-foods';
import ConfirmButton from './confirm-button';
import styles from './new-meal.module.css';

export default function NewMealPage() {
  const [addedFoods, setAddedFoods] = useState<FoodDTO[]>([]);
  const [mealName, setMealName] = useState('');
  const createMealAction = createMeal.bind(null, null, {
    mealName,
    addedFoods,
  });
  const [formState, formAction] = useFormState(createMealAction, {
    errors: {
      mealName: [],
      addedFoods: [],
    },
  });
  const [formErrors, setFormErrors] = useState(formState);

  useEffect(() => {
    setFormErrors(formState);
    setTimeout(() => {
      setFormErrors({
        errors: {
          mealName: [],
          addedFoods: [],
        },
      });
    }, 3000);
  }, [formState]);

  const { mealName: mealNameErrors, addedFoods: addedFoodsErrors } =
    formErrors.errors;

  return (
    <>
      <div className='absolute flex w-auto flex-col gap-2 xl:right-4 xl:top-4'>
        <ErrorAlert
          errors={formatErrors(mealNameErrors).concat(
            formatErrors(addedFoodsErrors)
          )}
          cause='adicionar refeição'
        />
      </div>
      <div className={styles.container}>
        <header className={styles.header}>
          <Link href='/home'>
            <Image
              className={styles.backSign}
              src={backSign}
              alt=''
              height={12}
              width={12}
            />
          </Link>
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
        <ConfirmButton onClick={() => formAction()} />
      </footer>
    </>
  );
}
