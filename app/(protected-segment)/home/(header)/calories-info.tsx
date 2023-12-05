import styles from "@/app/(protected-segment)/home/(header)/header.module.css";
import ProgressBar from "@/app/(protected-segment)/home/(header)/progress-bar";
import CaloriesGoalNumber from './goal-number';
import { getCalorieGoal, getCaloriesIntake } from "@/lib/data";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

export default async function CaloriesInfo() {
  const session = await getServerSession(authOptions);
  const { user } = session!;

  const caloriesGoal = await getCalorieGoal(user.uid);
  const caloriesConsumed = await getCaloriesIntake(user.uid);
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
