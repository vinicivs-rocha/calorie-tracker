import MealCard from './(current)/meal-card';
import TopButton from './(current)/top';
import styles from './(current)/current.module.css';
import CurrentMealsFooter from './(current)/footer';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { getMeals } from '@/lib/data';

export default async function CurrentMeals() {
  const meals = await getMeals();

  return (
    <>
      <div className={styles.currentMealsContainer}>
        <TopButton />
        <div className={styles.mealCardsContainer}>
          {meals.map((meal) =>
            meal ? <MealCard key={meal.name} meal={meal} /> : <></>
          )}
        </div>
      </div>
      <CurrentMealsFooter />
    </>
  );
}
