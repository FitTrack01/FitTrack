'use client';

import { Auth, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';

const provider = new GoogleAuthProvider();

export async function signInWithGoogle(auth: Auth) {
  try {
    const result = await signInWithPopup(auth, provider);
    // This gives you a Google Access Token. You can use it to access the Google API.
    const credential = GoogleAuthProvider.credentialFromResult(result);
    const token = credential?.accessToken;
    // The signed-in user info.
    const user = result.user;
    return { user, token };
  } catch (error: any) {
    // This block handles various sign-in errors, including when the user closes the popup.
    // Logging the entire error is safer than assuming a specific structure.
    console.error("An error occurred during Google Sign-In:", error);
    
    // Re-throw the error to allow the calling component to handle the UI state if needed.
    throw error;
  }
}
