import React from "react";
import { FoodDTO } from "../food";

export type MealDataContext = [{name: string, foods: FoodDTO[]}, React.Dispatch<React.SetStateAction<{name: string, foods: FoodDTO[]}>> | null];