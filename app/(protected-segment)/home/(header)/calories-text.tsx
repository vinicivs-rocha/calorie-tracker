'use client';

import { useContext } from 'react';
import { WindowWidthContext } from '../../../../lib/contexts/window-context';
import styles from './header.module.css';

export default function CaloriesText() {
  const viewportWidth = useContext(WindowWidthContext);

  return (
    <span className={styles.goalText}>
      {viewportWidth < 1400
        ? 'Sua meta de calorias diárias é:'
        : 'Calorias diárias'}
    </span>
  );
}
