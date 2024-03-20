'use client';

import { ScrollArea, ScrollBar } from '@/app/ui/components/ui/scroll-area';
import { useCalendarContext } from '@/lib/contexts';
import { ConsumedMeal } from '@/types/consumed-meal';
import { useQuery } from '@tanstack/react-query';
import { createHash } from 'crypto';
import styles from './history.module.css';
import { MealOverviewCard } from './meal-card';

export function ConsumedMeals() {
  const { value: day } = useCalendarContext();

  const { data, isLoading, error } = useQuery<ConsumedMeal[]>({
    queryKey: ['mealsHistory', day],
    queryFn: () => fetch(`/api/meals/${day.id}`).then((res) => res.json()),
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    console.log(error);
    return <div>Error: {error.message}</div>;
  }

  return (
    <div className={styles.consumedMeals}>
      <h1 className={styles.consumedMealsTitle}>Refeições consumidas</h1>
      <ScrollArea className='w-full whitespace-nowrap'>
        <div className={styles.consumedMealsCardsContainer}>
          {data!.map((meal, index) => (
            <MealOverviewCard
              {...meal}
              key={createHash('sha1')
                .update(`${meal.name}${index}${day.id}`)
                .digest('hex')}
            ></MealOverviewCard>
          ))}
        </div>
        <ScrollBar orientation='horizontal' className='h-0' />
      </ScrollArea>
    </div>
  );
}
