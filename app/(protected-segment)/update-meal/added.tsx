import styles from './update-meal.module.css';

export default function AddedFoods({ children }: { children: React.ReactNode }) {
  return (
    <div className={styles.addedFoods}>{children}</div>
  )
}
