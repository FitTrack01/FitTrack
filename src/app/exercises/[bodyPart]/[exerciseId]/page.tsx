import { getExerciseById, exercises as allExercises } from '@/lib/data';
import { notFound } from 'next/navigation';
import { ExerciseDetailClient } from './ExerciseDetailClient';
import type { Metadata } from 'next';
import type { BodyPart } from '@/lib/types';

type Props = {
  params: { bodyPart: string, exerciseId: string };
};

export function generateMetadata({ params }: Props): Metadata {
  const exercise = getExerciseById(params.exerciseId);
  const title = exercise ? `${exercise.name} | FitTrack` : 'FitTrack';

  return {
    title,
    description: `Instructions and videos for ${exercise?.name}.`,
  };
}

export function generateStaticParams() {
    return allExercises.map(exercise => ({
        bodyPart: exercise.bodyPart.toLowerCase(),
        exerciseId: exercise.id,
    }));
}

export default function ExerciseDetailPage({ params }: Props) {
  const exercise = getExerciseById(params.exerciseId);

  // Validate that the exercise exists and belongs to the correct body part category from the URL
  if (!exercise || exercise.bodyPart.toLowerCase() !== params.bodyPart.toLowerCase()) {
    notFound();
  }
  
  return <ExerciseDetailClient exercise={exercise} />;
}
