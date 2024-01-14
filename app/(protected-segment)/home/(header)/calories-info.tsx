import styles from '@/app/(protected-segment)/home/(header)/header.module.css';
import ProgressBar from '@/app/(protected-segment)/home/(header)/progress-bar';
import { getCalorieGoal, getCaloriesIntake } from '@/lib/data';
import WindowWidthProvider from './window-provider';
import MacrosData from './macros';
import MacroQuantity from './macro-quantity';
import { getLastFeedingMacros } from '@/lib/data/last-macros';
import CaloriesData from './calories-data';

export default async function CaloriesInfo() {
  const caloriesGoal = await getCalorieGoal();
  const caloriesConsumed = await getCaloriesIntake();
  const currentIntakePercentage = (caloriesConsumed / caloriesGoal) * 100;
  const macros = await getLastFeedingMacros();

  return (
    <div className={styles.calorieInfoContainer}>
      <WindowWidthProvider>
        <div className={styles.consumptionDataContainer}>
          <CaloriesData caloriesGoal={caloriesGoal}/>
          <MacrosData>
            {Object.entries<number>(macros).map(([key, value]) => (
              <MacroQuantity key={key} name={key} quantity={value} />
            ))}
          </MacrosData>
        </div>
      </WindowWidthProvider>
      <div>
        <ProgressBar progress={Math.min(currentIntakePercentage, 100)} barColor={currentIntakePercentage > 100 ? 'red' : 'white'} />
      </div>
    </div>
  );
}
