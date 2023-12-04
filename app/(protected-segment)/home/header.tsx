import UserInfo from "@/app/(protected-segment)/home/(header)/user-info";
import styles from "@/app/(protected-segment)/home/(header)/header.module.css";
import CaloriesInfo from "@/app/(protected-segment)/home/(header)/calories-info";
import Navigation from "@/app/(protected-segment)/home/(header)/navigation";

export default function HomeHeader() {
  return (
    <header className={styles.headerContainer}>
      <UserInfo />
      <CaloriesInfo />
      <Navigation />
    </header>
  );
}
