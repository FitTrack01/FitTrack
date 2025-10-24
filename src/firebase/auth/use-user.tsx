'use client';

import { useFirebase } from '@/firebase/provider';

// This is a re-export of the useUser hook from provider.tsx.
// It is kept for structural consistency with use-collection and use-doc.
export { useUser } from '@/firebase/provider';
