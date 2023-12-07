import { Feeding } from "@/types/documents";

export const getMacros = async (feeding: FirebaseFirestore.QueryDocumentSnapshot<Feeding>) =>  feeding.data().macros;