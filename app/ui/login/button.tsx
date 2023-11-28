import Image from 'next/image';
import loginIcon from "@/app/ui/assets/login-icon.svg";
import styles from '@/app/ui/login/login.module.css';

export default function LoginButton() {
  return (
    <button className={styles.button}>
      <Image
        src={loginIcon}
        alt={""}
        width={24}
        height={24}
      />
      <span className={styles.buttonText}>Entrar com o Google</span>
    </button>
  )
}