'use client';

import Image from 'next/image';
import plusSign from '@/app/ui/assets/plus-sign.svg';
import styles from '@/app/(protected-segment)/home/(current)/current.module.css';
import { poppins } from '../../../fonts';
import { initNewFeeding } from '@/lib/actions';
import Link from 'next/link';

export default function TopButton() {
  return (
    <div className={styles.currentTopContainer}>
      <button onClick={() => initNewFeeding()} className={styles.topButton}>
        <Image src={plusSign} alt='' width={12} height={12} />
        <span className={poppins.className}>Iniciar novo dia</span>
      </button>
      <Link
        href='/new-meal'
        className={`${styles.topButton} ${styles.addMealTopButton}`}
      >
        <Image src={plusSign} alt='' width={12} height={12} />
        <span className={poppins.className}>Adicionar refeição</span>
      </Link>
    </div>
  );
}
