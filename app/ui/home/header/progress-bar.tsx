'use client';

import styles from "@/app/ui/home/header/header.module.css";
import { motion } from "framer-motion";

interface ProgressBarProps {
  progress: number;
}

export default function ProgressBar({ progress }: ProgressBarProps) {
  return (
    <div className={styles.progressBarContainer}>
      <motion.div
        className={styles.progressBarLineContainer}
        initial={{ width: "0%" }}
        animate={{ width: `${progress}%` }}
        transition={{ duration: 1, type: 'tween' }}
      />
    </div>
  );
}
