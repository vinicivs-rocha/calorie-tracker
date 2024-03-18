import DatePicker from './(history)/date-picker';
import styles from './(history)/history.module.css';

export default function MealsHistory() {
  return (
    <main className={styles.main}>
      <DatePicker></DatePicker>
    </main>
  );
}
