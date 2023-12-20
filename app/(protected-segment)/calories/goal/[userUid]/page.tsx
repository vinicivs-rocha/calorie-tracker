'use client';

import Link from 'next/link';
import Image from 'next/image';
import styles from './goal-edit.module.css';
import backSign from '@/app/ui/assets/back-sign.svg';
import { poppins } from '@/app/fonts';
import { updateGoal } from '@/lib/actions';

export default function GoalEditPage({
  params,
}: {
  params: { userUid: string };
}) {
  return (
    <div className={styles.pageContainer}>
      <header className={styles.header}>
        <Link href='/home'>
          <Image src={backSign} alt='' width={15} height={15} />
        </Link>
        <div className={styles.title}>
          <h1>Qual sua meta de calorias?</h1>
          <span>Você poderá mudar ela a qualquer momento!</span>
        </div>
      </header>
      <form action={updateGoal} className={styles.form}>
        <input
          type='number'
          name='userUid'
          id='userUid'
          value={params.userUid}
          className={styles.userUidInput}
          readOnly
        />
        <main className={styles.main}>
          <div className={styles.goalInput}>
            <input
              type='number'
              name='goal'
              id='goal'
              placeholder='Digite a nova meta'
              className={poppins.className}
            />
            <label htmlFor='goal' className={poppins.className}>
              kCal
            </label>
          </div>
        </main>
        <footer className={styles.footer}>
          <button className={poppins.className}>Confirmar mudança</button>
        </footer>
      </form>
    </div>
  );
}
