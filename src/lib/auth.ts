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
    // Only log detailed error if it's a Firebase error with expected properties
    if (error.code && error.message) {
      const errorCode = error.code;
      const errorMessage = error.message;
      // The email of the user's account used.
      const email = error.customData?.email;
      // The AuthCredential type that was used.
      const credential = GoogleAuthProvider.credentialFromError(error);
      console.error("Google Sign-In Error:", { errorCode, errorMessage, email, credential });
    } else {
      // Log a generic error if the error object is not as expected,
      // which can happen if the popup is closed by the user.
      console.error("An unexpected error occurred during Google Sign-In.", error);
    }
    // Re-throw the error to be handled by the calling component
    throw error;
  }
}
