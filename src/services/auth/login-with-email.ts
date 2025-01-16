import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase";

export const loginWithEmail = async (email: string, password: string) => {
  try {
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password,
    );
    return userCredential;
  } catch (error) {
    console.error("Failed to login with email: ", error);
  }
};
