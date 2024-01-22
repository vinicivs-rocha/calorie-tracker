import { poppins } from '@/app/fonts'
import clsx from "clsx";
import styles from "./update-meal.module.css";

export default function Macro({
  amount,
  name,
}: {
  amount: number;
  name: string;
}) {
  return (
    <div className={styles.macro}>
      <span className={clsx(styles.amount, poppins.className)}>{amount}</span>
      <span className={clsx(styles.name, poppins.className)}>{name}</span>
    </div>
  );
}
