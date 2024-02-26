import { createContext } from 'react';

export const ErrorsContext = createContext<{
  errors: string[];
  setErrors: React.Dispatch<React.SetStateAction<string[]>>;
}>({ errors: [], setErrors: () => console.log('No state provided') });
