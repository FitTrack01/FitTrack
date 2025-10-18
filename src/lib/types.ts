export const bodyParts = ['Chest', 'Back', 'Legs', 'Arms', 'Core', 'Shoulders'] as const;
export type BodyPart = typeof bodyParts[number];

export type Exercise = {
  id: string;
  name: string;
  bodyPart: BodyPart;
  instructions: string[];
  reelUrls: string[];
  image: string;
  videoUrl?: string;
  sets: number;
  reps: string;
};
