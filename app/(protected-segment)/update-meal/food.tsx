import styles from './update-meal.module.css';

export default function Food({
  name,
  children,
}: {
  name: string;
  children: React.ReactNode;
}) {
  return <div className={styles.food}>
    <h2 className={styles.foodName}>{name}</h2>
    {children}
  </div>;
}
