import styles from '@/app/(protected-segment)/home/(header)/header.module.css';
import ProgressBar from '@/app/(protected-segment)/home/(header)/progress-bar';
import CaloriesGoalNumber from './goal-number';
import { getCalorieGoal, getCaloriesIntake } from '@/lib/data';
import CaloriesText from './calories-text';
import WindowWidthProvider from './window-provider';
import MacrosData from './macros';
import MacroQuantity from './macro-quantity';
import { getLastFeedingMacros } from '@/lib/data/macros';

export default async function CaloriesInfo() {

  const caloriesGoal = await getCalorieGoal();
  const caloriesConsumed = await getCaloriesIntake();
  const currentIntakePercentage = (caloriesConsumed / caloriesGoal) * 100;
  const macros = await getLastFeedingMacros();

  function numberWithCommas(x: number) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');
  }

  return (
    <div className={styles.calorieInfoContainer}>
      <WindowWidthProvider>
        <div className={styles.consumptionDataContainer}>
          <div className={styles.caloriesData}>
            <CaloriesText />
            <CaloriesGoalNumber>
              {numberWithCommas(caloriesGoal)}
            </CaloriesGoalNumber>
          </div>
          <MacrosData>
            {Object.entries<number>(macros).map(([key, value]) => (
              <MacroQuantity key={key} name={key} quantity={value} />
            ))}
          </MacrosData>
        </div>
      </WindowWidthProvider>
      <div>
        <ProgressBar progress={currentIntakePercentage} />
      </div>
    </div>
  );
}
