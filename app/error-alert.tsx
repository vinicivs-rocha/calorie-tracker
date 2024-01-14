'use client';

import { ExclamationTriangleIcon } from '@radix-ui/react-icons';

import {
  Alert,
  AlertDescription,
  AlertTitle,
} from '@/app/ui/components/ui/alert';
import { motion } from 'framer-motion';
import { AnimatePresence } from 'framer-motion';

export default function ErrorAlert({
  errors,
  cause,
}: {
  errors: string[];
  cause: string;
}) {
  return (
    <AnimatePresence mode='wait'>
      {errors.map((message) => (
        <motion.div
          key={message}
          initial={{ x: 1000, opacity: 0 }}
          animate={{ x: 0, opacity: 1, transition: { duration: 0.3 } }}
          exit={{ x: -1000, opacity: 0 , transition: { duration: 0.3 }}}
        >
          <Alert className='bg-red-300' variant='destructive'>
            <ExclamationTriangleIcon className='h-3 w-3' color='white' />
            <AlertTitle className='text-sm text-zinc-100'>
              Erro ao {cause}
            </AlertTitle>
            <AlertDescription className='text-xs text-zinc-100'>
              {message}
            </AlertDescription>
          </Alert>
        </motion.div>
      ))}
    </AnimatePresence>
  );
}
