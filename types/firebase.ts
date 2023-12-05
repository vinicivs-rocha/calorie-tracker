export interface DocumentConverter<T> {
  toFirestore(object: T): T;
  fromFirestore(snapshot: FirebaseFirestore.DocumentSnapshot): T;
}