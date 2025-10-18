"use client";

import { useExerciseLog } from "@/hooks/use-exercise-log";
import { exercises } from "@/lib/data";
import { Card, CardContent } from "@/components/ui/card";
import Link from "next/link";
import { CheckCircle2 } from "lucide-react";
import { isToday } from "date-fns";

export function CompletedExercises() {
  const { isLoaded, log } = useExerciseLog();

  const completedToday = exercises.filter(ex => {
    const completionDate = log[ex.id];
    return completionDate && isToday(new Date(completionDate));
  });

  if (!isLoaded) {
    return (
        <Card>
            <CardContent className="p-6">
                <p className="text-muted-foreground">Loading your progress...</p>
            </CardContent>
        </Card>
    );
  }

  if (completedToday.length === 0) {
    return (
        <Card>
            <CardContent className="p-6 text-center">
                <p className="text-muted-foreground">You haven't completed any exercises today.</p>
                <p className="text-muted-foreground text-sm">Get started by picking an exercise from the list above!</p>
            </CardContent>
        </Card>
    );
  }

  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex flex-col gap-4">
          {completedToday.map((exercise) => (
            <Link href={`/exercises/${exercise.bodyPart.toLowerCase()}/${exercise.id}`} key={exercise.id} className="group">
                <div className="flex items-center justify-between p-4 bg-card rounded-lg border hover:bg-muted/50 transition-colors">
                    <div className="flex items-center gap-4">
                        <CheckCircle2 className="w-6 h-6 text-green-500" />
                        <div>
                            <p className="font-semibold">{exercise.name}</p>
                            <p className="text-sm text-muted-foreground">{exercise.bodyPart}</p>
                        </div>
                    </div>
                </div>
            </Link>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
