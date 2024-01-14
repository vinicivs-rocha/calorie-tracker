import styles from './update-meal.module.css'

export default function Heading({ children }: { children: React.ReactNode }) {
  return <h1 className={styles.heading}>{children}</h1>;
}
