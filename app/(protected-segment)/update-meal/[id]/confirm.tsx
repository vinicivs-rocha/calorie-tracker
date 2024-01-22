import { poppins } from '@/app/fonts';
import clsx from 'clsx';
import styles from './update-meal.module.css';

export default function ConfirmButton({ text }: { text: string }) {
  return <button className={clsx(styles.confirm, poppins.className)}>{text}</button>;
}
