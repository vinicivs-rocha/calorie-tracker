"use client";

import Image from "next/image";
import plusSign from "@/app/ui/assets/plus-sign.svg";
import styles from "@/app/ui/home/current/current.module.css";
import { poppins } from "../../fonts";
import { motion } from "framer-motion";

export default function StartDayButton() {
  return (
    <motion.button
      className={styles.startDayButton}
      whileHover={{
        scale: 1.2,
        transition: { duration: 1 },
      }}
      whileTap={{ scale: 0.9, transition: { duration: 0.1 } }}
    >
      <Image src={plusSign} alt="" width={12} height={12} />
      <span className={`${styles.startDayText} ${poppins.className}`}>
        Iniciar novo dia
      </span>
    </motion.button>
  );
}
