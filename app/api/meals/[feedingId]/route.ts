import { getFoodsDataById, getMealData, getMealsSnapshots } from '@/lib/data';
import { getUserId } from '@/lib/session';
import { reduceMealFoodsNutrients } from '@/lib/utils';

export async function GET(
  req: Request,
  { params }: { params: { feedingId: string } }
) {
  const { feedingId } = params;
  const userUid = await getUserId();
  const [mealsSnapshots, error] = await getMealsSnapshots(userUid, feedingId);
  if (error) {
    return Response.json({
      error,
    });
  }
  const mealDocuments = await Promise.all(mealsSnapshots.map(getMealData));
  const mealsWithFoodData = await Promise.all(
    mealDocuments.map(getFoodsDataById)
  );
  const meals = mealsWithFoodData.map(({ name, foods }, index) => {
    const { nutrients, totalQuantity } = reduceMealFoodsNutrients(foods);

    if (nutrients === undefined || nutrients.kcal === undefined)
      return Response.json({ error: 'No nutrients data' });

    return {
      name,
      totalIntake: Math.floor(nutrients.kcal),
      totalQuantity,
    };
  });

  return Response.json(meals);
}
