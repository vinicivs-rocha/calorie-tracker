'use client';

import React, { useState } from 'react';
import backSign from '@/app/ui/assets/back-sign.svg';
import Image from 'next/image';
import { poppins } from '@/app/fonts';
import Food from './food';
import AddFoodButton from './add-food';

export default function NewMealPage() {
  const [addedFoods, setAddedFoods] = useState([
    { name: 'Arroz', carboQuantity: 10, proteinQuantity: 10, fatQuantity: 10 },
  ]);

  return (
    <>
      <div>
        <header>
          <Image src={backSign} alt='' height={12} width={12} />
          <h1 className={`${poppins.className}`}>Adicione sua refeição</h1>
        </header>
        <main>
          <div>
            <p>Nome:</p>
            <input
              type='text'
              name='mealName'
              placeholder='Digite o nome da nova refeição'
            />
          </div>
          <div>
            {addedFoods
              .map(
                (
                  { name, carboQuantity, fatQuantity, proteinQuantity },
                  index
                ) => (
                  <Food
                    name={name}
                    carboQuantity={carboQuantity}
                    fatQuantity={fatQuantity}
                    proteinQuantity={proteinQuantity}
                    key={index}
                  />
                )
              )
              .concat(<AddFoodButton />)}
          </div>
        </main>
      </div>
      <footer>
        <button className={`${poppins.className}`}>Adicionar refeição</button>
      </footer>
    </>
  );
}
