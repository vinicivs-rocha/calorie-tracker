'use client';

import { poppins } from '@/app/fonts';
import { motion } from 'framer-motion';
import styles from './new-meal.module.css';

export default function ConfirmButton({onClick}: {onClick: () => void}) {
  return (
    <motion.button
      className={`${poppins.className} ${styles.confirmButton}`}
      whileHover={{ scale: 1.2 }}
      whileTap={{ scale: 0.8 }}
      onClick={onClick}
    >
      Adicionar refeição
    </motion.button>
  );
}
