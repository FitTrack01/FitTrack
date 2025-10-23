"use client";

import { useExerciseLog } from "@/hooks/use-exercise-log";
import { exercises } from "@/lib/data";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
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
            <CardHeader>
                <CardTitle>Today's Progress</CardTitle>
            </CardHeader>
            <CardContent>
                <p className="text-muted-foreground">Loading your progress...</p>
            </CardContent>
        </Card>
    );
  }

  if (completedToday.length === 0) {
    return (
        <Card>
            <CardHeader>
                 <CardTitle>Today's Progress</CardTitle>
                 <CardDescription>Completed exercises will appear here.</CardDescription>
            </CardHeader>
            <CardContent className="text-center py-10">
                <p className="text-muted-foreground">You haven't completed any exercises today.</p>
                <p className="text-muted-foreground text-sm mt-2">Get started by browsing the manual workout section!</p>
            </CardContent>
        </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Today's Progress</CardTitle>
        <CardDescription>Great job! Here's what you've accomplished today.</CardDescription>
      </CardHeader>
      <CardContent>
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
