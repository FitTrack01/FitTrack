import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { WorkoutPlanForm } from './WorkoutPlanForm';

export default function WorkoutPlanPage() {
  return (
    <div className="flex flex-col min-h-dvh bg-background">
      <header className="p-4 sm:p-6 flex items-center gap-4 sticky top-0 bg-background/80 backdrop-blur-sm z-10 border-b">
        <Button asChild variant="outline" size="icon">
          <Link href="/" aria-label="Back to homepage">
            <ArrowLeft className="h-5 w-5" />
          </Link>
        </Button>
        <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-foreground font-headline">
          Create Workout Plan
        </h1>
      </header>
      <main className="flex-1 px-4 py-8">
        <div className="max-w-2xl mx-auto">
          <WorkoutPlanForm />
        </div>
      </main>
    </div>
  );
}
