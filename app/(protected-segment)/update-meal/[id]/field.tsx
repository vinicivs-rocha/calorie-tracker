import { poppins } from '@/app/fonts';
import clsx from 'clsx';
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
      <p className={clsx(styles.label, poppins.className)}>{label}:</p>
      {children}
    </div>
  );
}
