import React from 'react';

export type DragOpacityContext = [
  number,
  React.Dispatch<React.SetStateAction<number>> | null,
];
