'use client';

import {
  QueryClient as Client,
  QueryClientProvider,
} from '@tanstack/react-query';
import { PropsWithChildren } from 'react';

export default function QueryClient({ children }: PropsWithChildren) {
  const queryClient = new Client();
  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
}
