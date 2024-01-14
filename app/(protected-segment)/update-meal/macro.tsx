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
      <span className={styles.amount}>{amount}</span>
      <span className={styles.name}>{name}</span>
    </div>
  );
}
