"use client";

import plusSign from "@/app/ui/assets/plus-sign.svg";
import { FoodDTO } from "@/types/food";
import { gql, useQuery } from "@apollo/client";
import Image from "next/image";
import { useCallback, useContext, useEffect, useRef, useState } from "react";
import ConfirmAdding from "./confirm-adding";
import QuantityInput from "./quantity";
import styles from "./update-meal.module.css";
import { MealDataContext } from "@/lib/contexts/meal";
import TacoItems from "../../taco-items";

export default function AddFoodButton() {
  const [mealData, setMealData] = useContext(MealDataContext);
  const activeRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(false)
  const [selectedFood, setSelectedFood] = useState<FoodDTO>({})
  const [isSelectOpen, setIsSelectOpen] = useState(false)
  
  function confirmAdding() {
    setAddedFoods(getFoodData);
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
    query GetFoodById($id: ID!) {
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

  useEffect(() => {
    if (active && activeRef.current) {
      activeRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [active]);

  return (
    <>
      {active ? (
        <div className={styles.foodInput} ref={activeRef}>
          <TacoItems setIsSelectOpen={setIsSelectOpen} setSelectedFood={setSelectedFood} />
          <QuantityInput setSelectedFood={setSelectedFood}/>
          <div className={styles.buttonsContainer}>
            <ConfirmAdding onClick={confirmAdding}/>
          </div>
        </div>
      ) : (
        <button className={styles.add} onClick={() => setActive(true)}>
          <Image src={plusSign} alt="" height={16} width={16}/>
        </button>
      )}
    </>
  )
}
