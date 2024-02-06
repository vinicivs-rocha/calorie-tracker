import { motion } from 'framer-motion';
import Select from './select';
import styles from './update-meal.module.css';

// TODO - Add mobile drag animation
export default function Food({ children }: { children: React.ReactNode }) {
  return (
    <motion.div
      className={styles.food}
      initial={{ opacity: 0, x: -100 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.2, type: 'spring', stiffness: 200, damping: 9 }}
    >
      <Select />
      {children}
    </motion.div>
  );
}
