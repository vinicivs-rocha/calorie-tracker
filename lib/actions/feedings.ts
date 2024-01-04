'use server';

import admin from 'firebase-admin';
import { getUserId } from '../session';
import { feedings } from '@/utils/collections';
import { revalidatePath } from 'next/cache';

export async function initNewFeeding() {
  try {
    const userUid = await getUserId();
    feedings(userUid).add({
      createdAt: admin.firestore.Timestamp.now(),
      intake: 0,
      macros: {
        carbs: 0,
        proteins: 0,
        fats: 0,
      },
    });
  } catch (error) {
    console.log(error);
  }

  revalidatePath('/home');
}
