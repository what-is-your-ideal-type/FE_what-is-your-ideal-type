import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import { profileGenerate } from '../services/profile-generate';
import { convertToWebP } from '../components/functional/convert-to-webp';
import { uploadImageToFirebase } from '../services/upload-image-to-firebase';
import { useAuth } from '../contexts/auth-context';
import { doc, setDoc, getDoc } from 'firebase/firestore';
import { db } from '../firebase';
import { imageGenerate } from '../services/image-generate';
import { getCountAndTimeLeft, incrementCount } from '../services/count-service';
import { useGuestMode } from '../hooks/use-guest-mode';
import LoadingScreen from '../components/ui/loading-screen';

const Generate = () => {
  const location = useLocation();
  const [guestMode, setGuestMode] = useGuestMode();
  const navigate = useNavigate();
  const { currentUser } = useAuth();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const { prompts, hashTags } = location.state;

    const blockBackButton = () => {
      window.history.pushState(null, '', window.location.href);
    };

    window.history.pushState(null, '', window.location.href);
    window.addEventListener('popstate', blockBackButton);

    const processAndNavigate = async () => {
      try {
        const newPostId = uuidv4();

        // 1. 이미지 생성 시작
        const data = await imageGenerate(prompts);
        const responseUrl = data?.url;
        if (!responseUrl) throw new Error('이미지 URL 생성 실패');

        // 2. WebP 변환
        const webP = await convertToWebP(responseUrl);
        if (!webP) throw new Error('WebP 변환 실패');

        const imageUploadPromise = uploadImageToFirebase(webP);
        const imageUrl = await imageUploadPromise;
        if (!imageUrl) throw new Error('이미지 업로드 실패');

        // 3. 프로필 생성
        const profilePromise = profileGenerate(prompts);
        const profile = await profilePromise;
        if (!profile) throw new Error('프로필 생성 실패');

        // 4. Firebase에 게시물 저장
        if (guestMode === 'true') {
          await setDoc(doc(db, 'anonymous_posts', newPostId), {
            id: newPostId,
            createdAt: new Date(),
            imageUrl: imageUrl,
            profile: profile,
            hashTags: hashTags,
            prompts: prompts,
            userId: null,
            email: null,
          });
        } else {
          await setDoc(doc(db, 'posts', newPostId), {
            id: newPostId,
            createdAt: new Date(),
            imageUrl: imageUrl,
            profile: profile,
            hashTags: hashTags,
            prompts: prompts,
            userId: currentUser?.uid,
            email: currentUser?.email,
          });
        }

        // 5. 사용자 문서 업데이트 (로그인된 경우)
        if (currentUser) {
          const userRef = doc(db, 'users', currentUser.uid);
          const userSnapShot = await getDoc(userRef);

          if (userSnapShot.exists()) {
            const userData = userSnapShot.data();
            const newPostList = [newPostId, ...(userData.postList || [])];
            await setDoc(
              doc(db, 'users', currentUser.uid),
              {
                postList: newPostList,
              },
              { merge: true },
            );
          }

          // 6. 카운트 업데이트
          const { count, limit } = await getCountAndTimeLeft(currentUser);
          await incrementCount(currentUser, count, limit);
        }

        // 7. 최종 진행률 업데이트 및 결과 페이지 이동
        setIsLoading(false);
        if (!imageUrl || !profile) {
          throw new Error('이미지 URL 또는 프로필이 누락되었습니다.');
        }

        navigate(`/result/${newPostId}`, {
          replace: true,
        });
      } catch (error) {
        console.error(error);
      }
    };

    processAndNavigate();

    // 컴포넌트 언마운트 시 뒤로 가기 이벤트 리스너 제거
    return () => {
      window.removeEventListener('popstate', blockBackButton);
    };
  }, [location, currentUser, navigate]);

  return (
    <div className='w-full min-h-screen'>
      {isLoading && <LoadingScreen isLoading={isLoading} />}
    </div>
  );
};

export default Generate;
