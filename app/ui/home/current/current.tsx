import MealCard from "./meal-card";
import StartDayButton from "./start-button";
import styles from "./current.module.css";

export default function CurrentMeals() {
  const meals = [
    { name: "Café da manhã", id: 1 },
    { name: "Almoço", id: 2 },
    { name: "Jantar", id: 3 },
  ];
  return (
    <div className={styles.currentMealsContainer}>
      <StartDayButton />
      <div className={styles.mealCardsContainer}>
        {meals.map((meal) => (
          <MealCard key={meal.name} meal={meal} />
        ))}
      </div>
    </div>
  );
}
