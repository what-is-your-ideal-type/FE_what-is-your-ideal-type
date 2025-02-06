import {
  signInWithPopup,
  getRedirectResult,
  GoogleAuthProvider,
} from 'firebase/auth';
import { auth } from '../../firebase';
import { FirebaseError } from 'firebase/app';
import { handleGuestPostMigration } from '../../components/utils/post-migration';

// export const loginWithGoogle = async () => {
//   const provider = new GoogleAuthProvider();
//   try {
//     await signInWithRedirect(auth, provider);
//   } catch (error) {
//     console.error("Error during Google login: ", error);
//   }
// };

// export const loginWithGoogle = async () => {
//   const provider = new GoogleAuthProvider();
//   try {
//     await signInWithRedirect(auth, provider);
//   } catch (error) {
//     console.error("Error during Google login: ", error);
//   }
// };

export const loginWithGoogle = async () => {
  const provider = new GoogleAuthProvider();
  try {
    const credential = await signInWithPopup(auth, provider);
    await handleGuestPostMigration(credential.user);
    return credential;
  } catch (error) {
    console.error('Error during Google login: ', error);
  }
};

export const handleRedirectResult = async () => {
  try {
    const result = await getRedirectResult(auth);
    console.log('Redirect result: ', result);
    if (result) {
      await handleGuestPostMigration(result.user);
      return result;
    }
    return null;
  } catch (error) {
    if (error instanceof FirebaseError) {
      const credential = GoogleAuthProvider.credentialFromError(error);
      console.error('Error during redirect result handling: ', error);
      return credential;
    } else {
      console.error('Unexpected error: ', error);
    }
  }
};
