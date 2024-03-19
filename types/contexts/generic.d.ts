import { Dispatch, SetStateAction } from 'react';

export type GenericContext<T> = {
  value: T;
  setValue: Dispatch<SetStateAction<T>>;
};
