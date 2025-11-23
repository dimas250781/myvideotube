// src/ai/flows/video-recommendations.ts
'use server';

/**
 * @fileOverview A flow for generating personalized video recommendations based on a user's viewing history.
 *
 * This file exports:
 * - `getVideoRecommendations` - A function to trigger the video recommendation flow.
 * - `VideoRecommendationsInput` - The input type for the `getVideoRecommendations` function.
 * - `VideoRecommendationsOutput` - The output type for the `getVideoRecommendations` function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

// Input schema for video recommendations, includes viewing history
const VideoRecommendationsInputSchema = z.object({
  userId: z.string().describe('The ID of the user for whom to generate recommendations.'),
  viewingHistory: z
    .array(z.string())
    .describe('An array of video IDs representing the user\'s viewing history.'),
  interests: z
    .array(z.string())
    .optional()
    .describe('The user interests to tailor video recommendations'),
  numRecommendations: z
    .number()
    .default(5)
    .describe('The number of video recommendations to generate.'),
});
export type VideoRecommendationsInput = z.infer<typeof VideoRecommendationsInputSchema>;

// Output schema for video recommendations
const VideoRecommendationsOutputSchema = z.object({
  recommendations: z
    .array(z.string())
    .describe('An array of video IDs representing the personalized video recommendations.'),
});
export type VideoRecommendationsOutput = z.infer<typeof VideoRecommendationsOutputSchema>;

// Exported function to trigger the video recommendation flow
export async function getVideoRecommendations(
  input: VideoRecommendationsInput
): Promise<VideoRecommendationsOutput> {
  return videoRecommendationsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'videoRecommendationsPrompt',
  input: {
    schema: VideoRecommendationsInputSchema,
  },
  output: {
    schema: VideoRecommendationsOutputSchema,
  },
  prompt: `You are a video recommendation expert. Given a user's viewing history and interests, you will provide personalized video recommendations.

  User ID: {{{userId}}}
  Viewing History: {{#if viewingHistory}}{{{viewingHistory}}}{{else}}None{{/if}}
  Interests: {{#if interests}}{{{interests}}}{{else}}None{{/if}}

  Based on this information, provide a list of the top {{numRecommendations}} video recommendations.  Respond with an array of video IDs.
  Make sure the recommendations are diverse and cover different topics.
  The output should be a JSON array of strings. Do not include any additional text or explanations.
  `,
});

// Genkit flow definition for video recommendations
const videoRecommendationsFlow = ai.defineFlow(
  {
    name: 'videoRecommendationsFlow',
    inputSchema: VideoRecommendationsInputSchema,
    outputSchema: VideoRecommendationsOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
