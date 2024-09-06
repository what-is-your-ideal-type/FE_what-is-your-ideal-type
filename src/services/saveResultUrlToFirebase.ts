import { User } from "firebase/auth";
import { db, IMAGES_COLLECTION } from "../firebase";
import { doc, updateDoc } from "firebase/firestore";

interface SaveResultUrlParams {
  user: User | null;
  imageDocId: string | null;
  resultUrl: string | null;
}

export const saveResultUrlToFirebase = async ({
  user,
  imageDocId,
  resultUrl,
}: SaveResultUrlParams) => {
  try {
    if (!user)
      throw new Error("User not authenticated. Cannot update result URL.");
    if (!imageDocId) throw new Error("Image document ID is required.");

    const imagesCollectionRef = IMAGES_COLLECTION(user.uid);
    const imageDocRef = doc(imagesCollectionRef, imageDocId);

    await updateDoc(imageDocRef, {
      resultUrl: resultUrl,
    });

    console.log("Result URL successfully updated in Firestore!");
  } catch (error) {
    console.error("Error updating result URL in Firestore:", error);
  }
};
