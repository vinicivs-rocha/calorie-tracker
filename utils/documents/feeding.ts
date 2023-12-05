import { Timestamp } from "firebase-admin/firestore";

export class Feeding {
  constructor (readonly intake: number, readonly createdAt: Timestamp) {}
}