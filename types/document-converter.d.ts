import { FirestoreDataConverter } from "firebase-admin/firestore";

export type DocumentConverter = <T>() => FirestoreDataConverter<T>;