import CaloriesInfo from '@/app/(protected-segment)/home/(header)/calories-info';
import styles from '@/app/(protected-segment)/home/(header)/header.module.css';
import Navigation from '@/app/(protected-segment)/home/(header)/navigation';
import UserInfo from '@/app/(protected-segment)/home/(header)/user-info';

export default function HomeHeader() {
  return (
    <header className={styles.headerContainer}>
      <UserInfo />
      <CaloriesInfo />
      <Navigation />
    </header>
  );
}
