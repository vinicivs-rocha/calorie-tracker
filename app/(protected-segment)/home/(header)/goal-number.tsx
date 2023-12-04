'use client';

import { useMemo, useRef, useState } from 'react';
import styles from './header.module.css';
import { usePopper } from 'react-popper';
import PopperButton from './popper';
import clsx from 'clsx';
import updateGoal from '@/app/ui/assets/update-goal.svg';

function CaloriesGoalNumber({ children }: { children: React.ReactNode }) {
  const [calorieGoalPopperOpen, setCalorieGoalPopperOpen] = useState(false);
  const goalNumberRef = useRef<HTMLButtonElement>(null);
  const popperRef = useRef<HTMLButtonElement>(null)
  const popperSkidding = goalNumberRef.current?.offsetHeight! + 4;
  const popperDistance = -(goalNumberRef.current?.offsetWidth!);
  const { styles: popperStyles, attributes } = usePopper(
    goalNumberRef.current,
    popperRef.current,
    {
      modifiers: [
        {
          name: 'offset',
          enabled: true,
          options: {
            offset: [popperSkidding, popperDistance],
          },
        },
        {
          name: 'flip',
          options: {
            fallbackPlacements: ['left'],
          },
        },
      ],
    }
  );

  return (
    <>
      <button
        className={styles.goalNumber}
        ref={goalNumberRef}
        onClick={() => setCalorieGoalPopperOpen(!calorieGoalPopperOpen)}
      >
        {children}
      </button>
      <PopperButton
        className={clsx(styles.buttonPopper, {
          [styles.hidden]: !calorieGoalPopperOpen,
        })}
        style={popperStyles.popper}
        ref={popperRef}
        text='Atualizar meta'
        image={updateGoal}
        {...attributes.popper}
      />
    </>
  );
}

export default CaloriesGoalNumber;
