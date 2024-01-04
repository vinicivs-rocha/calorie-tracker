'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import plusSign from '@/app/ui/assets/plus-sign.svg';
import check from '@/app/ui/assets/check.svg';

export default function AddFoodButton() {
  const [active, setActive] = useState(false);

  if (!active) {
    return (
      <button onClick={() => setActive(!active)}>
        <Image src={plusSign} alt='' width={16} height={16} />
      </button>
    );
  }

  return (
    <div>
      {/* TODO - Add shadcn ui select component */}
      <input type='number' name='quantity' />
      <button>
        <Image src={check} alt='' height={12} width={12} />
      </button>
    </div>
  );
}
