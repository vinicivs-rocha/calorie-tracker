import { Months, WeekDays } from '@/lib/utils';

export type CalendarDay = {
  id: string;
  number: number;
  day: keyof typeof WeekDays;
  month: keyof typeof Months;
  year: number;
};
