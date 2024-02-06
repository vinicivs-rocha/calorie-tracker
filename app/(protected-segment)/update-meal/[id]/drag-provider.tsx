'use client';

import { DragOpacityContext } from '@/lib/contexts/drag';
import React, { PropsWithChildren } from 'react';

export default function DragOpacityContextProvider({
  children,
  initialValue,
}: PropsWithChildren<{
  initialValue: number;
}>) {
  const [dragOpacity, setDragOpacity] = React.useState<number>(initialValue);
  return (
    <DragOpacityContext.Provider value={[dragOpacity, setDragOpacity]}>
      {children}
    </DragOpacityContext.Provider>
  );
}
