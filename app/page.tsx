import Image from 'next/image'
import loginIllustration from '@/app/ui/assets/login-illutration.svg'
import LoginButton from '@/app/ui/login/button'
import styles from '@/app/ui/login/login.module.css'

export default function LoginPage() {
  return (
    <div className={styles.loginContainer}>
      <Image 
        src={loginIllustration}
        width={250}
        height={250}
        alt="Um homem sentado em uma cadeira comendo uma pizza."
      />
      <div>
        <h1>Desafie a si mesmo</h1>
        <p>Comece uma dieta balanceada e saudável</p>
      </div>
      <LoginButton />
    </div>
  )
}
