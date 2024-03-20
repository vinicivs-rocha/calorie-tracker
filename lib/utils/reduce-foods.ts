import { FoodDTO } from '@/types/food';

export function reduceMealFoodsNutrients(mealFoods: FoodDTO[]) {
  return mealFoods.reduce(
    (acc, { nutrients, totalQuantity }) => {
      acc.nutrients!.kcal! += nutrients?.kcal!;
      acc.nutrients!.carbohydrates! += nutrients?.carbohydrates!;
      acc.nutrients!.lipids! += nutrients?.lipids!;
      acc.nutrients!.protein! += nutrients?.protein!;
      acc.totalQuantity! += totalQuantity!;
      return acc;
    },
    {
      nutrients: { kcal: 0, carbohydrates: 0, lipids: 0, protein: 0 },
      totalQuantity: 0,
    }
  );
}
