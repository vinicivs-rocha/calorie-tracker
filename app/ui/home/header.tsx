import UserInfo from "@/app/ui/home/user-info";
import styles from '@/app/ui/home/home.module.css';
import CaloriesInfo from "./calories-info";

export default function HomeHeader() {
  return (
    <header className={styles.headerContainer}>
      <UserInfo />
      <CaloriesInfo />
    </header>
  )
}