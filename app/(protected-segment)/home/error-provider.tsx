'use client';

import { ErrorsContext } from '@/lib/contexts';
import { PropsWithChildren, useState } from 'react';

export default function ErrorContextProvider({ children }: PropsWithChildren) {
  const [errors, setErrors] = useState<string[]>([]);
  return (
    <ErrorsContext.Provider value={{ errors, setErrors }}>
      {children}
    </ErrorsContext.Provider>
  );
}
