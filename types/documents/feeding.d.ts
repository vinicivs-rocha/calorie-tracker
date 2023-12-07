import { Timestamp } from "firebase-admin/firestore";

export interface Feeding {
  intake: number;
  createdAt: Timestamp;
  macros: Macros;
}