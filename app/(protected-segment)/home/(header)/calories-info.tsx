import styles from '@/app/(protected-segment)/home/(header)/header.module.css';
import ProgressBar from '@/app/(protected-segment)/home/(header)/progress-bar';
import CaloriesGoalNumber from './goal-number';
import { getCalorieGoal, getCaloriesIntake } from '@/lib/data';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import CaloriesText from './calories-text';
import WindowWidthProvider from './window-provider';
import MacrosData from './macros';
import MacroQuantity from './macro-quantity';


export default async function CaloriesInfo() {
  const session = await getServerSession(authOptions);
  const { user } = session!;

  const caloriesGoal = await getCalorieGoal(user.uid);
  const caloriesConsumed = await getCaloriesIntake(user.uid);
  const currentIntakePercentage = (caloriesConsumed / caloriesGoal) * 100;
  // TODO - fetch macros from database
  const macros = {
    carbo: 35,
    protein: 27,
    fat: 21,
  };

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
            {Object.entries(macros).map(([key, value]) => (
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
