import styles from './update-meal.module.css';

export default function Footer({ children }: { children: React.ReactNode }) {
  return <footer className={styles.footer}>{children}</footer>;
}
