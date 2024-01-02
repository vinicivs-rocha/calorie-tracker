'use server';

import { updateGoalUtil } from '@/utils';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { z } from 'zod';

export const updateGoal = async (formData: FormData) => {
  try {
    const userUid = formData.get('userUid') as string;
    const goal = formData.get('goal') as string;
    const updateData = updateFields.parse({ userUid, goal });

    await updateGoalUtil(updateData.userUid, updateData.goal);
  } catch (error) {
    console.log(error);
  }
  revalidatePath(`/home`);
  redirect(`/home`);
};

const updateFields = z.object({
  userUid: z.string({
    required_error: 'Id do usuário é necessário',
    invalid_type_error: 'O nome deve ser uma string',
  }),
  goal: z.coerce
    .number({ required_error: 'Meta de calorias é necessária' })
    .int({ message: 'Meta de calorias deve ser um número inteiro' }),
});
