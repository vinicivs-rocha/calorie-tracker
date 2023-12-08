import Link from 'next/link';
import React from 'react';
import styles from './goal-edit.module.css';
import { poppins } from '@/app/fonts';

export default function Unauthorized() {
  return (
    <div className={styles.unauthorizedContainer}>
      <h1 className={`${styles.unauthorizedTitle} ${poppins.className}`}>
        Este usuário não tem permissão para modificar o objetivo de outro
        usuário!
      </h1>
      <footer className={styles.unauthorizedFooter}>
        <Link href='/home' className={styles.unauthorizedButton}>
          <button>
            <span
              className={`${poppins.className} ${styles.unauthorizedButtonText}`}
            >
              Voltar para a página inicial
            </span>
          </button>
        </Link>
      </footer>
    </div>
  );
}
