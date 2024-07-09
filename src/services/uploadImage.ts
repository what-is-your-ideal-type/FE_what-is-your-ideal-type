import React from "react";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { storage } from "../firebase";

export const uploadImageToFirebase = async (
  imageUrl: string,
  userId: string,
) => {
  try {
    // 생성된 이미지 url을 사용해 이미지 다운로드
    const response = await fetch(imageUrl);
    const blob = await response.blob();

    // 다운로드한 이미지를 Firebase Storage에 업로드
    const storageRef = ref(storage, `images/${userId}.jpg`);
    await uploadBytes(storageRef, blob);

    // 업로드된 이미지의 다운로드 url 가져오기
    const downloadUrl = await getDownloadURL(storageRef);
    return downloadUrl;
  } catch (error) {
    console.error("Error uploading image to Firebase:", error);
    throw error;
  }
};
