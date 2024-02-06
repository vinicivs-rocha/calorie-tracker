import { getAllCollectionDocs, getDocData, getLastDocument } from '@/lib/utils';
import { feedings, meals } from '@/lib/utils/collections';
import { Meal } from '@/types/documents';
import { ErrorMessage } from '@/types/error';
import { FoodDTO } from '@/types/food';
import { gql } from '@apollo/client';
import { client } from '../graphql';
import { getUserId } from '../session';

export async function getMealData(
  mealDoc: FirebaseFirestore.QueryDocumentSnapshot<
    Meal,
    FirebaseFirestore.DocumentData
  >
): Promise<Meal> {
  const mealData = (await getDocData(mealDoc)) as Meal;

  return mealData;
}

export async function getMealsSnapshots(): Promise<
  [
    FirebaseFirestore.QueryDocumentSnapshot<
      Meal,
      FirebaseFirestore.DocumentData
    >[],
    ErrorMessage,
  ]
> {
  const userUid = await getUserId();
  const feeding = (await getLastDocument(feedings(userUid))) ?? {
    exists: false,
  };

  if (!feeding.exists) {
    return [[], 'No feedings found'];
  }

  const mealsDocs = await getAllCollectionDocs(meals(userUid, feeding.id));

  return [mealsDocs, null];
}

export async function getMealDataById(
  mealId: string
): Promise<{ name: string; foods: FoodDTO[] }> {
  const [mealsDocs, error] = await getMealsSnapshots();
  if (error) {
    throw new Error(error);
  }
  const desiredMealDoc = mealsDocs.find((meal) => meal.id === mealId);
  if (!desiredMealDoc) {
    throw new Error('No meal found');
  }
  const desiredMeal = await getMealData(desiredMealDoc);
  const GET_FOOD = gql`
    query GET_FOOD($id: Int!) {
      getFoodById(id: $id) {
        id
        name
        nutrients {
          carbohydrates
          protein
          lipids
          kcal
        }
      }
    }
  `;
  const desiredMealFoodsDTO = await Promise.all(
    desiredMeal.foods.map(
      async (foodId) =>
        (
          await client.query({
            query: GET_FOOD,
            variables: { id: foodId },
          })
        ).data.getFoodById as FoodDTO
    )
  );
  return {
    name: desiredMeal.name,
    foods: desiredMealFoodsDTO,
  };
}
