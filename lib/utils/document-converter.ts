import { DocumentConverter } from "@/types/document-converter";

export const documentConverter: DocumentConverter = <T>() => ({
  toFirestore: (modelObject: T) => modelObject as FirebaseFirestore.DocumentData,
  fromFirestore: (snapshot: FirebaseFirestore.DocumentSnapshot) => snapshot.data() as T
})