'use client';

import plusSign from '@/app/ui/assets/plus-sign.svg';
import trashSign from '@/app/ui/assets/trash-sign.svg';
import { MealDataContext } from '@/lib/contexts/meal';
import { FoodDTO } from '@/types/food';
import { gql, useQuery } from '@apollo/client';
import { AnimatePresence, motion } from 'framer-motion';
import Image from 'next/image';
import { useCallback, useContext, useEffect, useRef, useState } from 'react';
import TacoItems from '../../taco-items';
import CancelAdding from './cancel';
import ConfirmAdding from './confirm-adding';
import QuantityInput from './quantity';
import styles from './update-meal.module.css';

const variants = {
  adding: { opacity: [0, 1], scale: 1 },
  deleting: {
    backgroundColor: '#dc2626',
    opacity: [0, 1],
    scale: 1,
  },
};

const iconVariants = {
  visible: { opacity: 1, scale: 1 },
  hidden: { opacity: 0, scale: 0 },
  exit: { opacity: 0, scale: 0 },
};

export default function AddFoodButton() {
  const [mealData, setMealData] = useContext(MealDataContext);
  const activeRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(false);
  const [selectedFood, setSelectedFood] = useState<FoodDTO>({});
  const [isSelectOpen, setIsSelectOpen] = useState(false);
  const isDeleting = mealData?.foods.some((food) => food.selected);

  function confirmAdding() {
    setAddedFoods(getFoodData);
    setActive(false);
  }

  function cancelAdding() {
    if (isSelectOpen) return;
    setSelectedFood({});
    setActive(false);
  }

  function setAddedFoods(setFunction: (prevState: FoodDTO[]) => FoodDTO[]) {
    if (!setMealData) throw new Error('setMealData is not defined');

    setMealData((prev) => ({
      ...prev,
      foods: setFunction(prev.foods),
    }));
  }
  const query = gql`
    query GetFoodById($id: Int!) {
      getFoodById(id: $id) {
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

  const foodData = useQuery<{ getFoodById: FoodDTO }>(query, {
    variables: { id: selectedFood.id },
  });

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
            carbohydrates: (carbohydrates! * totalQuantity!) / 100,
            protein: (protein! * totalQuantity!) / 100,
            lipids: (lipids! * totalQuantity!) / 100,
            kcal: (kcal! * totalQuantity!) / 100,
          },
          selected: false,
        },
      ];
    },
    [foodData, selectedFood]
  );

  function removeSelected() {
    if (!setMealData) throw new Error('Meal data context not provided');
    setMealData((prev) => ({
      ...prev,
      foods: prev.foods.filter((food) => !food.selected),
    }));
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
          className={styles.foodInput}
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
          <TacoItems
            setIsSelectOpen={setIsSelectOpen}
            setSelectedFood={setSelectedFood}
          />
          <QuantityInput setSelectedFood={setSelectedFood} />
          <div className={styles.buttonsContainer}>
            <CancelAdding onClick={cancelAdding} />
            <ConfirmAdding onClick={confirmAdding} />
          </div>
        </motion.div>
      ) : (
        <motion.button
          key='add-food'
          className={styles.add}
          onClick={() => (isDeleting ? removeSelected() : setActive(true))}
          initial={{ opacity: 0, scale: 0 }}
          animate={isDeleting ? 'deleting' : 'adding'}
          variants={variants}
          transition={{
            duration: 0.2,
            type: 'spring',
            stiffness: 200,
            damping: 35,
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
          {isDeleting ? (
            <Image src={trashSign} alt='' height={32} width={32} />
          ) : (
            <Image src={plusSign} alt='' height={16} width={16} />
          )}
        </motion.button>
      )}
    </AnimatePresence>
  );
}
