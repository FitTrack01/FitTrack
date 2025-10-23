import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { CompletedExercises } from '@/components/CompletedExercises';
import { TrackingHistory } from '@/components/TrackingHistory';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

export default function ProgressPage() {
  return (
    <div className="flex flex-col min-h-dvh bg-background">
      <header className="p-4 sm:p-6 flex items-center gap-4 sticky top-0 bg-background/80 backdrop-blur-sm z-10 border-b">
        <Button asChild variant="outline" size="icon">
          <Link href="/" aria-label="Back to homepage">
            <ArrowLeft className="h-5 w-5" />
          </Link>
        </Button>
        <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-foreground font-headline">
          Progress Tracking
        </h1>
      </header>
      <main className="flex-1 px-4 py-8">
        <Tabs defaultValue="today" className="w-full max-w-4xl mx-auto">
          <TabsList className="grid w-full grid-cols-2 mb-6 bg-secondary p-2 h-auto rounded-full">
            <TabsTrigger value="today" className="text-base py-2.5 rounded-full data-[state=active]:bg-primary data-[state=active]:text-primary-foreground data-[state=active]:shadow-lg">Today's Completion</TabsTrigger>
            <TabsTrigger value="history" className="text-base py-2.5 rounded-full data-[state=active]:bg-primary data-[state=active]:text-primary-foreground data-[state=active]:shadow-lg">Full History</TabsTrigger>
          </TabsList>
          
          <TabsContent value="today">
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
    </div>
  );
}
