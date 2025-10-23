import Link from 'next/link';
import { bodyParts, type BodyPart } from '@/lib/types';
import { getIconForBodyPart } from '@/components/icons';
import { ArrowRight, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function ManualWorkoutPage() {
  return (
    <div className="flex flex-col min-h-dvh bg-background">
      <header className="p-4 sm:p-6 flex items-center gap-4 sticky top-0 bg-background/80 backdrop-blur-sm z-10 border-b">
        <Button asChild variant="outline" size="icon">
          <Link href="/" aria-label="Back to homepage">
            <ArrowLeft className="h-5 w-5" />
          </Link>
        </Button>
        <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-foreground font-headline">
          Manual Workout
        </h1>
      </header>
      <main className="flex-1 px-4 py-8 space-y-8">
        <section id="exercises-by-body-part">
           <div className="max-w-4xl mx-auto flex flex-col gap-4">
            {(bodyParts as readonly BodyPart[]).map((part) => {
              const Icon = getIconForBodyPart(part);
              return (
                <Link
                  href={`/exercises/${part.toLowerCase()}`}
                  key={part}
                  className="group w-full"
                  aria-label={`View exercises for ${part}`}
                >
                  <div className="flex items-center justify-between w-full p-6 bg-card rounded-xl shadow-sm border border-border hover:border-primary hover:shadow-lg transition-all duration-300 ease-in-out transform hover:-translate-y-1">
                    <div className="flex items-center gap-4">
                      {Icon && <Icon className="w-8 h-8 sm:w-10 sm:h-10 text-primary" />}
                      <span className="text-xl sm:text-2xl font-semibold">{part}</span>
                    </div>
                    <ArrowRight className="w-6 h-6 sm:w-8 sm:h-8 text-muted-foreground group-hover:text-primary transition-colors" />
                  </div>
                </Link>
              );
            })}
          </div>
        </section>
      </main>
    </div>
  );
}
