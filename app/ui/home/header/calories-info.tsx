import styles from "@/app/ui/home/header/header.module.css";
import ProgressBar from "@/app/ui/home/header/progress-bar";

export default function CaloriesInfo() {
  const caloriesGoal = 2000;
  const caloriesConsumed = 1500;
  const currentIntakePercentage = (caloriesConsumed / caloriesGoal) * 100;

  return (
    <div className={styles.calorieInfoContainer}>
      <div className={styles.calorieData}>
        <span className={styles.goalText}>Sua meta de calorias diárias é:</span>
        <span className={styles.goalNumber}>{caloriesGoal}</span>
      </div>
      <div>
        <ProgressBar progress={currentIntakePercentage} />
      </div>
    </div>
  );
}
