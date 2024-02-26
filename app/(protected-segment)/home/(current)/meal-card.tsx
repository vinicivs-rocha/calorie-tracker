"use client";

import crossIcon from '@/app/ui/assets/cross-icon.svg';
import penIcon from '@/app/ui/assets/pen-icon.svg';
import { deleteMeal } from '@/lib/actions/meal';
import { ErrorsContext } from '@/lib/contexts';
import { Meal } from '@/types/documents';
import { AnimatePresence, motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { useContext, useEffect } from 'react';
import { useFormState } from 'react-dom';
import styles from './current.module.css';

export default function MealCard({ meal, id }: { meal: Meal; id: string }) {
  const deleteMealAction = deleteMeal.bind(null, null, id);
  const [state, dispatch] = useFormState(deleteMealAction, { errors: [] });
  const { setErrors } = useContext(ErrorsContext);

  useEffect(() => {
    setErrors(state.errors);
    setTimeout(() => {
      setErrors([]);
    }, 3000);
  }, [state, setErrors]);

  return (
    <AnimatePresence>
      <motion.div
        className={styles.mealCardContainer}
        initial={{ x: -300, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        exit={{ x: 300, opacity: 0 }}
      >
        <h3 className={styles.mealName}>{meal.name}</h3>
        <div className={styles.mealActions}>
          <Link href={`/update-meal/${id}`}>
            <motion.button
              className={styles.mealEdit}
              whileHover={{
                scale: 1.2,
                transition: { duration: 1 },
              }}
              whileTap={{ scale: 0.9, transition: { duration: 0.1 } }}
            >
              <Image src={penIcon} alt='' height={12} width={12} />
            </motion.button>
          </Link>
          <motion.button
            className={styles.mealDelete}
            whileHover={{
              scale: 1.2,
              transition: { duration: 1 },
            }}
            whileTap={{ scale: 0.9, transition: { duration: 0.1 } }}
            onClick={() => dispatch()}
          >
            <Image src={crossIcon} alt='' height={12} width={12} />
          </motion.button>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
