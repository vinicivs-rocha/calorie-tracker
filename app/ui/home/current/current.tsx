import MealCard from "./meal-card";
import StartDayButton from "./start-button";
import styles from "./current.module.css";
import { AnimatePresence } from "framer-motion";

export default function CurrentMeals() {
  const meals = [
    { name: "Café da manhã" },
    { name: "Almoço" },
    { name: "Jantar" },
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
