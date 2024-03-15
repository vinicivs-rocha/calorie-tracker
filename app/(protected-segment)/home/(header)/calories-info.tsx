import { getCalorieGoal, getCaloriesIntake } from '@/lib/data';
import { getLastFeedingMacros } from '@/lib/data/last-macros';
import CaloriesInfoContainer from './calories-container';
import CaloriesData from './calories-data';

export default async function CaloriesInfo() {
  const caloriesGoal = await getCalorieGoal();
  const caloriesConsumed = await getCaloriesIntake();
  const currentIntakePercentage = (caloriesConsumed / caloriesGoal) * 100;
  const macros = await getLastFeedingMacros();

  return (
    <CaloriesInfoContainer
      caloriesGoal={caloriesGoal}
      currentIntakePercentage={currentIntakePercentage}
      macros={macros}
    >
      <CaloriesData caloriesGoal={caloriesGoal} />
    </CaloriesInfoContainer>
  );
}
