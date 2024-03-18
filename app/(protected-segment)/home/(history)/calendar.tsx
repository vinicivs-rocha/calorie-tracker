'use client';

import { ScrollArea, ScrollBar } from '@/app/ui/components/ui/scroll-area';
import { CalendarDay } from '@/types/calendar';
import clsx from 'clsx';
import { useState } from 'react';
import styles from './history.module.css';

export default function Calendar({
  datesList,
  lastId,
}: {
  datesList: CalendarDay[];
  lastId: string;
}) {
  const [selectedId, setSelectedId] = useState<string>(lastId);
  return (
    <ScrollArea className='w-full whitespace-nowrap'>
      <div className={styles.daysContainer}>
        {datesList.map((date, index) => (
          <div
            onClick={() => {
              if (date.id !== '') {
                setSelectedId(date.id);
              }
            }}
            key={index}
            className={clsx(styles.day, {
              [styles.active]: date.id === selectedId,
              [styles.inactivated]: date.id === '',
            })}
          >
            <p>{date.day}</p>
            <p
              className={clsx({
                [styles.badge]: date.id === selectedId,
              })}
            >
              {date.number}
            </p>
            <p
              className={clsx({
                [styles.hidden]: date.id !== selectedId,
              })}
            >
              {date.month}
            </p>
          </div>
        ))}
      </div>
      <ScrollBar orientation='horizontal' className='h-0' />
    </ScrollArea>
  );
}
