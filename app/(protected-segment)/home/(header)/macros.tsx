'use client';

import clsx from 'clsx';
import React, { useContext } from 'react';
import styles from './header.module.css';
import { WindowWidthContext } from './window-context';
import MacroQuantity from './macro-quantity';

export default function MacrosData() {
  const viewportWidth = useContext(WindowWidthContext);
  const macros = {
    carbo: 35,
    protein: 27,
    fat: 21,
  };

  return (
    <div
      className={clsx({
        [styles.hidden]: viewportWidth < 1400,
        [styles.macrosData]: true,
      })}
    >
      {Object.entries(macros).map(([key, value]) => (
        <MacroQuantity key={key} name={key} quantity={value} />
      ))}
    </div>
  );
}
