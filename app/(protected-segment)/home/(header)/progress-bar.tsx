'use client';

import styles from '@/app/(protected-segment)/home/(header)/header.module.css';
import clsx from 'clsx';
import { motion } from 'framer-motion';

interface ProgressBarProps {
  progress: number;
  barColor: 'white' | 'red';
}

export default function ProgressBar({ progress, barColor }: ProgressBarProps) {
  return (
    <div className={styles.progressBarContainer}>
      <motion.div
        className={clsx({
          [styles.progressBarLineContainer]: true,
          'bg-red-500': barColor === 'red',
          'bg-white': barColor === 'white',
        })}
        initial={{ width: '0%' }}
        animate={{ width: `${progress}%` }}
        transition={{ duration: 1, type: 'tween' }}
      />
    </div>
  );
}
