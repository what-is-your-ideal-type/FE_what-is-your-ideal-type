import React, { useState, useEffect } from "react";
import { IMAGES_COLLECTION } from "../firebase";
import {
  query,
  getDocs,
  QuerySnapshot,
  DocumentData,
} from "firebase/firestore";
import { useAuth } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import NavigateToSurvey from "../components/NavigateToSurvey";
import { Text } from "../styles/Text";
import { FlexBox } from "../styles/FlexBox";
import { GridBox } from "../styles/GridBox";
import { Card } from "../styles/styled";

interface CardData {
  url: string;
  createdAt: Date;
  fileName: string;
  hashTags?: string[] | null;
  resultUrl?: string | null;
}

const MyPage = () => {
  const [cards, setCards] = useState<CardData[]>([]);
  const { currentUser } = useAuth();
  const navigate = useNavigate();
  useEffect(() => {
    if (currentUser) {
      console.log("User in MyPage: ", currentUser);
      const uid = currentUser.uid;
      const q = query(IMAGES_COLLECTION(uid));
      getDocs(q)
        .then((querySnapshot: QuerySnapshot<DocumentData>) => {
          const newCards: CardData[] = [];
          querySnapshot.forEach((doc) => {
            const data = doc.data();
            const cardData: CardData = {
              url: data.url,
              createdAt: data.createdAt.toDate(),
              fileName: data.fileName,
              hashTags: data.hashTags,
              resultUrl: data.resultUrl,
            };
            newCards.push(cardData);
          });
          newCards.sort(
            (a, b) => b.createdAt.getTime() - a.createdAt.getTime(),
          );
          setCards((prevCards) => [...prevCards, ...newCards]);
        })
        .catch((error) => {
          throw new Error("Error fetching documents: ", error);
        });
    } else {
      alert("로그인이 필요한 서비스입니다. 홈으로 이동합니다.");
      navigate("/");
    }
  }, [currentUser, navigate]);

  return (
    <FlexBox direction="column">
      <Text fontSize="xl" fontWeight="bold" style={{padding: "1rem 0"}}>
        {currentUser?.email}님의 이상형 리스트 입니다.
      </Text>
      <NavigateToSurvey label="새로운 이상형 찾기" />
      <GridBox>
        {cards.map((card, index) => (
          <Card
            key={index}
            onClick={() => navigate(`${card.resultUrl}`)}
          >
            <FlexBox direction="column" gap="16px">
              <img
                src={card.url}
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
  );
};

export default MyPage;
