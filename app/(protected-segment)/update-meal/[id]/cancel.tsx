import crossIcon from '@/app/ui/assets/cross-icon.svg';
import Image from 'next/image';
import { MouseEventHandler } from 'react';
import styles from './update-meal.module.css';

export default function CancelAdding({
  onClick,
}: {
  onClick: MouseEventHandler<HTMLButtonElement>;
}) {
  return (
    <button className={styles.cancelAdding} onClick={onClick}>
      <Image src={crossIcon} alt='' width={12} height={12} />
    </button>
  );
}
