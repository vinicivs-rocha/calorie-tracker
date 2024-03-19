import { CalendarContextProvider } from './(history)/calendar-provider';
import DatePicker from './(history)/date-picker';
import styles from './(history)/history.module.css';

export default function MealsHistory() {
  return (
    <CalendarContextProvider>
      <main className={styles.main}>
        <DatePicker></DatePicker>
      </main>
    </CalendarContextProvider>
  );
}
