import UserInfo from "@/app/ui/home/user-info";
import styles from '@/app/ui/home/home.module.css';

export default function HomeHeader() {
  return (
    <header className={styles.headerContainer}>
      <UserInfo/>
    </header>
  )
}