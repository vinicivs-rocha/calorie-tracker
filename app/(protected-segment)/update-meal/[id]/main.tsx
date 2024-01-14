import styles from './update-meal.module.css';

export default function Main({ children }: { children: React.ReactNode }) {
  return <main className={styles.main}>{children}</main>;
}
