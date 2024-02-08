'use server';

import admin from 'firebase-admin';
import { getUserId } from '../session';
import { feedings } from '@/lib/utils/collections';
import { revalidatePath } from 'next/cache';

export async function initNewFeeding() {
  try {
    const userUid = await getUserId();
    feedings(userUid).add({
      createdAt: admin.firestore.Timestamp.now(),
      intake: 0,
      macros: {
        carbo: 0,
        protein: 0,
        fat: 0,
      },
    });
  } catch (error) {
    console.log(error);
  }

  revalidatePath('/home');
}
