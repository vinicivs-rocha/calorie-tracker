import { feedings } from "@/utils/collections";

export const getLastFeeding = async (userUid: string) => await feedings(userUid).orderBy("createdAt", "desc").limit(1).get()