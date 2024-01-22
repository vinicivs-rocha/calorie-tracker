import styles from './update-meal.module.css';

export default function Food({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div className={styles.food}>
    {children}
  </div>;
}
