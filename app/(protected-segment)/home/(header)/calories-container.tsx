'use client';

import styles from '@/app/(protected-segment)/home/(header)/header.module.css';
import WindowWidthProvider from '@/app/(protected-segment)/window-provider';
import { Macros } from '@/types/documents/macros';
import { useSearchParams } from 'next/navigation';
import MacroQuantity from './macro-quantity';
import MacrosData from './macros';
import ProgressBar from './progress-bar';

export default function CaloriesInfoContainer({
  caloriesGoal,
  currentIntakePercentage,
  macros,
  children,
}: {
  caloriesGoal: number;
  currentIntakePercentage: number;
  macros: Macros;
  children: React.ReactNode;
}) {
  const searchParams = useSearchParams();
  const tab = searchParams.get('tab');
  if (tab === 'history') return null;
  return (
    <div className={styles.calorieInfoContainer}>
      <WindowWidthProvider>
        <div className={styles.consumptionDataContainer}>
          {children}
          <MacrosData>
            {Object.entries<number>(macros).map(([key, value]) => (
              <MacroQuantity key={key} name={key} quantity={value} />
            ))}
          </MacrosData>
        </div>
      </WindowWidthProvider>
      <div>
        <ProgressBar
          progress={Math.min(currentIntakePercentage, 100)}
          barColor={currentIntakePercentage > 100 ? 'red' : 'white'}
        />
      </div>
    </div>
  );
}
