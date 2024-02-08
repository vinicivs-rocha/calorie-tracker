'use client';

import clsx from 'clsx';
import React, { useContext } from 'react';
import { WindowWidthContext } from '../../../../lib/contexts/window-context';
import styles from './header.module.css';

export default function MacrosData({
  children,
}: {
  children: React.ReactNode;
}) {
  const viewportWidth = useContext(WindowWidthContext);

  return (
    <div
      className={clsx({
        [styles.hiddenDiv]: viewportWidth < 1400,
        [styles.macrosData]: true,
      })}
    >
      {children}
    </div>
  );
}
