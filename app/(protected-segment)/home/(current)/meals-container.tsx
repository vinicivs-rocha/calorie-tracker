import { getLastMealsSnapshots, getMealData } from '@/lib/data';
import styles from './current.module.css';
import MealCard from './meal-card';

export default async function MealCardsContainer() {
  const [meals, error] = await getLastMealsSnapshots();
  if (error !== null)
    return (
      <h2 className={styles.notFoundText}>
        Não existem registros de alimentação
      </h2>
    );

  const mealCards = await Promise.all(
    meals.map(async (meal) => {
      const mealData = await getMealData(meal);
      return <MealCard meal={mealData} id={meal.id} key={meal.id} />;
    })
  );

  if (mealCards.length === 0)
    return (
      <h2 className={styles.notFoundText}>
        Não existem registros de refeições para o dia atual
      </h2>
    );

  return <div className={styles.mealCardsContainer}>{mealCards}</div>;
}
