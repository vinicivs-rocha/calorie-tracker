import styles from './(current)/current.module.css';
import { ErrorMessages } from './(current)/error-messages';
import CurrentMealsFooter from './(current)/footer';
import MealCardsContainer from './(current)/meals-container';
import TopButton from './(current)/top';

export default async function CurrentMeals() {
  return (
    <>
      <ErrorMessages />
      <div className={styles.currentMealsContainer}>
        <TopButton />
        <MealCardsContainer />
      </div>
      <CurrentMealsFooter />
    </>
  );
}
