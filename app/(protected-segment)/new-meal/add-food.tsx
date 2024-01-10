'use client';

import React, {
  Dispatch,
  SetStateAction,
  useEffect,
  useState,
  useRef,
} from 'react';
import Image from 'next/image';
import plusSign from '@/app/ui/assets/plus-sign.svg';
import check from '@/app/ui/assets/check.svg';
import crossSign from '@/app/ui/assets/cross-icon.svg';
import styles from './new-meal.module.css';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/app/ui/components/ui/select';
import { FoodDTO } from '@/types/food';
import { motion, AnimatePresence, useAnimate } from 'framer-motion';

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
      carboQuantity: 10,
      proteinQuantity: 10,
      fatQuantity: 10,
    };
  }

  function confirmAdding() {
    setAddedFoods((prev) => [...prev, selectedFood]);
    setActive(false);
  }

  const activeRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(false);
  const [selectedFood, setSelectedFood] = useState<FoodDTO>({});
  const [isSelectOpen, setIsSelectOpen] = useState(false);

  const TACOFoods = ['Arroz', 'Feijão', 'Carne', 'Ovo', 'Salada'];

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
          <Select
            onValueChange={(foodName) =>
              setSelectedFood((prev) => ({ ...prev, name: foodName }))
            }
            onOpenChange={(isOpen) =>
              setTimeout(() => setIsSelectOpen(isOpen), 10)
            }
          >
            <SelectTrigger>
              <SelectValue placeholder='Selecione um alimento' />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Alimentos</SelectLabel>
                {TACOFoods.map((food, index) => (
                  <SelectItem value={food} key={index}>
                    {food}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
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
