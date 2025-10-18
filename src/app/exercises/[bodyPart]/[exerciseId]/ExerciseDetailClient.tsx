"use client";

import Link from 'next/link';
import Image from 'next/image';
import type { Exercise } from '@/lib/types';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { ArrowLeft, Check, PlayCircle } from 'lucide-react';
import { CompletionCheckbox } from '@/components/CompletionCheckbox';
import { ReelsCarousel } from '@/components/ReelsCarousel';
import { Separator } from '@/components/ui/separator';

export function ExerciseDetailClient({ exercise }: { exercise: Exercise }) {
  const videoPlaceholder = PlaceHolderImages.find(img => img.id === 'video-placeholder');
  
  return (
    <div className="flex flex-col min-h-dvh bg-background">
      <header className="p-4 flex items-center gap-4 sticky top-0 bg-background/80 backdrop-blur-sm z-10 border-b">
        <Button asChild variant="outline" size="icon">
          <Link href={`/exercises/${exercise.bodyPart.toLowerCase()}`} aria-label={`Back to ${exercise.bodyPart} exercises`}>
            <ArrowLeft className="h-5 w-5" />
          </Link>
        </Button>
        <h1 className="text-2xl font-bold tracking-tight truncate">{exercise.name}</h1>
      </header>

      <main className="flex-1">
        <div className="max-w-4xl mx-auto p-4 space-y-8">
          
          <section aria-labelledby="video-instruction">
            <h2 id="video-instruction" className="sr-only">Video Instruction</h2>
            <Card className="overflow-hidden shadow-lg">
              <CardContent className="p-0 aspect-video relative flex items-center justify-center bg-black">
                {videoPlaceholder && (
                  <Image 
                    src={videoPlaceholder.imageUrl} 
                    alt="Video placeholder"
                    fill
                    style={{objectFit: 'cover'}}
                    className="opacity-50"
                    data-ai-hint={videoPlaceholder.imageHint}
                  />
                )}
                <PlayCircle className="h-20 w-20 text-white/70 absolute" />
                <div className="absolute bottom-4 left-4 bg-black/50 text-white px-3 py-1 rounded-md">
                    <p>Video instructions coming soon</p>
                </div>
              </CardContent>
            </Card>
          </section>

          <section aria-labelledby="exercise-tracking">
            <h2 id="exercise-tracking" className="sr-only">Track Exercise Completion</h2>
            <CompletionCheckbox exerciseId={exercise.id} exerciseName={exercise.name} />
          </section>

          <Separator />
          
          <section aria-labelledby="step-by-step-instructions">
            <h2 id="step-by-step-instructions" className="text-2xl font-semibold mb-4">Instructions</h2>
            <ul className="space-y-3">
              {exercise.instructions.map((step, index) => (
                <li key={index} className="flex items-start gap-3">
                  <div className="flex-shrink-0 w-6 h-6 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold text-sm">
                    {index + 1}
                  </div>
                  <p className="text-lg text-foreground/90 mt-px">{step}</p>
                </li>
              ))}
            </ul>
          </section>

          <Separator />
          
          <section aria-labelledby="visual-guides">
             <h2 id="visual-guides" className="sr-only">Visual Guides from Instagram</h2>
             <ReelsCarousel reelUrls={exercise.reelUrls} />
          </section>

        </div>
      </main>
    </div>
  );
}
