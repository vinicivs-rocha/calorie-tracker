import UserInfo from "@/app/ui/home/user-info";
import styles from '@/app/ui/home/home.module.css';
import CaloriesInfo from "@/app/ui/home/calories-info";
import Navigation from "@/app/ui/home/navigation";

export default function HomeHeader() {
  return (
    <header className={styles.headerContainer}>
      <UserInfo />
      <CaloriesInfo />
      <Navigation />
    </header>
  )
}