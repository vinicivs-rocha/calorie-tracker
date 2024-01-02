import MealCard from './meal-card';
import styles from './current.module.css';
import { getMeals } from '@/lib/data';

export default async function MealCardsContainer() {
  const [meals, error] = await getMeals();
  if (error !== null)
    return (
      <h2 className={styles.notFoundText}>
        Não existem registros de alimentação
      </h2>
    );

  const mealCards = meals.map((meal) =>
    meal ? <MealCard key={meal.name} meal={meal} /> : <></>
  );

  if (mealCards.length === 0)
    return (
      <h2 className={styles.notFoundText}>
        Não existem registros de refeições para o dia atual
      </h2>
    );

  return (
    <div className={styles.mealCardsContainer}>
      {mealCards}
    </div>
  );
}
