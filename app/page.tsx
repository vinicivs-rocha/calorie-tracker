import Image from 'next/image'
import loginIllustration from '@/app/ui/assets/login-illutration.svg'
import LoginButton from '@/app/ui/login/button'
import styles from '@/app/ui/login/login.module.css'
import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';

export default  async function LoginPage() {
  const session = await getServerSession(authOptions);

  if (session) {
    redirect('/home');
  }

  return (
    <div className={styles.loginContainer}>
      <div className={styles.illustrationContainer}>
        <Image
          src={loginIllustration}
          width={250}
          height={250}
          alt="Um homem sentado em uma cadeira comendo uma pizza."
        />
      </div>
      <div>
        <h1 className={styles.slogan}>Desafie a si mesmo</h1>
        <p className={styles.sloganAction}>Comece uma dieta balanceada e saudável</p>
      </div>
      <LoginButton />
    </div>
  )
}
