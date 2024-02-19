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
import { Dispatch, SetStateAction } from 'react';

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
  // TODO - Fix ever loading query
  const queryResult = useQuery<{ getAllCategories: CategoryDTO[] }>(query);
  console.log(queryResult.loading, queryResult.error, queryResult.data);
  const foodsByCategory = queryResult.data?.getAllCategories;

  return (
    <Select
      onValueChange={(foodId) =>
        setSelectedFood(
          (prev) => ({ ...prev, id: foodId }) as unknown as FoodDTO
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
                {foods.map(({ name, id }) => (
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
