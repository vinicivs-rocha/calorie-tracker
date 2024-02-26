import MealsHistory from '@/app/(protected-segment)/home/history';
import styles from '@/app/(protected-segment)/home/home.module.css';
import CurrentMeals from './current';
import ErrorContextProvider from './error-provider';

export default function Home({
  searchParams,
}: {
  params: {};
  searchParams: { tab: ('current' | 'history') | undefined };
}) {
  return (
    <main className={styles.mainContainer}>
      {searchParams.tab === 'current' || !searchParams.tab ? (
        <ErrorContextProvider>
          <CurrentMeals />
        </ErrorContextProvider>
      ) : (
        <MealsHistory />
      )}
    </main>
  );
}
