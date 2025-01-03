import React, { useEffect, useRef, useState } from "react";
import { doc, getDoc } from "firebase/firestore";
import { useAuth } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import NavigateToSurvey from "../components/functional/NavigateToSurvey";
import { Text } from "../components/ui/Text";
import { FlexBox } from "../components/ui/FlexBox";
import { GridBox } from "../styles/GridBox";
import { Card } from "../styles/styled";
import { Main } from "../components/ui/Main";
import { db } from "../firebase";
import { Header } from "../components/ui/Header";
import { useInfiniteQuery } from "@tanstack/react-query";

const MyPage = () => {
  const { currentUser } = useAuth();
  const [isImageLoaded, setIsImageLoaded] = useState(false);
  const navigate = useNavigate();
  const observer = useRef<IntersectionObserver | null>(null);

  const extractOccupation = (profileData: string) => {
    try {
      const profileObj = JSON.parse(profileData);
      return profileObj.occupation || "직업 정보 없음";
    } catch (error) {
      console.error("프로필 파싱 중 오류 발생:", error);
      return "직업 정보 없음";
    }
  };

  const getCardsData = async (pageParam: number) => {
    try {
      if (currentUser) {
        const uid = currentUser.uid;
        const docRef = doc(db, "users", uid);
        const usersSnapShot = await getDoc(docRef);
        const userData = usersSnapShot.data();

        if (!userData) return { cards: [], nextPage: undefined };

        const postList = userData.postList.slice(
          pageParam * 4,
          pageParam * 4 + 4,
        );

        const fetchedCards = await Promise.all(
          postList.map(async (num: string) => {
            const postRef = doc(db, "posts", num);
            const postSnapShot = await getDoc(postRef);
            const data = postSnapShot.data();

            if (!data) return null;
            console.log(data);

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
        alert("로그인이 필요한 서비스입니다. 홈으로 이동합니다.");
        navigate("/");
      }
    } catch (error) {
      console.error(error);
    }
  };

  const { data, isLoading, hasNextPage, fetchNextPage } = useInfiniteQuery({
    queryKey: ["posts"],
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
      rootMargin: "0px",
      threshold: 1.0, // 100% 가시성이 있어야 트리거
    });

    const target = document.getElementById("infinityQueryTrigger"); // 추가할 엘리먼트의 ID
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
        direction="column"
        style={{
          backgroundColor: "#EFEFEF",
          justifyContent: "center",
          height: "8rem",
          marginBottom: "2rem",
        }}
      >
        <Text fontSize="xl" fontWeight="bold" style={{ padding: "1rem 0" }}>
          {currentUser?.email}님의 마이페이지
        </Text>
      </FlexBox>
      <Main>
        <FlexBox direction="column">
          <FlexBox
            style={{ justifyContent: "space-between", marginBottom: "2rem" }}
          >
            <Text fontSize="xl" fontWeight="bold">
              나의 이상형 리스트
            </Text>
          </FlexBox>
          <GridBox>
            {cards.map((card, index) => (
              <Card
                key={index}
                onClick={() => navigate(`/result/${card.id}`)}
                style={{ flexDirection: "column", marginBottom: "12px" }}
              >
                <div
                  style={{
                    position: "relative",
                    width: "100%",
                    paddingTop: "100%",
                    marginBottom: "12px",
                  }}
                >
                  {!isImageLoaded && (
                    <div
                      style={{
                        position: "absolute",
                        top: 0,
                        left: 0,
                        width: "100%",
                        height: "100%",
                        backgroundColor: "#ffffff",
                        borderRadius: "8px",
                      }}
                    />
                  )}
                  <img
                    src={card.imageUrl}
                    alt={card.fileName}
                    style={{
                      position: "absolute",
                      top: 0,
                      left: 0,
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                      borderRadius: "8px",
                      display: isImageLoaded ? "block" : "none",
                    }}
                    onLoad={() => setIsImageLoaded(true)}
                  />
                </div>
                <div className="text-center py-2">
                  <Text fontSize="md" fontWeight="bold">
                    {extractOccupation(card.profile)}
                  </Text>
                </div>
              </Card>
            ))}
          </GridBox>
          <NavigateToSurvey label="새로운 이상형 찾기" />
          {hasNextPage && (
            <div id="infinityQueryTrigger" style={{ height: "20px" }}></div>
          )}
        </FlexBox>
      </Main>
    </>
  );
};

export default MyPage;
