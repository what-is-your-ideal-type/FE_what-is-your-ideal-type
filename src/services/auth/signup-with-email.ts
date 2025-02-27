import { auth, db } from '../../firebase';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';

export const signUpWithEmail = async (email: string, password: string) => {
  const userCredential = await createUserWithEmailAndPassword(
    auth,
    email,
    password,
  );
  const user = userCredential.user;
  return user;
};

export const saveUserInfo = async (
  uid: string,
  email: string,
  nickname: string,
) => {
  await setDoc(doc(db, 'users', uid), { uid, email, nickname });
};
