'use client';

import { useContext } from 'react';
import styles from './header.module.css';
import { WindowWidthContext } from './window-context';

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
