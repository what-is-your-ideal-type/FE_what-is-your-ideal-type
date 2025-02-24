import React, { useEffect, useRef, useState } from 'react';
import { doc, getDoc } from 'firebase/firestore';
import { useAuth } from '../contexts/auth-context';
import { useNavigate } from 'react-router-dom';
import NavigateToSurvey from '../components/functional/navigate-to-survey-props';
import { Text } from '../components/ui/text';
import { FlexBox } from '../components/ui/flexbox';
import { GridBox } from '../components/ui/gridbox';
import { Card } from '../components/ui/card/card';
import { Main } from '../components/ui/main';
import { db } from '../firebase';
import { Header } from '../components/ui/header';
import { useInfiniteQuery, useQuery } from '@tanstack/react-query';
import { CardContent } from '../components/ui/card/card-content';
import { CardDescription } from '../components/ui/card/card-description';
import { User } from 'firebase/auth';
import { fetchPostsData, fetchUserData } from '../api/queries';

const MyPage = () => {
  const { currentUser } = useAuth();
  const [isImageLoaded, setIsImageLoaded] = useState(false);
  const navigate = useNavigate();
  const observer = useRef<IntersectionObserver | null>(null);

  const {
    data: userData,
    isLoading: isUserDataLoading,
    error: userDataError,
  } = useQuery({
    queryKey: ['userData', currentUser?.uid],
    queryFn: () => fetchUserData(currentUser as User),
    enabled: !!currentUser,
  });

  const {
    data: postsData,
    isLoading: isPostsLoading,
    error: postsError,
    hasNextPage,
    fetchNextPage,
  } = useInfiniteQuery({
    queryKey: ['posts', userData?.postList],
    queryFn: ({ pageParam }) => fetchPostsData(userData, pageParam as number),
    initialPageParam: 0,
    getNextPageParam: (lastPage) => {
      return lastPage?.nextPage ?? null;
    },
    enabled: !!userData,
  });

  useEffect(() => {
    const loadMore = (entries: IntersectionObserverEntry[]) => {
      if (entries[0].isIntersecting && hasNextPage) {
        fetchNextPage();
      }
    };

    if (observer.current) {
      observer.current.disconnect();
    }

    observer.current = new IntersectionObserver(loadMore, {
      root: null, // 뷰포트를 기준으로 함
      rootMargin: '0px',
      threshold: 1.0, // 100% 가시성이 있어야 트리거
    });

    const target = document.getElementById('infinityQueryTrigger'); // 추가할 엘리먼트의 ID
    if (target) {
      observer.current.observe(target);
    }

    return () => {
      if (observer.current) {
        observer.current.disconnect();
      }
    };
  }, [hasNextPage, fetchNextPage]);

  const extractOccupation = (profileData: string) => {
    try {
      const profileObj = JSON.parse(profileData);
      return profileObj.occupation || '직업 정보 없음';
    } catch (error) {
      console.error('프로필 파싱 중 오류 발생:', error);
      return '직업 정보 없음';
    }
  };

  if (!currentUser) {
    alert('로그인이 필요한 서비스입니다. 홈으로 이동합니다.');
    navigate('/');
    return null;
  }

  if (isUserDataLoading || isPostsLoading) {
    return <div>로딩 중...</div>;
  }

  if (userDataError || postsError) {
    return <div>데이터를 불러오는 중 오류가 발생했습니다.</div>;
  }

  const posts = postsData?.pages.flatMap((page) => page?.posts) || [];

  return (
    <>
      <Header />
      <FlexBox
        direction='column'
        className='bg-gray-200 justify-center h-32 mb-8'
      >
        <Text fontSize='xl' fontWeight='bold' className='py-4 text-center'>
          {userData?.nickname}님의 마이페이지
        </Text>
      </FlexBox>
      <Main>
        <FlexBox direction='column'>
          <Text fontSize='xl' fontWeight='bold' className='text-center mb-8'>
            나의 이상형 리스트
          </Text>
          {posts.length > 0 ? (
            <GridBox>
              {posts.map((post, index) => (
                <Card
                  key={index}
                  onClick={() => navigate(`/result/${post.id}`)}
                >
                  <CardContent
                    imageUrl={post.imageUrl}
                    altText={post.fileName}
                    isImageLoaded={isImageLoaded}
                    onLoad={() => setIsImageLoaded(true)}
                  />
                  <CardDescription title={extractOccupation(post.profile)} />
                </Card>
              ))}
            </GridBox>
          ) : (
            <Text className='text-center mb-8'>
              현재 이상형 리스트가 없습니다.
            </Text>
          )}
          <NavigateToSurvey label='새로운 이상형 찾기' />
          {hasNextPage && <div id='infinityQueryTrigger' className='h-5'></div>}
        </FlexBox>
      </Main>
    </>
  );
};

export default MyPage;
