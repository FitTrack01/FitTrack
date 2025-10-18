'use server';

/**
 * @fileOverview Filters Instagram Reels with inappropriate content using GenAI.
 *
 * - filterInappropriateReels - A function that filters a list of Instagram Reels and returns only safe ones.
 * - FilterInappropriateReelsInput - The input type for the filterInappropriateReels function.
 * - FilterInappropriateReelsOutput - The return type for the filterInappropriateReels function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const FilterInappropriateReelsInputSchema = z.object({
  reels: z
    .array(z.string())
    .describe('An array of Instagram Reel URLs to check for inappropriate content.'),
});
export type FilterInappropriateReelsInput = z.infer<
  typeof FilterInappropriateReelsInputSchema
>;

const FilterInappropriateReelsOutputSchema = z.object({
  safeReels: z
    .array(z.string())
    .describe('An array of Instagram Reel URLs that are deemed safe.'),
});
export type FilterInappropriateReelsOutput = z.infer<
  typeof FilterInappropriateReelsOutputSchema
>;

export async function filterInappropriateReels(
  input: FilterInappropriateReelsInput
): Promise<FilterInappropriateReelsOutput> {
  return filterInappropriateReelsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'filterInappropriateReelsPrompt',
  input: {schema: FilterInappropriateReelsInputSchema},
  output: {schema: FilterInappropriateReelsOutputSchema},
  prompt: `You are a content safety filter for a fitness application.
Your job is to review a list of Instagram Reels and determine which ones are safe for users of all ages.

Consider reels inappropriate if they contain:
- Nudity or sexually suggestive content
- Hate speech or discriminatory language
- Violence or harmful activities
- Promotion of illegal substances

Each reel URL may contain tracking parameters (like ?igsh=...). When you return the safe reels, please preserve the full original URL including these parameters.

Return ONLY the list of safe reels. Do not say anything else.

Reels to review:
{{#each reels}}
- {{{this}}}
{{/each}}
`,
});

const filterInappropriateReelsFlow = ai.defineFlow(
  {
    name: 'filterInappropriateReelsFlow',
    inputSchema: FilterInappropriateReelsInputSchema,
    outputSchema: FilterInappropriateReelsOutputSchema,
  },
  async input => {
    // Before sending to the AI, strip tracking params to get a clean URL for better processing,
    // but keep a map to restore them later.
    const urlMap = new Map<string, string>();
    const cleanedReels = input.reels.map(reel => {
      const url = new URL(reel);
      const cleanUrl = `${url.protocol}//${url.hostname}${url.pathname}`;
      urlMap.set(cleanUrl, reel); // Map clean URL back to original
      return cleanUrl;
    });

    const {output} = await prompt({ reels: cleanedReels });
    
    if (!output) return { safeReels: [] };

    // Restore original URLs with tracking params
    const restoredReels = output.safeReels.map(cleanUrl => urlMap.get(cleanUrl) || cleanUrl);

    return { safeReels: restoredReels };
  }
);
