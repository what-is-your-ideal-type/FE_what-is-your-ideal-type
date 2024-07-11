import React from "react";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { auth, storage, IMAGES_COLLECTION } from "../firebase";
import { doc, setDoc } from "firebase/firestore";

export const uploadImageToFirebase = async (imageUrl: string) => {
  try {
    imageUrl = imageUrl.replace(
      "https://oaidalleapiprodscus.blob.core.windows.net",
      "",
    );
    const user = auth.currentUser;
    const uid = user?.uid;

    // 생성된 이미지 url을 사용해 이미지 다운로드
    const response = await fetch(imageUrl);
    const blob = await response.blob();

    const fileName = "randomName444";
    const storageRef = ref(storage, `images/${fileName}.png`);

    // 다운로드한 이미지를 Firebase Storage에 업로드
    await uploadBytes(storageRef, blob).then((snapshot) => {
      console.log("URL saved to storage!", snapshot);
    });
    // 업로드된 이미지의 다운로드 url 가져오기
    const downloadUrl = await getDownloadURL(storageRef);

    // 로그인 상태인 경우, firestore의 uid로 users images 컬렉션에 url 저장
    if (user !== null) {
      if (!uid) throw new Error("User not authenticated");
      const imagesCollectionRef = IMAGES_COLLECTION(uid);
      const userDocRef = doc(imagesCollectionRef);
      await setDoc(userDocRef, { url: downloadUrl, createdAt: new Date() });
      console.log("URL successfully saved to firestore!");
      return downloadUrl;
    }
  } catch (error) {
    console.error("Error uploading image to Firebase:", error);
    throw error;
  }
};
