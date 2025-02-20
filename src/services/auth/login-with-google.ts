import {
  signInWithPopup,
  getRedirectResult,
  GoogleAuthProvider,
} from 'firebase/auth';
import { auth, db, USERS_COLLECTION } from '../../firebase';
import { FirebaseError } from 'firebase/app';
import { handleGuestPostMigration } from '../../components/utils/post-migration';
import { doc, getDoc } from 'firebase/firestore';
import { saveUserInfo } from './signup-with-email';

export const loginWithGoogle = async () => {
  const provider = new GoogleAuthProvider();
  try {
    const credential = await signInWithPopup(auth, provider);
    const user = credential?.user;
    const uid = user?.uid;
    const email = user?.email as string;

    // Firestore에서 uid로 유저 문서 확인
    const userDocRef = doc(USERS_COLLECTION, uid);
    const userDoc = await getDoc(userDocRef);

    if (!userDoc.exists()) {
      // 문서가 존재하지 않으면, 새로운 유저 -> 저장
      await saveUserInfo(uid, email);
      console.log('신규 유저 저장 완료');
    } else {
      // 이미 있는 유저 → 저장 안 함
      console.log('기존 유저, 저장 생략');
    }

    await handleGuestPostMigration(user);
    return credential;
  } catch (error) {
    console.error('Error during Google login: ', error);
  }
};

export const handleRedirectResult = async () => {
  try {
    const result = await getRedirectResult(auth);
    if (result) {
      await handleGuestPostMigration(result.user);
      console.log('getRedirectResult result: ', result);
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
