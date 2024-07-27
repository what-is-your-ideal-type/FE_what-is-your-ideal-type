import React from "react";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { auth, storage, IMAGES_COLLECTION } from "../firebase";
import { doc, setDoc } from "firebase/firestore";
import { v4 as uuid } from "uuid";

export const uploadImageToFirebase = async (webP: Blob, hashTags: string[]) => {
  try {
    const user = auth.currentUser;
    const uid = user?.uid;

    const fileName = uuid() + ".webP";
    const storageRef = ref(storage, `images/${fileName}`);

    // 다운로드한 이미지를 Firebase Storage에 업로드
    const snapshot = await uploadBytes(storageRef, webP);

    // 업로드가 완료되면 다운로드 URL 가져오기
    const downloadUrl = await getDownloadURL(snapshot.ref);

    // 로그인 상태인 경우, firestore의 uid로 users images 컬렉션에 url 저장
    if (user !== null) {
      if (!uid) throw new Error("User not authenticated");
      const imagesCollectionRef = IMAGES_COLLECTION(uid);
      const userDocRef = doc(imagesCollectionRef);
      await setDoc(userDocRef, {
        fileName: fileName,
        url: downloadUrl,
        createdAt: new Date(),
        hashTags: hashTags,
      });
      console.log("URL successfully saved to firestore!");
    }

    return [downloadUrl, fileName];
  } catch (error) {
    console.error("Error uploading image to Firebase:", error);
    throw error;
  }
};
