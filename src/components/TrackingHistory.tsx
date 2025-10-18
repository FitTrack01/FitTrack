"use client";

import { useExerciseLog } from "@/hooks/use-exercise-log";
import { exercises } from "@/lib/data";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { format, parseISO, compareDesc } from "date-fns";

export function TrackingHistory() {
  const { isLoaded, log } = useExerciseLog();

  const completedExercises = Object.entries(log)
    .map(([exerciseId, isoDate]) => {
      const exercise = exercises.find(ex => ex.id === exerciseId);
      return exercise ? { ...exercise, completedAt: parseISO(isoDate) } : null;
    })
    .filter(Boolean)
    .sort((a, b) => compareDesc(a!.completedAt, b!.completedAt));
    
  if (!isLoaded) {
    return (
      <Card>
        <CardContent className="p-6">
          <p className="text-muted-foreground">Loading history...</p>
        </CardContent>
      </Card>
    );
  }

  if (completedExercises.length === 0) {
    return (
      <Card>
        <CardContent className="p-6 text-center">
          <p className="text-muted-foreground">No completed exercises yet.</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Your Activity</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {completedExercises.map((exercise) => (
            exercise && (
                 <div key={`${exercise.id}-${exercise.completedAt.toISOString()}`} className="flex items-center justify-between p-4 bg-muted/50 rounded-lg">
                    <div>
                        <p className="font-semibold">{exercise.name}</p>
                        <p className="text-sm text-muted-foreground">{exercise.bodyPart}</p>
                    </div>
                    <p className="text-sm text-muted-foreground">
                        {format(exercise.completedAt, "MMM d, yyyy")}
                    </p>
                </div>
            )
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
