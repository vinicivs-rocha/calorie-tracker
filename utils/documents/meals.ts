import { Meal } from '@/types/documents';

export const getMeal = async (snapshot: FirebaseFirestore.QueryDocumentSnapshot<Meal>) => snapshot.data();
