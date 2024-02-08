import trashSign from '@/app/ui/assets/trash-sign.svg';
import { DragOpacityContext } from '@/lib/contexts/drag';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { useContext } from 'react';
import styles from './update-meal.module.css';

export default function DeleteButton() {
  const [dragOpacity] = useContext(DragOpacityContext);
  const opacity = dragOpacity > 1 ? 0 : dragOpacity;
  return (
    <motion.button className={`${styles.delete}`} style={{ opacity }}>
      <Image src={trashSign} alt='' height={30} width={30} />
    </motion.button>
  );
}
