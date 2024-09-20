import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Loading from "../components/ui/Loading";
import { useEffect } from "react";
import { imageGenerate } from "../services/imageGenerator";
import { profileGenerate } from "../services/profileGenerator";
import { convertToWebP } from "../components/functional/convertToWebP";
import { uploadImageToFirebase } from "../services/uploadImageToFirebase";
import { useAuth } from "../contexts/AuthContext";
import { getCountAndTimeLeft, incrementCount } from "../services/countService";
import { collection, doc, getDoc, getDocs, setDoc } from "firebase/firestore";
import { db } from "../firebase";

const Generate = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { currentUser } = useAuth();

  useEffect(() => {
    const { prompts, hashTags } = location.state;

    // 뒤로가기 방지
    const blockBackButton = () => {
      window.history.pushState(null, "", window.location.href);
    };

    window.history.pushState(null, "", window.location.href);
    window.addEventListener("popstate", blockBackButton);

    const processAndNavigate = async () => {
      try {
        
        if(!currentUser) return
        // 이미지 생성
        const data = await imageGenerate(prompts);
        const responseUrl = data?.url;

        if (!responseUrl) {
          throw new Error("Failed to get response URL");
        }
        const webP = await convertToWebP(responseUrl);

        if (!webP) {
          throw new Error("Failed to convert to WebP");
        }

        const imageUrl = await uploadImageToFirebase(webP);

        // 이미지 관련 profile 생성
        const profile = await profileGenerate(prompts);
        if (!profile) {
          throw new Error("Failed to get profile");
        }


        // Firebase에 이미지 및 프로필 저장

        const postsRef = collection(db, "posts");
        const postsSnapShot = await getDocs(postsRef);
        // 모든 문서의 ID를 배열로 추출
        const postsIds = postsSnapShot.docs.map(doc => doc.id);

        // ID를 숫자로 변환 후, 가장 큰 값 찾기
        const lastPostId = postsIds[postsIds.length - 1]

        // 새 문서 ID 생성 (마지막 ID + 1)
        const newPostId = (Number(lastPostId) + 1).toString().padStart(4, '0');
        
        await setDoc(doc(db, "posts", newPostId), {
          id: newPostId,
          userId: currentUser.uid,
          email: currentUser.email,
          imageUrl: imageUrl,
          createdAt: new Date(),
          hashTags: hashTags,
          profile: profile
        });
        
        const userRef = doc(db, "users", currentUser.uid); 
        const userSnapShot = await getDoc(userRef);

        if(!userSnapShot.exists()) return

        const userData = userSnapShot.data()
        const newPostList = [...(userData.postList || []), newPostId];

        await setDoc(doc(db, "users", currentUser.uid), {
          postList: newPostList
        },{merge: true});

        const resultUrl = `/result/${newPostId}`;

        navigate(resultUrl, {
          replace: true, // 현재 페이지를 대체
        });

        const { count, limit } = await getCountAndTimeLeft(currentUser);
        await incrementCount(currentUser, count, limit);
      } catch (error) {
        console.error(error);
      }
    };
    processAndNavigate();

    // 언마운트 시 뒤로가기 이벤트리스너 제거
    return () => {
      window.removeEventListener("popstate", blockBackButton);
    };
  }, []);

  return <Loading />;
};

export default Generate;
