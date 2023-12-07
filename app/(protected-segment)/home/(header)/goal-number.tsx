'use client';

import { useContext, useRef, useState } from 'react';
import styles from './header.module.css';
import { usePopper } from 'react-popper';
import PopperButton from './popper';
import clsx from 'clsx';
import updateGoal from '@/app/ui/assets/update-goal.svg';
import { WindowWidthContext } from './window-context';
import Image from 'next/image';
import Link from 'next/link';

function CaloriesGoalNumber({ children, userUid }: { children: React.ReactNode, userUid: string }) {
  const [calorieGoalPopperOpen, setCalorieGoalPopperOpen] = useState(false);
  const goalNumberRef = useRef<HTMLButtonElement>(null);
  const popperRef = useRef<HTMLButtonElement>(null);

  const viewportWidth = useContext(WindowWidthContext);
  function calculatePopperPosition(goalNumber: HTMLButtonElement | null): [number | undefined, number | undefined] {
    if (!goalNumber) return [undefined, undefined];
    if (viewportWidth >= 1400) return [0, 10]
    return [goalNumber.clientHeight + 4, -(goalNumber.clientWidth)];
  }

  const { styles: popperStyles, attributes } = usePopper(
    goalNumberRef.current,
    popperRef.current,
    {
      modifiers: [
        {
          name: 'offset',
          enabled: true,
          options: {
            offset: calculatePopperPosition(goalNumberRef.current),
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
        {...attributes.popper}      >
        <Link href={`/calories/goal/${userUid}`} className={styles.link}>
          <span className={styles.popperText}>Atualizar meta</span>
          <Image src={updateGoal} alt='' width={15} height={15} />
        </Link>
      </PopperButton>
    </>
  );
}

export default CaloriesGoalNumber;
