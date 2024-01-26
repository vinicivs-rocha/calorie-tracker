'use client';

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/app/ui/components/ui/select';
import { CategoryDTO } from '@/types/category';
import { FoodDTO } from '@/types/food';
import { gql, useQuery } from '@apollo/client';
import React, {
  Dispatch,
  SetStateAction,
} from 'react';

export default function TacoItems({
  setSelectedFood,
  setIsSelectOpen,
}: {
  setSelectedFood: Dispatch<SetStateAction<FoodDTO>>;
  setIsSelectOpen: Dispatch<SetStateAction<boolean>>;
}) {
  const query = gql`
    query GetAllCategories {
      getAllCategories {
        name
        foods {
          id
          name
        }
      }
    }
  `;
  const queryResult = useQuery<{ getAllCategories: CategoryDTO[] }>(query);
  
  const foodsByCategory = queryResult.data?.getAllCategories;

  return (
    <Select
      onValueChange={(foodId) =>
        setSelectedFood(
          (prev) => ({ ...prev, id: foodId } as unknown as FoodDTO)
        )
      }
      onOpenChange={(isOpen) => setTimeout(() => setIsSelectOpen(isOpen), 10)}
    >
      <SelectTrigger>
        <SelectValue placeholder='Selecione um alimento' />
      </SelectTrigger>
      <SelectContent>
        {foodsByCategory !== undefined
          ? foodsByCategory.map(({ name, foods }, index) => (
              <SelectGroup key={index}>
                <SelectLabel>{name}</SelectLabel>
                {foods.map(({ name, id }, index) => (
                  <SelectItem value={id} key={id}>
                    {name}
                  </SelectItem>
                ))}
              </SelectGroup>
            ))
          : null}
      </SelectContent>
    </Select>
  );
}
