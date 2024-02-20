import { FormState } from '@/types/contexts';
import React from 'react';

export const FormStateContext = React.createContext<FormState>([
  {
    errors: {
      name: [],
      foods: [],
    },
  },
  () => {},
]);
