import clsx from 'clsx';
import styles from './update-meal.module.css'
import { poppins } from '@/app/fonts';

export default function Heading({ children }: { children: React.ReactNode }) {
  return <h1 className={clsx(styles.heading, poppins.className)}>{children}</h1>;
}
