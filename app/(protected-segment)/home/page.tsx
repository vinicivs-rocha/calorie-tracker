import CurrentMeals from "@/app/(protected-segment)/home/current";
import MealsHistory from "@/app/(protected-segment)/home/history";
import styles from '@/app/(protected-segment)/home/home.module.css';
// TODO - refactor session data retrieval to a lib function
export default function Home({searchParams}: { params: {}, searchParams: { tab: ('current' | 'history') | undefined  } }) {
  return (
    <main className={styles.mainContainer}>
    { (searchParams.tab === 'current' || !searchParams.tab) ? <CurrentMeals /> : <MealsHistory />}
    </main>
  )
}