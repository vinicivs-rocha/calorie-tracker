import { initializeApp, cert, getApps } from "firebase-admin/app";
import { getFirestore } from "firebase-admin/firestore";

if (!getApps().length)
  initializeApp({
    credential: cert('/home/vinicius/calorie-tracker/serviceAccountKey.json'),
  })

export const db = getFirestore();
