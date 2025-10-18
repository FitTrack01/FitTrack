import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getExercisesByBodyPart } from '@/lib/data';
import { bodyParts, type BodyPart } from '@/lib/types';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowLeft, ChevronRight } from 'lucide-react';

type Props = {
  params: { bodyPart: string };
};

export function generateStaticParams() {
  return (bodyParts as readonly BodyPart[]).map((part) => ({
    bodyPart: part.toLowerCase(),
  }));
}

export default function ExerciseListPage({ params }: Props) {
  const bodyPart = params.bodyPart.charAt(0).toUpperCase() + params.bodyPart.slice(1);

  if (!bodyParts.includes(bodyPart as any)) {
    notFound();
  }

  const exercisesForPart = getExercisesByBodyPart(bodyPart as BodyPart);
  
  return (
    <div className="flex flex-col min-h-dvh bg-background">
      <header className="p-4 flex items-center gap-4 sticky top-0 bg-background/80 backdrop-blur-sm z-10 border-b">
        <Button asChild variant="outline" size="icon">
          <Link href="/" aria-label="Back to homepage">
            <ArrowLeft className="h-5 w-5" />
          </Link>
        </Button>
        <h1 className="text-2xl font-bold tracking-tight">{bodyPart} Exercises</h1>
      </header>
      <main className="flex-1 p-4">
        <div className="flex flex-col gap-3 max-w-4xl mx-auto">
          {exercisesForPart.map((exercise) => (
            <Link href={`/exercises/${params.bodyPart}/${exercise.id}`} key={exercise.id} className="group">
              <Card className="hover:bg-card-foreground/5 transition-colors duration-200 shadow-sm hover:shadow-md">
                <CardContent className="p-4 flex items-center justify-between">
                  <p className="font-semibold text-lg">{exercise.name}</p>
                  <ChevronRight className="w-6 h-6 text-muted-foreground group-hover:text-primary transition-colors" />
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </main>
    </div>
  );
}
