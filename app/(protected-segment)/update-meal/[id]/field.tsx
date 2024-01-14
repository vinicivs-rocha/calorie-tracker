import styles from './update-meal.module.css';

export default function FieldInput({
  children,
  label,
}: {
  children: React.ReactNode;
  label: string;
}) {
  return (
    <div className={styles.fieldInput}>
      <p className={styles.label}>{label}:</p>
      {children}
    </div>
  );
}
