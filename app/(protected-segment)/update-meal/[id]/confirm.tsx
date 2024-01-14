import styles from './update-meal.module.css';

export default function ConfirmButton({ text }: { text: string }) {
  return <button className={styles.confirm}>{text}</button>;
}
