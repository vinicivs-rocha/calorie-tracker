import { MealDataContext as ContextType } from "@/types/contexts/meal";
import React from "react";

export const MealDataContext = React.createContext<ContextType>([{name: "", foods: []}, null]);