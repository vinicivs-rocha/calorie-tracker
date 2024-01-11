'use client';

import React, {
  Dispatch,
  SetStateAction,
  useEffect,
  useState,
  useRef,
  useCallback,
} from 'react';
import Image from 'next/image';
import check from '@/app/ui/assets/check.svg';
import crossSign from '@/app/ui/assets/cross-icon.svg';
import styles from './new-meal.module.css';
import { FoodDTO } from '@/types/food';
import { motion, AnimatePresence, useAnimate } from 'framer-motion';
import TacoItems from './taco-items';
import { ApolloProvider, gql, useQuery } from '@apollo/client';
import { client } from '@/lib/graphql';
import plusSign from '@/app/ui/assets/plus-sign.svg';

export default function AddFoodButton({
  setAddedFoods,
}: {
  setAddedFoods: Dispatch<SetStateAction<FoodDTO[]>>;
}) {
  function cancelAdding() {
    if (isSelectOpen) return;
    setActive(false);
    setSelectedFood({});
  }

  function setQuantity(prev: FoodDTO, totalQuantity: number) {
    // TODO - query macros data
    return {
      ...prev,
      totalQuantity,
    };
  }

  const activeRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(false);
  const [selectedFood, setSelectedFood] = useState<FoodDTO>({});
  const [isSelectOpen, setIsSelectOpen] = useState(false);

  const useFoodDataQuery = useCallback(() => {
    const query = gql`
      query GetFoodById {
        getFoodById(id: ${selectedFood.id}) {
          id
          name
          nutrients {
            carbohydrates
            protein
            lipids
            kcal
          }
        }
      }
    `;

    return query;
  }, [selectedFood]);

  const foodData = useQuery<{ getFoodById: FoodDTO }>(useFoodDataQuery());

  const getFoodData = useCallback(
    (prev: FoodDTO[]) => {
      if (foodData.loading) {
        return [];
      }
      if (foodData.error) {
        console.log(foodData.error);
        return [];
      }
      const { getFoodById: food } = foodData.data!;
      const { totalQuantity, id } = selectedFood;
      const { name, nutrients } = food;
      const { carbohydrates, protein, lipids, kcal } = nutrients!;
      return [
        ...prev,
        {
          id,
          totalQuantity,
          name,
          nutrients: {
            carbohydrates: (carbohydrates! * totalQuantity!)  / 100,
            protein: (protein! * totalQuantity!) / 100,
            lipids: (lipids! * totalQuantity!) / 100,
            kcal: (kcal! * totalQuantity!) / 100,
          },
        },
      ];
    },
    [foodData, selectedFood]
  );

  function confirmAdding() {
    setAddedFoods(getFoodData);
    setActive(false);
  }
  useEffect(() => {
    if (active && activeRef.current) {
      activeRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [active]);

  return (
    <AnimatePresence>
      {active ? (
        <motion.div
          key='adding-food'
          className={styles.addingFood}
          ref={activeRef}
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{
            duration: 0.2,
            type: 'spring',
            stiffness: 200,
            damping: 9,
          }}
          exit={{
            opacity: 0,
            scaleY: 0,
            position: 'absolute',
            top: '-100vh',
            transition: { duration: 0.2, type: 'just' },
          }}
        >
          <ApolloProvider client={client}>
            <TacoItems
              setIsSelectOpen={setIsSelectOpen}
              setSelectedFood={setSelectedFood}
            />
          </ApolloProvider>
          <div className={styles.quantityContainer}>
            <input
              className={styles.quantityInput}
              type='number'
              name='quantity'
              placeholder='Digite a quantidade'
              onChange={(e) =>
                setSelectedFood((prev) =>
                  setQuantity(prev, Number(e.target.value))
                )
              }
            />
            <span className={styles.quantityUnit}>g</span>
          </div>
          <div className={styles.buttonsContainer}>
            <button
              className={styles.cancelAddingButton}
              onClick={cancelAdding}
            >
              <Image src={crossSign} alt='' height={12} width={12} />
            </button>
            <button className={styles.addingButton} onClick={confirmAdding}>
              <Image src={check} alt='' height={12} width={12} />
            </button>
          </div>
        </motion.div>
      ) : (
        <motion.button
          className={styles.addButton}
          onClick={() => setActive(true)}
          key='add-food'
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{
            duration: 0.2,
            type: 'spring',
            stiffness: 200,
            damping: 9,
          }}
          exit={{
            opacity: 0,
            scale: 2,
            position: 'absolute',
            top: '-100vh',
            height: 0,
            transition: { type: 'just', duration: 0.2 },
          }}
        >
          <Image src={plusSign} alt='' width={16} height={16} />
        </motion.button>
      )}
    </AnimatePresence>
  );
}
