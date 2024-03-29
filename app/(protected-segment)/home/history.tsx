import QueryClient from '../query-client';
import { CalendarContextProvider } from './(history)/calendar-provider';
import { ConsumedMeals } from './(history)/consumed-meals';
import DatePicker from './(history)/date-picker';
import styles from './(history)/history.module.css';

// TODO - add desktop styling
export default function MealsHistory() {
  return (
    <CalendarContextProvider>
      <main className={styles.main}>
        <DatePicker />
        <QueryClient>
          <div className={styles.consumedContainer}>
            <ConsumedMeals></ConsumedMeals>
          </div>
        </QueryClient>
      </main>
    </CalendarContextProvider>
  );
}
