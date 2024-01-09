'use client';

import React, { useState } from 'react';
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

export default function AddFoodButton() {
  const [active, setActive] = useState(false);
  const TACOFoods = ['Arroz', 'Feijão', 'Carne', 'Ovo', 'Salada'];

  if (!active) {
    return (
      <button className={styles.addButton} onClick={() => setActive(true)}>
        <Image src={plusSign} alt='' width={16} height={16} />
      </button>
    );
  }

  return (
    <div className={styles.addingFood}>
      <Select>
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
        <input className={styles.quantityInput} type='number' name='quantity' placeholder='Digite a quantidade'/>
        <span className={styles.quantityUnit}>g</span>
      </div>
      <div className={styles.buttonsContainer}>
        <button className={styles.cancelAddingButton} onClick={() => setActive(false)}>
          <Image src={crossSign} alt='' height={12} width={12} />
        </button>
        <button className={styles.addingButton}>
          <Image src={check} alt='' height={12} width={12} />
        </button>
      </div>
    </div>
  );
}
