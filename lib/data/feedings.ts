import { Feeding } from '@/types/documents';
import { getUserId } from '../session';
import { getAllCollectionDocsOrdered, getDocData } from '../utils';
import { feedings } from '../utils/collections';

export async function getFeedings() {
  const userUid = await getUserId();
  const feedingsSnapshot = await getAllCollectionDocsOrdered(
    feedings(userUid),
    'createdAt',
    'asc'
  );
  const feedingsData = await Promise.all(
    feedingsSnapshot.map(
      async (doc) =>
        ({
          ...(await getDocData(doc)),
          id: doc.id,
        }) as Feeding & { id: string }
    )
  );
  return feedingsData;
}
