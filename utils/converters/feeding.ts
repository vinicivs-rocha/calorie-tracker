import { DocumentConverter } from "@/types/firebase";
import { Feeding } from "../documents";

class FeedingConverter implements DocumentConverter<Feeding> {
  toFirestore(object: Feeding): Feeding {
    return object;
  }

  fromFirestore(snapshot: FirebaseFirestore.DocumentSnapshot): Feeding {
    if (!snapshot.exists || !snapshot.data())
      throw new Error("Document does not exist or has no data");
    const { intake, createdAt } = snapshot.data()!;
    return new Feeding(intake, createdAt);
  }
}

export const feedingConverter = new FeedingConverter();