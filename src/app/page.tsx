import Link from 'next/link';
import { bodyParts, type BodyPart } from '@/lib/types';
import { getIconForBodyPart } from '@/components/icons';
import { ArrowRight } from 'lucide-react';
import { NotificationButton } from '@/components/NotificationButton';
import { CompletedExercises } from '@/components/CompletedExercises';
import { TrackingHistory } from '@/components/TrackingHistory';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

export default function Home() {
  return (
    <div className="flex flex-col min-h-dvh bg-background">
      <header className="p-4 sm:p-6 flex justify-between items-center">
        <div>
          <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-foreground font-headline">
            FitTrack
          </h1>
          <p className="text-muted-foreground mt-2 text-lg">
            Your daily fitness companion.
          </p>
        </div>
      </header>
      <main className="flex-1 px-4 space-y-8">
        <Tabs defaultValue="exercises" className="w-full max-w-2xl mx-auto">
          <TabsList className="grid w-full grid-cols-3 mb-6 bg-secondary p-2 h-auto rounded-full">
            <TabsTrigger value="exercises" className="text-base py-2.5 rounded-full data-[state=active]:bg-primary data-[state=active]:text-primary-foreground data-[state=active]:shadow-lg">Exercises to do</TabsTrigger>
            <TabsTrigger value="completed" className="text-base py-2.5 rounded-full data-[state=active]:bg-primary data-[state=active]:text-primary-foreground data-[state=active]:shadow-lg">Completed</TabsTrigger>
            <TabsTrigger value="history" className="text-base py-2.5 rounded-full data-[state=active]:bg-primary data-[state=active]:text-primary-foreground data-[state=active]:shadow-lg">History</TabsTrigger>
          </TabsList>
          <TabsContent value="exercises">
            <section id="exercises-to-do">
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
          </TabsContent>
          <TabsContent value="completed">
            <section id="completed-exercises" className="pb-6">
                <CompletedExercises />
            </section>
          </TabsContent>
          <TabsContent value="history">
            <section id="tracking-history" className="pb-12">
                <TrackingHistory />
            </section>
          </TabsContent>
        </Tabs>
      </main>
      <footer className="py-6 px-4 text-center text-sm text-muted-foreground border-t">
        <NotificationButton />
        <p className="mt-4">Built for your fitness journey.</p>
      </footer>
    </div>
  );
}
