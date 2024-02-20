'use client';

import ErrorAlert from '@/app/error-alert';
import { FormStateContext } from '@/lib/contexts';
import { formatErrors } from '@/lib/utils/format-errors';
import { useContext, useEffect, useState } from 'react';
import styles from './update-meal.module.css';

export default function Header({ children }: { children: React.ReactNode }) {
  const [formState] = useContext(FormStateContext);
  const [formErrors, setFormErrors] = useState(formState);

  useEffect(() => {
    setFormErrors(formState);
    setTimeout(() => {
      setFormErrors({
        errors: {
          name: [],
          foods: [],
        },
      });
    }, 3000);
  }, [formState]);

  const { name: nameErrors, foods: foodsErrors } = formErrors.errors;

  return (
    <header className={styles.header}>
      <div className='absolute flex w-auto flex-col gap-2 self-center xl:right-4 xl:top-4'>
        <ErrorAlert
          errors={formatErrors(nameErrors).concat(formatErrors(foodsErrors))}
          cause='atualizar refeição'
        />
      </div>
      {children}
    </header>
  );
}
