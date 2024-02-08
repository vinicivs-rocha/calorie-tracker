'use client';

import checkSign from '@/app/ui/assets/check.svg';
import clsx from 'clsx';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { HTMLAttributes } from 'react';
import styles from './update-meal.module.css';

const variants = {
  active: {
    backgroundColor: '#60A5FA',
    border: '1px solid rgba(0, 0, 0, 0.0)',
  },
  inactive: {
    backgroundColor: 'rgba(255, 255, 255, 0.0)',
    border: '1px solid rgba(0, 0, 0, 1)',
  },
};
export default function Select({
  onClick,
  active,
}: HTMLAttributes<HTMLButtonElement> & { active: boolean }) {
  return (
    <motion.button
      className={clsx(styles.select, {
        [styles.active]: active,
      })}
      onClick={onClick}
      animate={active ? 'active' : 'inactive'}
      variants={variants}
      transition={{ duration: 0.3, ease: 'easeInOut' }}
    >
      {active ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
        >
          <Image src={checkSign} alt='' height={12} width={12}></Image>
        </motion.div>
      ) : null}
    </motion.button>
  );
}
