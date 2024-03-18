
export const getAllCollectionDocs = async <T>(collection: FirebaseFirestore.CollectionReference<T>) => (await collection.get()).docs;
export const getAllCollectionDocsOrdered = async <T>(
  collection: FirebaseFirestore.CollectionReference<T>,
  field: string,
  order: 'asc' | 'desc'
) => (await collection.orderBy(field, order).get()).docs;