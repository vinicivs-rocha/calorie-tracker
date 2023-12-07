import styles from '@/app/(protected-segment)/home/(header)/header.module.css';
import CaloriesText from './calories-text';
import CaloriesGoalNumber from './goal-number';
import { getUserId } from '@/lib/session';


export default async function CaloriesData({ caloriesGoal }: { caloriesGoal: number}) {
  function numberWithCommas(x: number) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');
  }

  return (
    <div className={styles.caloriesData}>
      <CaloriesText />
      <CaloriesGoalNumber userUid={await getUserId()}>{numberWithCommas(caloriesGoal)}</CaloriesGoalNumber>
    </div>
  );
}
