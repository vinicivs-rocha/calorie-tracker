import { FoodDTO } from '@/types/food';
import { Dispatch, SetStateAction } from 'react';
import styles from './update-meal.module.css';

export default function QuantityInput({ setSelectedFood }: { setSelectedFood: Dispatch<SetStateAction<FoodDTO>>}) {
  function setQuantity(prev: FoodDTO, totalQuantity: number) {
    return {
      ...prev,
      totalQuantity,
    };
  }
  return (
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
  )
}
