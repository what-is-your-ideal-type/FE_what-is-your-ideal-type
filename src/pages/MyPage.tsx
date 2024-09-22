import React, { useState, useEffect } from "react";
import {
  doc,
  getDoc,
} from "firebase/firestore";
import { useAuth } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import NavigateToSurvey from "../components/functional/NavigateToSurvey";
import { Text } from "../components/ui/Text";
import { FlexBox } from "../components/ui/FlexBox";
import { GridBox } from "../styles/GridBox";
import { Card } from "../styles/styled";
import { Main } from "../components/ui/Main";
import { db } from "../firebase";

interface CardData {
  imageUrl: string;
  id: string;
  createdAt: Date;
  fileName: string;
  hashTags?: string[] | null;
  resultUrl?: string | null;
  profile?: string | null;
}

const MyPage = () => {
  const [cards, setCards] = useState<CardData[]>([]);
  const { currentUser } = useAuth();
  const navigate = useNavigate();
  useEffect(() => {
    const getCardsData = async () => {
      try{
        if (currentUser) {
          const uid = currentUser.uid;


          const docRef = doc(db, "users", uid);
          const usersSnapShot = await getDoc(docRef);
          const userData = usersSnapShot.data();
          
          if(!userData) return

          const postList = userData.postList

          const fetchCardsData = async () => {
            try {
              const fetchedCards = await Promise.all(
                postList.map(async (num: string) => {
                  const postRef = doc(db, "posts", num);
                  const postSnapShot = await getDoc(postRef);
                  const data = postSnapShot.data();
          
                  if (!data) return null; // 데이터를 가져오지 못한 경우 null 반환
          
                  return {
                    imageUrl: data.imageUrl,
                    createdAt: data.createdAt.toDate(), // Timestamp를 Date 객체로 변환
                    fileName: data.fileName,
                    hashTags: data.hashTags,
                    resultUrl: `${window.location.href}/result/${data.id}`,
                    profile: data.profile,
                    id: data.id
                  };
                })
              );
          
              // null 값이 있을 수 있으므로 필터링
              setCards(fetchedCards);
            } catch (error) {
              console.error("Error fetching cards data:", error);
            }
          };
          fetchCardsData()
        } else {
          alert("로그인이 필요한 서비스입니다. 홈으로 이동합니다.");
          navigate("/");
        }
      }catch(error){
        console.error(error)
      }
    }
    getCardsData()
  }, [currentUser]);

  return (
    <Main>
      <FlexBox direction="column">
        <Text fontSize="xl" fontWeight="bold" style={{padding: "1rem 0"}}>
          {currentUser?.email}님의 이상형 리스트 입니다.
        </Text>
        <NavigateToSurvey label="새로운 이상형 찾기" />
        <GridBox>
          {cards.map((card, index) => (
            <Card
              key={index}
              onClick={() =>
                navigate(`/result/${card.id}`)
              }
            >
              <FlexBox direction="column" gap="16px">
                <img
                  src={card.imageUrl}
                  alt={card.fileName}
                  style={{ width: "100%", height: "auto", borderRadius: "0.375rem 0.375rem 0 0"}}
                />
                <FlexBox direction="column" gap="16px">
                  <FlexBox direction="column">
                      {card.hashTags?.map((hashTag, index) => (
                        <span key={index} style={{padding: "6px 12px", backgroundColor: "rgba(112, 110, 244, 0.3)", display: "inline-block", borderRadius: "34px"}}>#{hashTag}</span>
                      ))}
                  </FlexBox>
                  <Text fontWeight="bold">{card.createdAt.toLocaleDateString()}</Text>
                </FlexBox>
              </FlexBox>
            </Card>
          ))}
        </GridBox>
      </FlexBox>
    </Main>
  );
};

export default MyPage;
