import UserInfo from "@/app/ui/home/header/user-info";
import styles from "@/app/ui/home/header/header.module.css";
import CaloriesInfo from "@/app/ui/home/header/calories-info";
import Navigation from "@/app/ui/home/header/navigation";

export default function HomeHeader() {
  return (
    <header className={styles.headerContainer}>
      <UserInfo />
      <CaloriesInfo />
      <Navigation />
    </header>
  );
}
