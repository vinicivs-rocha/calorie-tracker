import React from 'react';
import styles from './new-meal.module.css';

export default function NewMealLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div className={styles.layout}>{children}</div>;
}
