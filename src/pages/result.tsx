import React, {useEffect, useState} from 'react';
import {useParams, useNavigate} from 'react-router-dom';
import {useAuth} from '../contexts/auth-context';
import Picture from '../components/ui/picture';
import Kakaoshare from '../components/functional/kakao-share';
import NavigateToSurvey from '../components/functional/navigate-to-survey-props';
import {PreventDefaultWrapper} from '../components/functional/prevent-default-wrapper';
import {Button} from '../components/ui/button';
import {Text} from '../components/ui/text';
import {FlexBox} from '../components/ui/flexbox';
import {Main} from '../components/ui/main';
import {doc, getDoc, DocumentData} from 'firebase/firestore';
import {db} from '../firebase';
import {Header} from '../components/ui/header';
import {useResponsive} from '../hooks/use-responsive';

interface ProfileTypes {
  name: string;
  age: number;
  occupation: string;
  personality: string;
  hobbies: string;
}

const Result = () => {
  const {postId} = useParams();
  const isMobile = useResponsive();
  const [post, setPost] = useState<DocumentData | null>(null);
  const [profile, setProfile] = useState<ProfileTypes | null>(null);
  const currentUser = useAuth();
  const navigate = useNavigate();
  const isLogin = currentUser.currentUser;

  useEffect(() => {
    const fetchPost = async () => {
      if (postId) {
        try {
          const postDocRef = doc(db, 'posts', postId);
          const postSnapshot = await getDoc(postDocRef);

          if (!postSnapshot.exists()) return;

          setPost(postSnapshot.data());
        } catch (error) {
          console.error('Error fetching document: ', error);
        }
      }
    };

    fetchPost();
  }, [postId]);

  useEffect(() => {
    if (!post) return;

    const jsonData = JSON.parse(post.profile);
    setProfile(jsonData);
  }, [post]);

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

  const handleDownload = async () => {
    try {
      const response = await fetch(post?.imageUrl);
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
        style={{
          backgroundColor: '#EFEFEF',
          justifyContent: 'center',
          height: '8rem',
        }}
      >
        <Text fontSize='xl' fontWeight='bold' marginBottom='0.8rem'>
          AI 이상형 생성 결과...{' '}
        </Text>
        <Text>당신의 AI 이상형은 {profile?.occupation}입니다!</Text>
      </FlexBox>
      <Main isMobile={isMobile}>
        <PreventDefaultWrapper>
          <FlexBox direction='column'>
            <Picture imageUrl={post?.imageUrl} altText='이상형 이미지' />
            {isLogin && (
              <Button
                bgColor='white'
                style={{
                  color: 'black',
                  padding: '0.8rem',
                  fontSize: '13px',
                  fontWeight: 'bold',
                }}
                onClick={handleDownload}
              >
                ⤓ 내 이상형 사진 소장하기
              </Button>
            )}
          </FlexBox>
        </PreventDefaultWrapper>
        <FlexBox
          direction='column'
          style={{display: 'block', marginLeft: '2rem'}}
          className='w-full md:w-1/2 mt-4 md:mt-0 md:ml-4'
        >
          <Text fontWeight='bold' fontSize='xl' marginBottom='0.8rem'>
            {profile?.age} {profile?.name}
          </Text>
          <Text fontSize='xxl' fontWeight='bold' marginBottom='1.5rem'>
            {profile?.occupation}
          </Text>
          <Text fontWeight='bold' marginBottom='0.8rem'>
            당신의 이상형은 {profile?.personality}
          </Text>
          <Text fontWeight='bold' marginBottom='1.5rem'>
            취미는{' '}
            {Array.isArray(profile?.hobbies)
              ? profile?.hobbies.join(', ')
              : profile?.hobbies}
            입니다.
          </Text>
          <Text fontWeight='bold' marginBottom='2rem'>
            이상형의 취향을 저격할 수 있는 데이트코스를 계획해보세요!
          </Text>
          <FlexBox style={{marginBottom: '2rem'}}>
            {isLogin ? (
              <>
                <NavigateToSurvey label='이상형 다시 찾기' />
              </>
            ) : (
              <>
                <p className='text-gray'>
                  사진을 저장하고 기록하고 싶다면 로그인 해보세요
                </p>
                <Button onClick={() => navigate('/')}>로그인</Button>
              </>
            )}
          </FlexBox>
          <FlexBox direction='column'>
            {isLogin && (
              <Text fontSize='sm' marginBottom='1rem'>
                ▼ 결과를 친구에게 공유해 보세요! ▼
              </Text>
            )}
            <PreventDefaultWrapper>
              <Button
                style={{
                  padding: '0.8rem',
                  color: '#706EF4',
                  fontWeight: 'bold',
                  fontSize: '13px',
                  width: '120px',
                }}
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
