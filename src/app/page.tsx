import Link from 'next/link';
import { bodyParts, type BodyPart } from '@/lib/types';
import { getIconForBodyPart } from '@/components/icons';
import { ArrowRight } from 'lucide-react';
import { NotificationButton } from '@/components/NotificationButton';
import { ExerciseTracking } from '@/components/ExerciseTracking';
import { Separator } from '@/components/ui/separator';

export default function Home() {
  return (
    <div className="flex flex-col min-h-dvh bg-background">
      <header className="p-4 sm:p-6">
        <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tighter text-primary font-headline">
          FitTrack
        </h1>
        <p className="text-muted-foreground mt-2 text-lg">
          Your daily fitness companion.
        </p>
      </header>
      <main className="flex-1 px-4 space-y-12">
        <section id="exercises-to-do">
          <h2 className="text-3xl font-bold tracking-tight mb-6">Exercises to do</h2>
          <div className="w-full max-w-2xl mx-auto">
            <div className="flex flex-col gap-4">
              {(bodyParts as readonly BodyPart[]).map((part) => {
                const Icon = getIconForBodyPart(part);
                return (
                  <Link
                    href={`/exercises/${part.toLowerCase()}`}
                    key={part}
                    className="group w-full"
                    aria-label={`View exercises for ${part}`}
                  >
                    <div className="flex items-center justify-between w-full p-6 bg-card rounded-lg shadow-sm border-2 border-card hover:border-primary hover:shadow-lg transition-all duration-300 ease-in-out transform hover:-translate-y-1">
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
          </div>
        </section>

        <Separator />
        
        <section id="exercise-tracking" className="pb-12">
          <h2 className="text-3xl font-bold tracking-tight mb-6">Exercise Tracking</h2>
          <div className="w-full max-w-2xl mx-auto">
            <ExerciseTracking />
          </div>
        </section>

      </main>
      <footer className="py-6 px-4 text-center text-sm text-muted-foreground border-t">
        <NotificationButton />
        <p className="mt-4">Built for your fitness journey.</p>
      </footer>
    </div>
  );
}
