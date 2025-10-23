import Link from 'next/link';
import { Dumbbell, LineChart, BookOpen, ArrowRight } from 'lucide-react';
import { NotificationButton } from '@/components/NotificationButton';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function Home() {
  const features = [
    {
      title: 'Workout Plan',
      description: 'Get a personalized workout plan based on your goals.',
      href: '/workout-plan',
      icon: Dumbbell,
    },
    {
      title: 'Progress Tracking',
      description: 'See your workout history and track your progress.',
      href: '/progress',
      icon: LineChart,
    },
    {
      title: 'Manual Workout',
      description: 'Browse exercises by muscle group.',
      href: '/manual',
      icon: BookOpen,
    },
  ];

  return (
    <div className="flex flex-col min-h-dvh bg-background text-foreground">
      <header className="p-4 sm:p-6 flex justify-between items-center">
        <div>
          <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight font-headline">
            FitTrack
          </h1>
          <p className="text-muted-foreground mt-2 text-lg">
            Your daily fitness companion.
          </p>
        </div>
      </header>
      <main className="flex-1 px-4 sm:px-6 py-8">
        <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-1 gap-6">
           {features.map((feature) => (
            <Link href={feature.href} key={feature.title} className="group">
              <Card className="h-full hover:bg-card-foreground/5 transition-all duration-300 ease-in-out transform hover:-translate-y-1 hover:shadow-xl border">
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle className="text-2xl font-bold">{feature.title}</CardTitle>
                  <feature.icon className="h-8 w-8 text-primary" />
                </CardHeader>
                <CardContent className="flex items-center justify-between">
                  <p className="text-muted-foreground max-w-[80%]">{feature.description}</p>
                   <ArrowRight className="w-6 h-6 text-muted-foreground group-hover:text-primary transition-colors" />
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </main>
      <footer className="py-6 px-4 text-center text-sm text-muted-foreground border-t">
        <NotificationButton />
        <p className="mt-4">Built for your fitness journey.</p>
      </footer>
    </div>
  );
}
