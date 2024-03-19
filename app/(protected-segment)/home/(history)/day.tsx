'use client';

import { useCalendarContext } from '@/lib/contexts';
import { CalendarDay } from '@/types/calendar';
import clsx from 'clsx';
import { motion } from 'framer-motion';
import { PropsWithChildren } from 'react';
import styles from './history.module.css';

export function CalendarDayButton({
  date,
  children,
}: PropsWithChildren<{ date: CalendarDay }>) {
  const { value: day, setValue: setDay } = useCalendarContext();

  return (
    <>
      {day.id === date.id ? (
        <motion.button
          key='active'
          onClick={() => {
            if (date.id !== '') {
              setDay(date);
            }
          }}
          className={clsx(styles.day, styles.active)}
          initial={{
            opacity: 0,
            scale: 0,
          }}
          animate={{
            opacity: 1,
            scale: 1,
            transition: {
              type: 'spring',
              duration: 0.25,
              delay: 0.125,
            },
          }}
          exit={{
            opacity: 0,
            scale: 0,
            transition: {
              duration: 0.25,
            },
          }}
        >
          {children}
        </motion.button>
      ) : (
        <motion.button
          key='inactive'
          onClick={() => {
            if (date.id !== '') {
              setDay(date);
            }
          }}
          className={styles.day}
          initial={{
            opacity: 0,
            scale: 0,
          }}
          animate={{
            opacity: date.id !== '' ? 1 : 0.5,
            scale: 1,
            cursor: date.id !== '' ? 'pointer' : 'not-allowed',
            transition: {
              type: 'spring',
              duration: 0.25,
              delay: 0.125,
            },
          }}
          exit={{
            opacity: 0,
            scale: 0,
            transition: {
              duration: 0.25,
            },
          }}
        >
          {children}
        </motion.button>
      )}
    </>
  );
}
