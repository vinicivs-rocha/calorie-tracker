'use client';

import { CalendarContext } from '@/lib/contexts';
import { CalendarDay } from '@/types/calendar';
import { PropsWithChildren, useState } from 'react';

export function CalendarContextProvider({ children }: PropsWithChildren) {
  const [value, setValue] = useState<CalendarDay>({
    id: '',
    day: 'Qui',
    number: 1,
    month: 'Jan',
    year: 1970,
  });
  return (
    <CalendarContext.Provider value={{ value, setValue }}>
      {children}
    </CalendarContext.Provider>
  );
}
