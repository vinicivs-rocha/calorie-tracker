export interface Meal {
  name: string;
  foods: { id: number; quantity: number }[];
}