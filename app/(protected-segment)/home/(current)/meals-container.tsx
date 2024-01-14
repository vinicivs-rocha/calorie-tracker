import MealCard from './meal-card';
import styles from './current.module.css';
import { getMealData, getMealsSnapshots } from '@/lib/data';
import { Suspense } from 'react';

export default async function MealCardsContainer() {
  const [meals, error] = await getMealsSnapshots();
  if (error !== null)
    return (
      <h2 className={styles.notFoundText}>
        Não existem registros de alimentação
      </h2>
    );

  const mealCards = await Promise.all(meals.map(async (meal) => {
    const mealData = await getMealData(meal);
    return (
      <Suspense key={meal.id} fallback={<p>Loading...</p>}>
        <MealCard meal={mealData} id={meal.id} />
      </Suspense>
    );
  }));

  if (mealCards.length === 0)
    return (
      <h2 className={styles.notFoundText}>
        Não existem registros de refeições para o dia atual
      </h2>
    );

  return <div className={styles.mealCardsContainer}>{mealCards}</div>;
}
