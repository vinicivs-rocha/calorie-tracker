import TopButton from './(current)/top';
import styles from './(current)/current.module.css';
import CurrentMealsFooter from './(current)/footer';
import MealCardsContainer from './(current)/meals-container';

export default async function CurrentMeals() {
  return (
    <>
      <div className={styles.currentMealsContainer}>
        <TopButton />
        <MealCardsContainer />
      </div>
      <CurrentMealsFooter />
    </>
  );
}
