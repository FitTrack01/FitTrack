'use server';

import { filterInappropriateReels } from "@/ai/flows/filter-inappropriate-reels";

export async function getSafeReels(reels: string[]): Promise<string[]> {
  if (!reels || reels.length === 0) {
    return [];
  }
  try {
    const result = await filterInappropriateReels({ reels });
    return result.safeReels;
  } catch (error) {
    console.error("Error filtering reels:", error);
    // In case of AI error, return an empty list for safety.
    return [];
  }
}
