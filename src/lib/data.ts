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
    id: 'pull-up',
    name: 'Pull Up',
    bodyPart: 'Back',
    sets: 3,
    reps: '6-10',
    instructions: [
      'Grab the pull-up bar with your palms facing away from you.',
      'Hang from the bar with your arms fully extended.',
      'Pull your body up until your chin is above the bar.',
      'Lower your body back down to the starting position.',
      'Repeat.',
    ],
    reelUrls: ['https://www.instagram.com/reel/C3bO4k_IE8A/', 'https://www.instagram.com/reel/C4p_3iYyUTp/'],
    image: 'pull-up-image',
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
    videoUrl: 'https://ik.imagekit.io/x6cjipsih/Exersise%20for%20bigner_gym%20_fitness%20_workout%20_instagram%20_instagood%20_excercise%20_viral%20_reels%20_motiva.mp4?updatedAt=1760787404453',
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
  },
  {
    id: 'overhead-press',
    name: 'Overhead Press',
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
    image: 'overhead-press-image',
  },
];

export function getExercisesByBodyPart(bodyPart: BodyPart): Exercise[] {
  return exercises.filter((exercise) => exercise.bodyPart === bodyPart);
}

export function getExerciseById(id: string): Exercise | undefined {
  return exercises.find((exercise) => exercise.id === id);
}
