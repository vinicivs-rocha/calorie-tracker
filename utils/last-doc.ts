export const getLastDocument = async <T>(
  collection: FirebaseFirestore.CollectionReference<T>
) =>
  (await collection.orderBy('createdAt', 'desc').limit(1).get()).docs[0];
