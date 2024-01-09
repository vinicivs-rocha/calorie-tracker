import { db } from '@/lib/firebase';
import { documentConverter } from './document-converter';

export const collectionPointer = <T>(path: string) => db.collection(path).withConverter(documentConverter<T>());