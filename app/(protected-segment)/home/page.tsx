import CurrentMeals from "@/app/ui/home/current/current";
import MealsHistory from "@/app/ui/home/history/history";
import styles from '@/app/ui/home/home.module.css';

export default function Home({searchParams}: { params: {}, searchParams: { tab: 'current' | 'history' } }) {
  return (
    <main className={styles.mainContainer}>
    { searchParams.tab === 'current' ? <CurrentMeals /> : <MealsHistory />}
    </main>
  )
}