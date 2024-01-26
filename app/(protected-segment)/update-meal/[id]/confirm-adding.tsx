import check from '@/app/ui/assets/check.svg';
import Image from 'next/image';
import styles from './update-meal.module.css';
import { MouseEventHandler } from 'react';


export default function ConfirmAdding({ onClick }: { onClick: MouseEventHandler<HTMLButtonElement> }) {
  return (
    <button className={styles.addingButton} onClick={onClick}>
      <Image src={check} alt='' height={12} width={12} />
    </button>
  )
}
