import { feedings } from "@/utils/collections";

export async function getCaloriesIntake(userUid: string): Promise<number> {
  const lastFeeding = await feedings(userUid).orderBy('createdAt', 'desc').limit(1).get();
  const { intake } = lastFeeding.docs[0].data();
  return intake;
}