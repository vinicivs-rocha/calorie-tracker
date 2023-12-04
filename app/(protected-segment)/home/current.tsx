import MealCard from "./(current)/meal-card";
import StartDayButton from "./(current)/start-button";
import styles from "./(current)/current.module.css";
import CurrentMealsFooter from "./(current)/footer";

export default function CurrentMeals() {
  const meals = [
    { name: "Café da manhã", id: 1 },
    { name: "Almoço", id: 2 },
    { name: "Jantar", id: 3 },
  ];
  return (
    <>
      <div className={styles.currentMealsContainer}>
        <StartDayButton />
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
