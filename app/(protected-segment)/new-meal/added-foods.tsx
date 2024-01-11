'use client';

import Food from './food';
import AddFoodButton from './add-food';
import { FoodDTO } from '@/types/food';
import { Dispatch, SetStateAction } from 'react';
import styles from './new-meal.module.css';
import { client } from '@/lib/graphql';
import { ApolloProvider } from '@apollo/client';

export default function AddedFoods({
  addedFoods,
  setAddedFoods
}: {
  addedFoods: FoodDTO[]
  setAddedFoods: Dispatch<SetStateAction<FoodDTO[]>>
}) {
  

  return (
    <div className={styles.foods}>
      {addedFoods.map(({ name, nutrients }, index) => (
        <Food name={name} nutrients={nutrients} key={index} />
      ))}
      <ApolloProvider client={client}>
        <AddFoodButton setAddedFoods={setAddedFoods} />
      </ApolloProvider>
    </div>
  );
}
