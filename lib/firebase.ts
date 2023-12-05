import { credential, initializeApp, ServiceAccount } from "firebase-admin";
import { FirestoreDataConverter, getFirestore } from "firebase-admin/firestore";
import serviceAccount from '../serviceAccountKey.json';

initializeApp({
  credential: credential.cert(serviceAccount as ServiceAccount),
})


export const firestore = getFirestore();
