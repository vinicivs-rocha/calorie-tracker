import { DragOpacityContext as ContextType } from '@/types/contexts/';
import React from 'react';

export const DragOpacityContext = React.createContext<ContextType>([0, null]);
