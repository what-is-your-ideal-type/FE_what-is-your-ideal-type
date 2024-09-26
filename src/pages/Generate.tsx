import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Loading from "../components/ui/Loading";
import { profileGenerate } from "../services/profileGenerator";
import { convertToWebP } from "../components/functional/convertToWebP";
import { uploadImageToFirebase } from "../services/uploadImageToFirebase";
import { useAuth } from "../contexts/AuthContext";
import { collection, doc, getDocs, setDoc } from "firebase/firestore";
import { db } from "../firebase";
import { imageGenerate } from "../services/imageGenerator";

const Generate = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { currentUser } = useAuth();
  const [progressState, setProgressState] = useState<number>(0);

  useEffect(() => {
    const { prompts, hashTags } = location.state;
    const blockBackButton = () => {
      window.history.pushState(null, "", window.location.href);
    };
    window.history.pushState(null, "", window.location.href);
    window.addEventListener("popstate", blockBackButton);

    const processAndNavigate = async () => {
      try {
        if (!currentUser) return;

        let currentProgress = 0;

        // 1. 이미지 생성 시작
        const imageGeneratePromise = imageGenerate(prompts);

        // 프로그래스를 점진적으로 증가시키기 위한 함수
        const updateProgressSmoothly = async (
          targetProgress: number,
          duration: number,
        ) => {
          const totalSteps = Math.floor(duration / 100); // 100ms마다 업데이트
          const progressIncrement =
            (targetProgress - currentProgress) / totalSteps;

          for (let i = 0; i < totalSteps; i++) {
            currentProgress = Math.min(
              currentProgress + progressIncrement,
              targetProgress,
            );
            setProgressState(Math.round(currentProgress));
            await new Promise((resolve) => setTimeout(resolve, 200));
          }
        };

        await updateProgressSmoothly(50, 8000);

        const data = await imageGeneratePromise;
        const responseUrl = data?.url;

        if (!responseUrl) throw new Error("Failed to get response URL");

        // 2. webP 변환
        const webP = await convertToWebP(responseUrl);
        if (!webP) throw new Error("Failed to convert to WebP");

        const imageUploadPromise = uploadImageToFirebase(webP);
        await updateProgressSmoothly(70, 2000); // progress 70%까지 증가

        const imageUrl = await imageUploadPromise;

        // 3. 이미지 관련 profile 생성
        const profilePromise = profileGenerate(prompts);
        await updateProgressSmoothly(90, 2000); // progress 90%까지 증가

        const profile = await profilePromise;
        if (!profile) throw new Error("Failed to get profile");

        // 4. Firebase에 이미지 및 프로필 저장
        const postsRef = collection(db, "posts");
        const postsSnapShot = await getDocs(postsRef);
        // 모든 문서의 ID를 배열로 추출
        const postsIds = postsSnapShot.docs.map((doc) => doc.id);
        // ID를 숫자로 변환 후, 가장 큰 값 찾기
        const lastPostId = postsIds[postsIds.length - 1];
        // 새 문서 ID 생성 (마지막 ID + 1)
        const newPostId = (Number(lastPostId) + 1).toString().padStart(4, "0");

        await setDoc(doc(db, "posts", newPostId), {
          id: newPostId,
          userId: currentUser.uid,
          email: currentUser.email,
          imageUrl: imageUrl,
          createdAt: new Date(),
          hashTags: hashTags,
          profile: profile,
        });

        // 5. 최종 progress 업데이트 및 결과페이지 이동
        await updateProgressSmoothly(100, 1000); // progress 100%까지 증가
        navigate(`/result/${newPostId}`, { replace: true }); // 현재 페이지를 대체
      } catch (error) {
        console.error(error);
      }
    };

    processAndNavigate();

    // 언마운트 시 뒤로가기 이벤트리스너 제거
    return () => {
      window.removeEventListener("popstate", blockBackButton);
    };
  }, [location, currentUser, navigate]);

  return (
    <>
      <Loading progressState={progressState} />
    </>
  );
};

export default Generate;
