import { signOut } from "firebase/auth";
import { auth } from "../../firebase";

export const logout = async () => {
  try {
    if (confirm("로그아웃 하시겠습니까?")) {
      await signOut(auth);
      console.log("User logged out");
    }
  } catch (error) {
    console.error("Failed to logout with email: ", error);
  }
};
