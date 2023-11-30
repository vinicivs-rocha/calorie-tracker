import CurrentMeals from "@/app/(protected-segment)/home/current";
import MealsHistory from "@/app/(protected-segment)/home/history";

export default function Home({searchParams}: { params: {}, searchParams: { tab: 'current' | 'history' } }) {
  return (
    <>
    { searchParams.tab === 'current' ? <CurrentMeals /> : <MealsHistory />}
    </>
  )
}