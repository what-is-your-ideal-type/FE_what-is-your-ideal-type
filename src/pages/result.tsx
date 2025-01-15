import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/auth-context';
import Picture from '../components/ui/picture';
import Kakaoshare from '../components/functional/kakao-share';
import NavigateToSurvey from '../components/functional/navigate-to-survey-props';
import { PreventDefaultWrapper } from '../components/functional/prevent-default-wrapper';
import { Button } from '../components/ui/button/button';
import { Text } from '../components/ui/text';
import { FlexBox } from '../components/ui/flexbox';
import { Main } from '../components/ui/main';
import { doc, setDoc, getDoc, DocumentData } from 'firebase/firestore';
import { db } from '../firebase';
import { Header } from '../components/ui/header';
import { useResponsive } from '../hooks/use-responsive';
import { convertToWebP } from '../components/functional/convert-to-webp';
import { uploadImageToFirebase } from '../services/upload-image-to-firebase';
import { getCountAndTimeLeft, incrementCount } from '../services/count-service';

interface ProfileTypes {
  name: string;
  age: number;
  occupation: string;
  personality: string;
  hobbies: string;
}

const Result = () => {
  const { postId } = useParams();
  const location = useLocation();
  const {
    tempImageUrl,
    profile: initialProfile,
    hashTags,
    prompts,
  } = location.state || {};
  const [imageUrl, setImageUrl] = useState(tempImageUrl);
  const [profile, setProfile] = useState(initialProfile);
  const [isProcessing, setIsProcessing] = useState(false);
  const { currentUser } = useAuth();
  const isMobile = useResponsive();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPostData = async () => {
      if (!postId) return;

      try {
        // posts 컬렉션에서 검색
        const postRef = doc(db, 'posts', postId);
        let postDoc = await getDoc(postRef);

        // posts 컬렉션에 없다면 anonymous_posts에서 검색
        if (!postDoc.exists()) {
          const anonymousPostRef = doc(db, 'anonymous_posts', postId);
          postDoc = await getDoc(anonymousPostRef);
        }

        // 데이터가 존재하면 상태 업데이트
        if (postDoc.exists()) {
          const data = postDoc.data();
          setImageUrl(data.imageUrl);

          // profile이 문자열인 경우 파싱
          if (typeof data.profile === 'string') {
            setProfile(JSON.parse(data.profile));
          } else {
            setProfile(data.profile);
          }
        }
      } catch (error) {
        console.error('게시물 데이터 로딩 실패:', error);
      }
    };

    // location.state가 없을 경우에만 Firebase에서 데이터 로드
    if (!location.state) {
      fetchPostData();
    }
  }, [postId]);

  // 백그라운드 작업 처리
  useEffect(() => {
    const processBackgroundTasks = async () => {
      if (!postId) return;
      setIsProcessing(true);

      try {
        // 이미지 WebP 변환 및 Firebase 업로드
        const webP = await convertToWebP(tempImageUrl);
        if (!webP) throw new Error('WebP 변환 실패');

        const uploadedImageUrl = await uploadImageToFirebase(webP);
        if (!uploadedImageUrl) throw new Error('이미지 업로드 실패');

        setImageUrl(uploadedImageUrl);

        // 프로필 데이터 준비
        const profileToSave =
          typeof profile === 'string' ? JSON.parse(profile) : profile;

        // Firestore에 게시물 데이터 저장
        const collection = currentUser ? 'posts' : 'anonymous_posts';
        await setDoc(doc(db, collection, postId), {
          id: postId,
          createdAt: new Date(),
          imageUrl: uploadedImageUrl,
          profile: profileToSave,
          hashTags,
          prompts,
          userId: currentUser?.uid || null,
          email: currentUser?.email || null,
        });

        // 로그인한 사용자의 경우 추가 처리
        if (currentUser) {
          // Firebase 문서 업데이트
          const userRef = doc(db, 'users', currentUser.uid);
          const userSnapShot = await getDoc(userRef);

          if (userSnapShot.exists()) {
            const userData = userSnapShot.data();
            const newPostList = [postId, ...(userData.postList || [])];
            await setDoc(
              doc(db, 'users', currentUser.uid),
              { postList: newPostList },
              { merge: true },
            );
          }

          // 카운트 증가
          const { count, limit } = await getCountAndTimeLeft(currentUser);
          await incrementCount(currentUser, count, limit);
        }
      } catch (error) {
        console.error('Background processing error:', error);
      } finally {
        setIsProcessing(false);
      }
    };

    // location.state가 있을 때만 백그라운드 작업 실행
    if (location.state) {
      processBackgroundTasks();
    }
  }, []);

  const handleDownload = async () => {
    try {
      // 이미지 다운로드 및 WebP 변환
      const response = await fetch(imageUrl);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const blob = await response.blob();

      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');

      const img = new Image();
      img.src = URL.createObjectURL(blob);

      img.onload = () => {
        canvas.width = img.width;
        canvas.height = img.height;
        ctx?.drawImage(img, 0, 0);
        canvas.toBlob((blob) => {
          const url = window.URL.createObjectURL(blob!);
          const a = document.createElement('a');
          a.href = url;
          a.download = `img_${postId}.webp`;
          document.body.appendChild(a);
          a.click();
          document.body.removeChild(a);
          window.URL.revokeObjectURL(url);
        }, 'image/webp');
      };
    } catch (error) {
      console.error('Error downloading the image: ', error);
    }
  };

  // 뒤로가기 방지
  useEffect(() => {
    const blockBackButton = () => {
      window.history.pushState(null, '', window.location.href);
    };

    window.history.pushState(null, '', window.location.href);
    window.addEventListener('popstate', blockBackButton);

    return () => {
      window.removeEventListener('popstate', blockBackButton);
    };
  }, []);

  const handleShare = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      alert('링크가 클립보드에 복사되었습니다. 원하는 곳에 붙여넣기 해주세요.');
    } catch (error) {
      console.error('Failed to copy link : ', error);
      alert('링크 복사에 실패했습니다.');
    }
  };

  return (
    <>
      <Header></Header>
      <FlexBox
        direction='column'
        className='bg-gray-200 justify-center h-32 mb-8 text-center'
      >
        <Text fontSize='xl' fontWeight='bold' className='py-4'>
          AI 이상형 생성 결과...{' '}
        </Text>
        <Text>당신의 AI 이상형은 {profile?.occupation}입니다!</Text>
      </FlexBox>
      <Main isMobile={isMobile}>
        <PreventDefaultWrapper>
          <FlexBox direction='column'>
            <Picture imageUrl={imageUrl} altText='이상형 이미지' />
            {isProcessing && (
              <Text fontSize='sm' className='text-gray-500 mt-2 text-center'>
                이미지 최적화 처리 중...
              </Text>
            )}
            {currentUser && (
              <Button
                bgColor='white'
                className='text-black p-3 text-sm font-bold'
                onClick={handleDownload}
                disabled={isProcessing}
              >
                ⤓ 내 이상형 사진 소장하기
              </Button>
            )}
          </FlexBox>
        </PreventDefaultWrapper>
        <FlexBox
          direction='column'
          style={{ display: 'block', marginLeft: '2rem' }}
          className='w-full md:w-1/2 mt-4 md:mt-0 md:ml-4'
        >
          <Text fontWeight='bold' fontSize='xl' className='mb-3'>
            {profile?.age} {profile?.name}
          </Text>
          <Text fontSize='xxl' fontWeight='bold' className='mb-6'>
            {profile?.occupation}
          </Text>
          <Text fontWeight='bold' className='mb-3'>
            당신의 이상형은 {profile?.personality}
          </Text>
          <Text fontWeight='bold' className='mb-6'>
            취미는{' '}
            {Array.isArray(profile?.hobbies)
              ? profile?.hobbies.join(', ')
              : profile?.hobbies}
            입니다.
          </Text>
          <Text fontWeight='bold' className='mb-8'>
            이상형의 취향을 저격할 수 있는 데이트코스를 계획해보세요!
          </Text>
          <FlexBox style={{ marginBottom: '2rem' }}>
            {currentUser ? (
              <>
                <NavigateToSurvey label='이상형 다시 찾기' />
              </>
            ) : (
              <>
                <p className='text-gray'>
                  사진을 저장하고 기록하고 싶다면 로그인 해보세요
                </p>
                <Button bgColor='main' onClick={() => navigate('/')}>
                  로그인
                </Button>
              </>
            )}
          </FlexBox>
          <FlexBox direction='column' className='text-center'>
            {currentUser && (
              <Text fontSize='sm' className='mb-4'>
                ▼ 결과를 친구에게 공유해 보세요! ▼
              </Text>
            )}
            <PreventDefaultWrapper className='justify-center'>
              <Button
                className='text-main p-3 font-bold text-xs w-32'
                bgColor='sub'
                onClick={handleShare}
              >
                링크 복사하기
              </Button>
              <Kakaoshare />
            </PreventDefaultWrapper>
          </FlexBox>
        </FlexBox>
      </Main>
    </>
  );
};

export default Result;
