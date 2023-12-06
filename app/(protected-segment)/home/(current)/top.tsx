import Image from 'next/image';
import plusSign from '@/app/ui/assets/plus-sign.svg';
import styles from '@/app/(protected-segment)/home/(current)/current.module.css';
import { poppins } from '../../../fonts';

export default function TopButton() {
  return (
    <div className={styles.currentTopContainer}>
      <button className={styles.topButton}>
        <Image src={plusSign} alt='' width={12} height={12} />
        <span className={poppins.className}>
          Iniciar novo dia
        </span>
      </button>
      <button className={`${styles.topButton} ${styles.addMealTopButton}`}>
        <Image src={plusSign} alt='' width={12} height={12} />
        <span className={poppins.className}>
          Adicionar refeição
        </span>
      </button>
    </div>
  );
}
