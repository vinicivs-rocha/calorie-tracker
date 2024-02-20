'use client';

import { poppins } from '@/app/fonts';
import { FormStateContext } from '@/lib/contexts';
import clsx from 'clsx';
import { useContext } from 'react';
import styles from './update-meal.module.css';

export default function ConfirmButton({ text }: { text: string }) {
  const [_, formAction] = useContext(FormStateContext);
  return (
    <button
      className={clsx(styles.confirm, poppins.className)}
      onClick={() => formAction()}
    >
      {text}
    </button>
  );
}
