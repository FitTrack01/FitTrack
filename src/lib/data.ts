import type { Exercise, BodyPart } from '@/lib/types';

export const exercises: Exercise[] = [
  {
    id: 'push-up',
    name: 'Push Up',
    bodyPart: 'Chest',
    sets: 3,
    reps: '15-20',
    instructions: [
      'Get down on all fours, placing your hands slightly wider than your shoulders.',
      'Straighten your arms and legs.',
      'Lower your body until your chest nearly touches the floor.',
      'Push yourself back up.',
      'Repeat for the desired number of repetitions.',
    ],
    reelUrls: ['https://www.instagram.com/reel/C2M0X4_xN9j/', 'https://www.instagram.com/reel/C6i3eJdIUXA/'],
    image: 'push-up-image',
    videoUrl: 'https://ik.imagekit.io/x6cjipsih/Push%20up%20best%20exercises%203d%20animation%20video%20idea%20_%20_workout%20_excercise%20_gym%20_fitness%20_reels%20_inst.mp4?updatedAt=1760782082699',
  },
  {
    id: 'bench-press',
    name: 'Bench Press',
    bodyPart: 'Chest',
    sets: 4,
    reps: '8-12',
    instructions: [
      'Lie flat on a bench with your feet firmly on the ground.',
      'Grip the barbell with hands slightly wider than shoulder-width apart.',
      'Unrack the barbell and hold it straight over your chest.',
      'Lower the bar to your mid-chest.',
      'Push the bar back up until your arms are fully extended.',
    ],
    reelUrls: ['https://www.instagram.com/reel/DLEARYSTG0_/?igsh=MTl1eWJqOHBzb2h6MQ==', 'https://www.instagram.com/reel/C5y4eXzSAmE/'],
    image: 'bench-press-image',
    videoUrl: 'https://ik.imagekit.io/x6cjipsih/_gym%20_fitness%20_workout%20_excercise%20_instagood%20_instagram%20_viral%20_reels%20_instagym%20_motivation.mp4?updatedAt=1760781858219',
  },
  {
    id: 'lat-pulldown',
    name: 'Lat Pulldown',
    bodyPart: 'Back',
    sets: 3,
    reps: '10-12',
    instructions: [
      'Sit down on the lat pulldown machine and secure your knees under the pads.',
      'Grasp the bar with a wide grip, palms facing forward.',
      'Lean back slightly and pull the bar down to your upper chest, squeezing your back muscles.',
      'Slowly return the bar to the starting position with controlled movement.',
      'Repeat for the desired number of repetitions.',
    ],
    reelUrls: ['https://www.instagram.com/reel/C3t_oJ3SBrF/', 'https://www.instagram.com/reel/C6f5eP2S2b1/'],
    image: 'lat-pulldown-image',
    videoUrl: 'https://ik.imagekit.io/x6cjipsih/_gym%20_workout%20_excercise%20_.mp4?updatedAt=1760787280917',
  },
  {
    id: 'squat',
    name: 'Squat',
    bodyPart: 'Legs',
    sets: 4,
    reps: '10-12',
    instructions: [
        'Stand with your feet shoulder-width apart.',
        'Keep your chest up and core engaged.',
        'Lower your hips as if sitting in a chair.',
        'Go as low as you can while keeping your heels on the ground.',
        'Push through your heels to return to the starting position.',
    ],
    reelUrls: ['https://www.instagram.com/reel/C5_soA4S0yF/', 'https://www.instagram.com/reel/C6O-gD6S-yP/'],
    image: 'squat-image',
    videoUrl: 'https://ik.imagekit.io/x6cjipsih/Exersise%20for%20bigner_gym%20_fitness%20_workout%20_instagram%20_instagood%20_excercise%E2%80%8C%20_viral%20_reels%20_motiva.mp4?updatedAt=1760787404453',
  },
   {
    id: 'deadlift',
    name: 'Deadlift',
    bodyPart: 'Back',
    sets: 4,
    reps: '5-8',
    instructions: [
        'Stand with your mid-foot under the barbell.',
        'Bend over and grab the bar with a shoulder-width grip.',
        'Bend your knees until your shins touch the bar.',
        'Lift your chest up and straighten your lower back.',
        'Take a big breath, hold it, and stand up with the weight.',
        'Return the weight to the floor by moving your hips back first, then bending your knees.'
    ],
    reelUrls: ['https://www.instagram.com/reel/C6a_oX9SeG_/', 'https://www.instagram.com/reel/C5p4f_mSg-d/'],
    image: 'deadlift-image',
    videoUrl: 'https://ik.imagekit.io/x6cjipsih/IS%20YOUR%20BACK%20NOT%20GROWING%20Master%20the%20deadlift%20with%20proper%20form%20to%20build%20strength,%20power,%20and%20musc.mp4?updatedAt=1760788216325',
  },
  {
    id: 'bicep-curl',
    name: 'Bicep Curl',
    bodyPart: 'Arms',
    sets: 3,
    reps: '10-15',
    instructions: [
        'Stand or sit holding a dumbbell in each hand with an underhand grip.',
        'Keep your elbows close to your torso.',
        'Curl the weights toward your shoulders, squeezing your biceps.',
        'Slowly lower the weights back to the starting position.',
        'Repeat.',
    ],
    reelUrls: ['https://www.instagram.com/reel/C2s4Z_fLqG0/', 'https://www.instagram.com/reel/C6QW_R_rT_m/'],
    image: 'bicep-curl-image',
    videoUrl: 'https://ik.imagekit.io/x6cjipsih/Master%20bicep%20curls%20technique%20to%20unlock%20peak%20gainsFOLLOW%20FOR%20MKRE%20TUTORIALS!!!_workouts%20_workout%20.mp4?updatedAt=1760788578793',
  },
  {
    id: 'abdominal-training',
    name: 'Abdominal Training',
    bodyPart: 'Core',
    sets: 3,
    reps: '15-20',
    instructions: [
        'Lie on your back with your legs straight and together.',
        'Keep your arms straight above your head on the floor.',
        'In one movement, lift your legs and torso to a V-shape.',
        'Lower back down with control.',
        'Repeat for the desired number of repetitions.',
    ],
    reelUrls: [],
    image: 'abdominal-training-image',
    videoUrl: 'https://ik.imagekit.io/x6cjipsih/_sixpack%20_excercise%20_workout%20_gym%20_viral%20_instagram%20_fitness%20_instagood%20_viral%20_motivation%20_inst.mp4?updatedAt=1760787788895',
  },
  {
    id: 'shoulder-press',
    name: 'Shoulder Press',
    bodyPart: 'Shoulders',
    sets: 4,
    reps: '8-10',
    instructions: [
        'Stand with the barbell on your front shoulders, hands slightly wider than shoulder-width.',
        'Press the bar overhead until your arms are fully extended.',
        'Keep your core tight and avoid arching your back.',
        'Slowly lower the bar back to your shoulders.',
        'Repeat.',
    ],
    reelUrls: ['https://www.instagram.com/reel/C39eN0eLd9d/', 'https://www.instagram.com/reel/C4Xg3h_ruJd/'],
    image: 'shoulder-press-image',
    videoUrl: 'https://ik.imagekit.io/x6cjipsih/_Smith%20Shoulder%20Press-%20Are%20You%20Doing%20This%20Correctly__.mp4?updatedAt=1760788880414',
  },
];

export function getExercisesByBodyPart(bodyPart: BodyPart): Exercise[] {
  return exercises.filter((exercise) => exercise.bodyPart === bodyPart);
}

export function getExerciseById(id: string): Exercise | undefined {
  return exercises.find((exercise) => exercise.id === id);
}
