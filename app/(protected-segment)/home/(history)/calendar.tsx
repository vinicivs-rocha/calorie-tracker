'use client';

import { ScrollArea, ScrollBar } from '@/app/ui/components/ui/scroll-area';
import { useCalendarContext } from '@/lib/contexts';
import { CalendarDay } from '@/types/calendar';
import clsx from 'clsx';
import { AnimatePresence } from 'framer-motion';
import { useCallback, useEffect } from 'react';
import { CalendarDayButton } from './day';
import styles from './history.module.css';

export default function Calendar({
  datesList,
  lastId,
}: {
  datesList: CalendarDay[];
  lastId: string;
}) {
  const { value: day, setValue: setDay } = useCalendarContext();
  const findLastDay = useCallback(
    () => datesList.find((date) => date.id === lastId),
    [datesList, lastId]
  );

  useEffect(() => {
    setDay(findLastDay() || datesList[0]);
  }, [setDay, findLastDay, datesList]);

  return (
    <ScrollArea className='w-full whitespace-nowrap'>
      <div className={styles.daysContainer}>
        {datesList.map((date, index) => (
          <AnimatePresence key={index} mode='wait'>
            <CalendarDayButton date={date}>
              <p>{date.day}</p>
              <p
                className={clsx({
                  [styles.badge]: date.id === day.id,
                })}
              >
                {date.number}
              </p>
              <p>{date.month}</p>
            </CalendarDayButton>
          </AnimatePresence>
        ))}
      </div>
      <ScrollBar orientation='horizontal' className='h-0' />
    </ScrollArea>
  );
}
