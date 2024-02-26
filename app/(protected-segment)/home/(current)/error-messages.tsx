'use client';

import ErrorAlert from '@/app/error-alert';
import { ErrorsContext } from '@/lib/contexts';
import { useContext } from 'react';

export const ErrorMessages = () => {
  const { errors } = useContext(ErrorsContext);
  return (
    <div className='absolute flex w-auto flex-col gap-2 self-center xl:right-4 xl:top-4'>
      <ErrorAlert errors={errors} cause='remover refeição' />
    </div>
  );
};
