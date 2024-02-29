'use client';

import { CategoryDTO } from '@/types/category';
import { FoodDTO } from '@/types/food';
import { cn } from '@/utils';
import { gql, useQuery } from '@apollo/client';
import { CaretSortIcon, CheckIcon } from '@radix-ui/react-icons';
import { Dispatch, SetStateAction } from 'react';
import { Button } from '../ui/components/ui/button';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from '../ui/components/ui/command';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '../ui/components/ui/popover';
import { ScrollArea } from '../ui/components/ui/scroll-area';

export default function TacoItems({
  setSelectedFood,
  selectedFood,
  isOpen,
  setIsOpen,
}: {
  setSelectedFood: Dispatch<SetStateAction<FoodDTO>>;
  selectedFood: FoodDTO;
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
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
    <Popover
      open={isOpen}
      onOpenChange={(isOpen) => setTimeout(() => setIsOpen(isOpen), 10)}
    >
      <PopoverTrigger asChild>
        <Button
          variant='outline'
          role='combobox'
          aria-expanded={isOpen}
          className='w-full justify-between bg-transparent'
        >
          <span className='w-48 overflow-hidden text-left'>
            {selectedFood.name ?? 'Selecione um alimento'}
          </span>
          <CaretSortIcon className='ml-2 h-4 w-4 shrink-0 opacity-50' />
        </Button>
      </PopoverTrigger>
      <PopoverContent className='p-0'>
        <Command loop>
          <CommandInput placeholder='Buscar um alimento...' className='h-9' />
          <CommandEmpty>Nenhum alimento foi encontrado.</CommandEmpty>
          {foodsByCategory !== undefined ? (
            <ScrollArea className='h-44 rounded p-2'>
              {foodsByCategory.map(({ name, foods }, index) => (
                <CommandGroup key={index} heading={name}>
                  <div>
                    {foods.map(({ name, id: foodId }) => (
                      <CommandItem
                        onSelect={() => {
                          setSelectedFood(
                            (prev) =>
                              ({
                                ...prev,
                                id: foodId,
                                name,
                              }) as unknown as FoodDTO
                          );
                          setTimeout(() => setIsOpen(false), 10);
                        }}
                        key={foodId}
                      >
                        {name}
                        <CheckIcon
                          className={cn(
                            'ml-auto h-4 w-4',
                            selectedFood.id === foodId
                              ? 'opacity-100'
                              : 'opacity-0'
                          )}
                        />
                      </CommandItem>
                    ))}
                  </div>
                </CommandGroup>
              ))}
            </ScrollArea>
          ) : queryResult.loading ? (
            <p>Carregando...</p>
          ) : (
            queryResult.error?.message
          )}
        </Command>
      </PopoverContent>
    </Popover>
  );
}
