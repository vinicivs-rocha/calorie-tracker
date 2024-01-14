import styles from './update-meal.module.css';

export default function NutritionalData({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div className={styles.nutritionalData}>{children}</div>;
}
