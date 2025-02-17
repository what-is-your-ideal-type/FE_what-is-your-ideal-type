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
import { useInfiniteQuery } from '@tanstack/react-query';
import { CardContent } from '../components/ui/card/card-content';
import { CardDescription } from '../components/ui/card/card-description';

const MyPage = () => {
  const { currentUser } = useAuth();
  const [isImageLoaded, setIsImageLoaded] = useState(false);
  const navigate = useNavigate();
  const observer = useRef<IntersectionObserver | null>(null);

  const extractOccupation = (profileData: string) => {
    try {
      const profileObj = JSON.parse(profileData);
      return profileObj.occupation || '직업 정보 없음';
    } catch (error) {
      console.error('프로필 파싱 중 오류 발생:', error);
      return '직업 정보 없음';
    }
  };

  const getCardsData = async (pageParam: number) => {
    try {
      if (currentUser) {
        const uid = currentUser.uid;
        const docRef = doc(db, 'users', uid);
        const usersSnapShot = await getDoc(docRef);
        const userData = usersSnapShot.data();

        if (!userData) return { cards: [], nextPage: undefined };

        console.log(userData)


        if(!userData.postList){  
          return { cards: [] };
        }

        const postList = userData.postList?.slice(
          pageParam * 4,
          pageParam * 4 + 4,
        );

        const fetchedCards = await Promise.all(
          postList.map(async (num: string) => {
            const postRef = doc(db, 'posts', num);
            const postSnapShot = await getDoc(postRef);
            const data = postSnapShot.data();

            if (!data) return null;

            return {
              imageUrl: data.imageUrl,
              createdAt: data.createdAt.toDate(),
              fileName: data.fileName,
              hashTags: data.hashTags,
              resultUrl: `${window.location.href}/result/${data.id}`,
              profile: data.profile,
              id: data.id,
            };
          }),
        );

        const validCards = fetchedCards.filter((card) => card !== null);

        return {
          cards: validCards,
          nextPage: validCards.length === 4 ? pageParam + 1 : undefined,
        };
      } else {
        alert('로그인이 필요한 서비스입니다. 홈으로 이동합니다.');
        navigate('/');
      }
    } catch (error) {
      console.error(error);
    }
  };

  const { data, isLoading, hasNextPage, fetchNextPage } = useInfiniteQuery({
    queryKey: ['posts'],
    queryFn: ({ pageParam }) => getCardsData(pageParam as number),
    initialPageParam: 0,
    getNextPageParam: (lastPage) => {
      return lastPage?.nextPage ?? null;
    },
  });

  // 카드 데이터 처리
  const cards = data?.pages.flatMap((page) => page?.cards) || [];

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

  if (isLoading) {
    return <div>로딩 중...</div>;
  }

  return (
    <>
      <Header />
      <FlexBox
        direction='column'
        className='bg-gray-200 justify-center h-32 mb-8'
      >
        <Text fontSize='xl' fontWeight='bold' className='py-4 text-center'>
          {currentUser?.email}님의 마이페이지
        </Text>
      </FlexBox>
      <Main>
        <FlexBox direction='column'>
          <Text fontSize='xl' fontWeight='bold' className='text-center mb-8'>
            나의 이상형 리스트
          </Text>
          <GridBox>
            {cards.map((card, index) => (
              <Card key={index} onClick={() => navigate(`/result/${card.id}`)}>
                <CardContent
                  imageUrl={card.imageUrl}
                  altText={card.fileName}
                  isImageLoaded={isImageLoaded}
                  onLoad={() => setIsImageLoaded(true)}
                />
                <CardDescription title={extractOccupation(card.profile)} />
              </Card>
            ))}
          </GridBox>
          <NavigateToSurvey label='새로운 이상형 찾기' />
          {hasNextPage && <div id='infinityQueryTrigger' className='h-5'></div>}
        </FlexBox>
      </Main>
    </>
  );
};

export default MyPage;
