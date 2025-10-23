'use client';

import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { getWorkoutPlan } from '@/ai/flows/get-workout-plan';
import type { WorkoutPlan } from '@/ai/flows/get-workout-plan';
import { useWorkoutPlan } from '@/hooks/use-workout-plan';
import { Loader2, ArrowRight } from 'lucide-react';
import Link from 'next/link';

const formSchema = z.object({
  height: z.coerce.number().positive('Height must be a positive number.'),
  weight: z.coerce.number().positive('Weight must be a positive number.'),
  unit: z.enum(['metric', 'imperial']),
  goal: z.enum(['lose_weight', 'build_muscle', 'improve_fitness']),
});

type FormValues = z.infer<typeof formSchema>;

export function WorkoutPlanForm() {
  const {
    activePlan,
    isLoaded,
    savePlan,
    clearPlan,
    currentDayIndex,
  } = useWorkoutPlan();

  const [bmi, setBmi] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      height: '' as any,
      weight: '' as any,
      unit: 'metric',
      goal: 'improve_fitness',
    },
  });

  const unit = form.watch('unit');

  async function onSubmit(values: FormValues) {
    setIsLoading(true);
    setError(null);

    let calculatedBmi;
    if (values.unit === 'metric') {
      calculatedBmi = values.weight / (values.height / 100) ** 2;
    } else {
      calculatedBmi = (values.weight / values.height ** 2) * 703;
    }
    setBmi(calculatedBmi);
    
    try {
      const plan = await getWorkoutPlan({
        bmi: calculatedBmi,
        goal: values.goal,
      });
      savePlan(plan);
    } catch (e) {
      console.error(e);
      setError('Sorry, I was unable to generate a workout plan. Please try again.');
    } finally {
      setIsLoading(false);
    }
  }

  const handleStopPlan = () => {
    clearPlan();
  };

  if (!isLoaded) {
    return (
      <Card>
        <CardContent className="p-6">
          <div className="flex items-center justify-center">
            <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
          </div>
        </CardContent>
      </Card>
    );
  }

  if (activePlan) {
    const currentDayWorkout = activePlan.days[currentDayIndex % activePlan.days.length];
    const dayNumber = (currentDayIndex % activePlan.days.length) + 1;

    return (
       <Card>
        <CardHeader>
          <CardTitle>Your Active Workout Plan</CardTitle>
          <CardDescription>{activePlan.summary}</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div>
            <h3 className="font-bold text-xl mb-4">{`Day ${dayNumber}: ${currentDayWorkout.day}`}</h3>
            <ul className="space-y-2">
              {currentDayWorkout.exercises.map((ex) => (
                <li key={ex.id} className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                   <div className="flex-1">
                      <p className="font-semibold text-lg">{ex.name}</p>
                      <p className="text-sm text-muted-foreground">{ex.sets} sets of {ex.reps} reps</p>
                   </div>
                   <Button asChild variant="ghost" size="icon">
                      <Link href={`/exercises/${ex.bodyPart.toLowerCase()}/${ex.id}`}>
                        <ArrowRight className="h-5 w-5" />
                        <span className="sr-only">View Exercise</span>
                      </Link>
                   </Button>
                </li>
              ))}
            </ul>
          </div>
          <div className="border-t pt-6 flex flex-col sm:flex-row gap-2">
             <Button onClick={handleStopPlan} variant="destructive" className="w-full">
               Stop Workout Plan
             </Button>
             <Button onClick={handleStopPlan} variant="outline" className="w-full">
               Change Workout Plan
             </Button>
          </div>
        </CardContent>
      </Card>
    );
  }


  return (
    <div className="space-y-8">
      <Card>
        <CardHeader>
          <CardTitle>Your Information</CardTitle>
          <CardDescription>Tell us about yourself to generate a personalized workout plan.</CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
               <FormField
                control={form.control}
                name="unit"
                render={({ field }) => (
                  <FormItem className="space-y-3">
                    <FormLabel>Units</FormLabel>
                    <FormControl>
                      <RadioGroup
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                        className="flex space-x-4"
                      >
                        <FormItem className="flex items-center space-x-2 space-y-0">
                          <FormControl>
                            <RadioGroupItem value="metric" />
                          </FormControl>
                          <FormLabel className="font-normal">Metric (cm/kg)</FormLabel>
                        </FormItem>
                        <FormItem className="flex items-center space-x-2 space-y-0">
                          <FormControl>
                            <RadioGroupItem value="imperial" />
                          </FormControl>
                          <FormLabel className="font-normal">Imperial (in/lbs)</FormLabel>
                        </FormItem>
                      </RadioGroup>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="height"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Height ({unit === 'metric' ? 'cm' : 'in'})</FormLabel>
                      <FormControl>
                        <Input type="number" placeholder="e.g., 180" {...field} value={field.value ?? ''} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="weight"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Weight ({unit === 'metric' ? 'kg' : 'lbs'})</FormLabel>
                      <FormControl>
                        <Input type="number" placeholder="e.g., 75" {...field} value={field.value ?? ''} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

               <FormField
                control={form.control}
                name="goal"
                render={({ field }) => (
                  <FormItem className="space-y-3">
                    <FormLabel>What is your primary fitness goal?</FormLabel>
                    <FormControl>
                      <RadioGroup
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                        className="flex flex-col space-y-2"
                      >
                        <FormItem className="flex items-center space-x-3 space-y-0">
                          <FormControl>
                            <RadioGroupItem value="lose_weight" />
                          </FormControl>
                          <FormLabel className="font-normal">Lose Weight</FormLabel>
                        </FormItem>
                        <FormItem className="flex items-center space-x-3 space-y-0">
                          <FormControl>
                            <RadioGroupItem value="build_muscle" />
                          </FormControl>
                          <FormLabel className="font-normal">Build Muscle</FormLabel>
                        </FormItem>
                        <FormItem className="flex items-center space-x-3 space-y-0">
                          <FormControl>
                            <RadioGroupItem value="improve_fitness" />
                          </FormControl>
                          <FormLabel className="font-normal">Improve General Fitness</FormLabel>
                        </FormItem>
                      </RadioGroup>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <Button type="submit" disabled={isLoading} className="w-full">
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Generating Plan...
                  </>
                ) : (
                  'Generate Workout Plan'
                )}
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>

      {error && (
        <Card className="border-destructive">
          <CardHeader>
            <CardTitle className="text-destructive">Error</CardTitle>
          </CardHeader>
          <CardContent>
            <p>{error}</p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
