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

Return ONLY the list of safe reels. Do not say anything else.

Reels to review: {{{reels}}}
`,
});

const filterInappropriateReelsFlow = ai.defineFlow(
  {
    name: 'filterInappropriateReelsFlow',
    inputSchema: FilterInappropriateReelsInputSchema,
    outputSchema: FilterInappropriateReelsOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
