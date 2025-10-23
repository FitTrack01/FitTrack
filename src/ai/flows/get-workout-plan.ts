'use server';

/**
 * @fileOverview Generates a personalized workout plan using GenAI.
 * 
 * - getWorkoutPlan - A function that generates a workout plan based on user's BMI and goals.
 * - GetWorkoutPlanInput - The input type for the getWorkoutPlan function.
 * - WorkoutPlan - The output type for the getWorkoutPlan function.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';
import { exercises } from '@/lib/data';
import type { BodyPart } from '@/lib/types';

// Dynamically generate the exercise ID enum from the data file
const exerciseIds = exercises.map(ex => ex.id) as [string, ...string[]];
const ExerciseIdEnum = z.enum(exerciseIds);

const GetWorkoutPlanInputSchema = z.object({
  bmi: z.number().describe('The user\'s Body Mass Index.'),
  goal: z.enum(['lose_weight', 'build_muscle', 'improve_fitness'])
    .describe('The user\'s primary fitness goal.'),
});
export type GetWorkoutPlanInput = z.infer<typeof GetWorkoutPlanInputSchema>;

const WorkoutPlanSchema = z.object({
  summary: z.string().describe('A brief, encouraging summary of the recommended workout plan.'),
  days: z.array(z.object({
    day: z.string().describe('The day of the week for the workout (e.g., "Day 1: Full Body").'),
    exercises: z.array(z.object({
        id: ExerciseIdEnum.describe("The unique ID of the exercise."),
        name: z.string().describe("The name of the exercise."),
        bodyPart: z.string().describe("The body part the exercise targets.")
    })).describe('A list of exercises for this day.'),
  })).describe('A list of workout days.'),
});
export type WorkoutPlan = z.infer<typeof WorkoutPlanSchema>;

export async function getWorkoutPlan(input: GetWorkoutPlanInput): Promise<WorkoutPlan> {
  return getWorkoutPlanFlow(input);
}

// Pass the list of available exercises to the prompt
const exerciseListForPrompt = exercises.map(e => `- ${e.id} (${e.name}, targets: ${e.bodyPart})`).join('\n');

const prompt = ai.definePrompt({
  name: 'getWorkoutPlanPrompt',
  input: { schema: GetWorkoutPlanInputSchema },
  output: { schema: WorkoutPlanSchema },
  prompt: `You are a certified personal trainer creating a 3-day workout plan for a user.

User Information:
- BMI: {{{bmi}}}
- Goal: {{{goal}}}

Your Task:
Create a balanced 3-day workout plan using ONLY the exercises from the list below.
- For "lose_weight", focus on full-body workouts with a mix of compound exercises.
- For "build_muscle", create a split routine (e.g., Push/Pull/Legs or Upper/Lower/Full).
- For "improve_fitness", provide a balanced full-body routine.

Select 4-5 exercises for each day. Ensure the exercise IDs you return are valid and exist in the provided list.
For each exercise in the plan, you MUST provide the correct 'id', 'name', and 'bodyPart' from the list.

Provide a brief, encouraging summary for the user about their new plan.

Available Exercises:
{{{exercises}}}
`,
});


const getWorkoutPlanFlow = ai.defineFlow(
  {
    name: 'getWorkoutPlanFlow',
    inputSchema: GetWorkoutPlanInputSchema,
    outputSchema: WorkoutPlanSchema,
  },
  async (input) => {
    const { output } = await prompt({ ...input, exercises: exerciseListForPrompt });

    if (!output) {
      throw new Error("Failed to generate a workout plan.");
    }
    
    // Validate that the returned exercise IDs are correct and add the bodyPart
    const validatedDays = output.days.map(day => {
        const validatedExercises = day.exercises.map(ex => {
            const originalExercise = exercises.find(e => e.id === ex.id);
            if (!originalExercise) {
                // The AI might hallucinate. It's better to filter this out than to fail.
                return null;
            }
            return { 
                id: originalExercise.id,
                name: originalExercise.name,
                bodyPart: originalExercise.bodyPart as BodyPart
            };
        }).filter((ex): ex is {id: string; name: string; bodyPart: BodyPart} => ex !== null);

        return { ...day, exercises: validatedExercises };
    });

    return { ...output, days: validatedDays };
  }
);
