import Image from "next/image";
import plusSign from '@/app/ui/assets/plus-sign.svg';
import styles from "./current.module.css";
import Link from "next/link";

export default function CurrentMealsFooter() {
  return (
    <footer className={styles.footerContainer}>
      <Link href='/new-meal' className={styles.footerButton}>
        <Image src={plusSign} alt="" width={16} height={16} />
      </Link>
    </footer>
  );
}
