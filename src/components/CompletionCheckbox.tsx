"use client";

import { useExerciseLog } from '@/hooks/use-exercise-log';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { Skeleton } from '@/components/ui/skeleton';
import { CheckCircle2, Circle } from 'lucide-react';

export function CompletionCheckbox({ exerciseId, exerciseName }: { exerciseId: string, exerciseName: string }) {
  const { isLoaded, isCompleted, toggleComplete } = useExerciseLog();

  const completed = isCompleted(exerciseId);

  if (!isLoaded) {
    return (
        <div className="flex items-center space-x-3 p-4 rounded-lg bg-card border">
            <Skeleton className="h-6 w-6 rounded-full" />
            <Skeleton className="h-5 w-[150px]" />
        </div>
    );
  }

  return (
    <div
      onClick={() => toggleComplete(exerciseId)}
      className={`flex items-center space-x-3 p-4 rounded-lg cursor-pointer transition-all duration-300 ${completed ? 'bg-primary/10 border-primary/50' : 'bg-card border'}`}
    >
        {completed ? (
            <CheckCircle2 className="h-6 w-6 text-primary" />
        ) : (
            <Circle className="h-6 w-6 text-muted-foreground" />
        )}
      <Label htmlFor={`complete-${exerciseId}`} className="text-lg font-medium cursor-pointer">
        Mark as Completed
      </Label>
       <Checkbox
        id={`complete-${exerciseId}`}
        checked={completed}
        onCheckedChange={() => toggleComplete(exerciseId)}
        aria-label={`Mark ${exerciseName} as complete`}
        className="sr-only"
      />
    </div>
  );
}
