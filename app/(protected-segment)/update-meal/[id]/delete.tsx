import trashSign from '@/app/ui/assets/trash-sign.svg';
import { motion } from 'framer-motion';
import Image from 'next/image';
import styles from './update-meal.module.css';

// TODO - Add context food deletion
export default function DeleteButton() {
  return (
    <motion.button initial={{ opacity: 0 }} className={styles.delete}>
      <Image src={trashSign} alt='' height={30} width={30} />
    </motion.button>
  );
}
