export const getDocData = async <T>(
  snapshot:
    | FirebaseFirestore.QueryDocumentSnapshot<T>
    | FirebaseFirestore.DocumentSnapshot<T>
) => snapshot.data();
