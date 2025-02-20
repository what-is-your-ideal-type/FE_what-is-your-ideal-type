import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../firebase';
import { handleGuestPostMigration } from '../../components/utils/post-migration';

export const loginWithEmail = async (email: string, password: string) => {
  try {
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password,
    );
    await handleGuestPostMigration(userCredential.user);
    return userCredential;
  } catch (error) {
    alert('이메일 혹은 비밀번호가 올바르지 않습니다.');
    return;
  }
};
