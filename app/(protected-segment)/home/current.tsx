import MealCard from "./(current)/meal-card";
import TopButton from './(current)/top';
import styles from "./(current)/current.module.css";
import CurrentMealsFooter from "./(current)/footer";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { getMeals } from "@/lib/data";

export default async function CurrentMeals() {
  const { user } = (await getServerSession(authOptions))!;
  const meals = await getMeals(user.uid);

  return (
    <>
      <div className={styles.currentMealsContainer}>
        <TopButton />
        <div className={styles.mealCardsContainer}>
          {meals.map((meal) => (
            <MealCard key={meal.name} meal={meal} />
          ))}
        </div>
      </div>
      <CurrentMealsFooter />
    </>
  );
}
