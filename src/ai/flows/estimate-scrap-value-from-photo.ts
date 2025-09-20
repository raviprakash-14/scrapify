'use server';
/**
 * @fileOverview Estimates the value and material composition of scrap items from a photo.
 *
 * - estimateScrapValueFromPhoto - A function that handles the scrap value estimation process.
 * - EstimateScrapValueInput - The input type for the estimateScrapValueFromPhoto function.
 * - EstimateScrapValueOutput - The return type for the estimateScrapValueFromPhoto function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const EstimateScrapValueInputSchema = z.object({
  photoDataUri: z
    .string()
    .describe(
      'A photo of the scrap item, as a data URI that must include a MIME type and use Base64 encoding. Expected format: \'data:<mimetype>;base64,<encoded_data>\'.' 
    ),
  description: z.string().describe('A brief description of the scrap item.'),
});
export type EstimateScrapValueInput = z.infer<typeof EstimateScrapValueInputSchema>;

const EstimateScrapValueOutputSchema = z.object({
  estimatedValue: z
    .number()
    .describe('The estimated value of the scrap item in USD.'),
  materialComposition: z
    .string()
    .describe('The estimated material composition of the scrap item.'),
  condition: z.string().describe('The estimated condition of the scrap item.'),
});
export type EstimateScrapValueOutput = z.infer<typeof EstimateScrapValueOutputSchema>;

export async function estimateScrapValueFromPhoto(
  input: EstimateScrapValueInput
): Promise<EstimateScrapValueOutput> {
  return estimateScrapValueFromPhotoFlow(input);
}

const prompt = ai.definePrompt({
  name: 'estimateScrapValueFromPhotoPrompt',
  input: {schema: EstimateScrapValueInputSchema},
  output: {schema: EstimateScrapValueOutputSchema},
  prompt: `You are an expert in scrap metal and e-waste valuation.

You will use the provided information, including a description and a photo, to estimate the value, material composition, and condition of the scrap item.

Description: {{{description}}}
Photo: {{media url=photoDataUri}}

Consider factors like material type, weight, condition, and current market prices.

Provide your estimate in USD.
`,
});

const estimateScrapValueFromPhotoFlow = ai.defineFlow(
  {
    name: 'estimateScrapValueFromPhotoFlow',
    inputSchema: EstimateScrapValueInputSchema,
    outputSchema: EstimateScrapValueOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
