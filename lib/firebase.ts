import admin from "firebase-admin";
import 'server-only';

if (!(admin.apps.length > 0))
  admin.initializeApp({
    credential: admin.credential.cert(
      `${process.cwd()}/serviceAccountKey.json`
    ),
  });

export const db = admin.firestore();
