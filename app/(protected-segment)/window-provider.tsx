'use client';

import React, { useEffect, useState } from 'react';
import { WindowWidthContext } from '../../lib/contexts/window-context';

export default function WindowWidthProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [viewportWidth, setViewportWidth] = useState(0);

  useEffect(() => setViewportWidth(window.innerWidth), []);

  return (
    <WindowWidthContext.Provider value={viewportWidth}>
      {children}
    </WindowWidthContext.Provider>
  );
}
