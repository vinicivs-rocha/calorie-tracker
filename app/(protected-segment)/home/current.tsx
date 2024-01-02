import TopButton from './(current)/top';
import styles from './(current)/current.module.css';
import CurrentMealsFooter from './(current)/footer';
import MealCardsContainer from './(current)/meals-container';

// TODO - Add feeding day creation
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
