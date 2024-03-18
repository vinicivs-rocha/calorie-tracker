import { CalendarDay } from '@/types/calendar';
import { Months } from './months';

export function calendarLastDateBuilder(
  lastDay: CalendarDay,
  increment: number
) {
  const newDate = new Date();
  newDate.setDate(lastDay.number + increment);
  newDate.setMonth(Months[lastDay.month]);
  newDate.setFullYear(lastDay.year);
  return newDate;
}
