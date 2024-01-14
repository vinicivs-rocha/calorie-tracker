import styles from './update-meal.module.css'

export default function MainContent({ children }: { children: React.ReactNode }) {
  return (
    <div className={styles.mainContent}>
      { children }
    </div>
  );
}
