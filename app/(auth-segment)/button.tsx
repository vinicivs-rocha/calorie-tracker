'use client';

import Image from 'next/image';
import loginIcon from "@/app/ui/assets/login-icon.svg";
import styles from '@/app/(auth-segment)/login.module.css';
import { signIn } from 'next-auth/react';

export default function LoginButton() {
  const handleClick = async () => {
    signIn('google', {
      callbackUrl: '/home'
    });
  };

  return (
    <button className={styles.button} onClick={handleClick}>
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