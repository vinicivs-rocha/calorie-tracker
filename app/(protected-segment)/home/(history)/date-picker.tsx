import { getFeedings } from '@/lib/data/feedings';
import { Months, WeekDays } from '@/lib/utils';
import { calendarLastDateBuilder } from '@/lib/utils/date-builder';
import { CalendarDay } from '@/types/calendar';
import Calendar from './calendar';
import styles from './history.module.css';
// TODO - add context
// TODO - add desktop styling
export default async function DatePicker() {
  const feedings = await getFeedings();
  const registeredDatesList = feedings.map<CalendarDay>((feeding) => {
    const creationDate = feeding.createdAt.toDate();
    return {
      id: feeding.id,
      number: creationDate.getDate(),
      day: WeekDays[creationDate.getDay()] as keyof typeof WeekDays,
      month: Months[creationDate.getMonth()] as keyof typeof Months,
      year: creationDate.getFullYear(),
    };
  });
  const nextFiveList = Array.from({ length: 5 }, (_, i) => {
    const lastDay = registeredDatesList.at(-1)!;
    const newDate = calendarLastDateBuilder(lastDay, i + 1);
    return {
      id: '',
      number: newDate.getDate(),
      day: WeekDays[newDate.getDay()] as keyof typeof WeekDays,
      month: Months[newDate.getMonth()] as keyof typeof Months,
      year: newDate.getFullYear(),
    } satisfies CalendarDay;
  });
  return (
    <div className={styles.daysBar}>
      <Calendar
        datesList={registeredDatesList.concat(nextFiveList)}
        lastId={registeredDatesList.at(-1)?.id ?? ''}
      ></Calendar>
    </div>
  );
}
