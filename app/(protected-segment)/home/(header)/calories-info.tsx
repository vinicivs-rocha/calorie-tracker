import styles from "@/app/(protected-segment)/home/(header)/header.module.css";
import ProgressBar from "@/app/(protected-segment)/home/(header)/progress-bar";
import CaloriesGoalNumber from './goal-number';

export default function CaloriesInfo() {
  const caloriesGoal = 2000;
  const caloriesConsumed = 1500;
  const currentIntakePercentage = (caloriesConsumed / caloriesGoal) * 100;

  function numberWithCommas(x: number) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');
  }

  return (
    <div className={styles.calorieInfoContainer}>
      <div className={styles.calorieData}>
        <span className={styles.goalText}>Sua meta de calorias diárias é:</span>
        <CaloriesGoalNumber>
          {numberWithCommas(caloriesGoal)}
        </CaloriesGoalNumber>
      </div>
      <div>
        <ProgressBar progress={currentIntakePercentage} />
      </div>
    </div>
  );
}
