import { CalendarDay } from '@/types/calendar';
import { GenericContext } from '@/types/contexts';
import { createContext, useContext } from 'react';

export const CalendarContext = createContext<GenericContext<CalendarDay>>({
  value: {
    id: '',
    day: 'Qui',
    number: 1,
    month: 'Jan',
    year: 1970,
  },
  setValue: () => {},
});

export const useCalendarContext = () => {
  const context = useContext(CalendarContext);
  if (!context) {
    throw new Error(
      'useCalendarContext must be used within a CalendarContextProvider'
    );
  }
  return context;
};
