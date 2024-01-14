import styles from './update-meal.module.css';

export default function Foods({ children }: { children: React.ReactNode }) {
  return <div className={styles.foods}>{children}</div>;
}
