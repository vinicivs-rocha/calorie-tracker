import { Meal } from '@/types/documents';
import { FoodDTO } from '@/types/food';
import { ApolloError, gql } from '@apollo/client';
import { client } from '../graphql';

export async function getFoodsDataById(
  meal: Meal
): Promise<{ name: string; foods: FoodDTO[] }> {
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
  const foodsDTO = await Promise.all(
    meal.foods.map(async ({ id, quantity }) => {
      try {
        const result = await client.query({
          query: GET_FOOD,
          variables: { id },
        });
        const data = result.data.getFoodById as FoodDTO;
        return {
          ...data,
          totalQuantity: quantity,
          nutrients: {
            carbohydrates: (data.nutrients?.carbohydrates! * quantity) / 100,
            protein: (data.nutrients?.protein! * quantity) / 100,
            lipids: (data.nutrients?.lipids! * quantity) / 100,
            kcal: (data.nutrients?.kcal! * quantity) / 100,
          },
          selected: false,
        };
      } catch (error) {
        if (error instanceof ApolloError) {
          console.log(error);
        }
        return null;
      }
    })
  );
  return {
    name: meal.name,
    foods: foodsDTO.filter((food) => food !== null) as FoodDTO[],
  };
}
