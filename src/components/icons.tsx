import type { BodyPart } from '@/lib/types';
import { Dumbbell, Footprints, Heart, Shield, User, Zap } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

export const BodyPartIcons: Record<BodyPart, LucideIcon> = {
  Arms: Dumbbell,
  Legs: Footprints,
  Core: Shield,
  Chest: Heart,
  Back: User,
  Shoulders: Zap,
};

export const getIconForBodyPart = (bodyPart: BodyPart): LucideIcon => {
  return BodyPartIcons[bodyPart];
};
