export type FoodDTO = {
  id?: number;
  name?: string;
  totalQuantity?: number;
  nutrients?: {
    carbohydrates?: number;
    protein?: number;
    lipids?: number;
    kcal?: number;
  };
};
