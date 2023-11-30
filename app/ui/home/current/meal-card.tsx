"use client";

import styles from "./current.module.css";
import Image from "next/image";
import penIcon from "@/app/ui/assets/pen-icon.svg";
import crossIcon from "@/app/ui/assets/cross-icon.svg";
import { AnimatePresence, motion } from "framer-motion";

export default function MealCard({ meal }: { meal: { name: string } }) {
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
          <motion.button
            className={styles.mealEdit}
            whileHover={{
              scale: 1.2,
              transition: { duration: 1 },
            }}
            whileTap={{ scale: 0.9, transition: { duration: 0.1 } }}
          >
            <Image src={penIcon} alt="" height={12} width={12} />
          </motion.button>
          <motion.button
            className={styles.mealDelete}
            whileHover={{
              scale: 1.2,
              transition: { duration: 1 },
            }}
            whileTap={{ scale: 0.9, transition: { duration: 0.1 } }}
          >
            <Image src={crossIcon} alt="" height={12} width={12} />
          </motion.button>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
