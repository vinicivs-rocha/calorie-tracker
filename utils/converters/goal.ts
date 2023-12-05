import { DocumentConverter } from '@/types/firebase';
import { Goal } from '../documents';

class GoalConverter implements DocumentConverter<Goal> {
  toFirestore(object: Goal): Goal {
    return object;
  }

  fromFirestore(snapshot: FirebaseFirestore.DocumentSnapshot): Goal {
    if (!snapshot.exists || !snapshot.data())
      throw new Error('Document does not exist or has no data');
    const { calories } = snapshot.data()!;
    return new Goal(calories);
  }
}

export const goalConverter = new GoalConverter();