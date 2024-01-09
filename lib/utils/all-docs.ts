
export const getAllCollectionDocs = async <T>(collection: FirebaseFirestore.CollectionReference<T>) => (await collection.get()).docs;