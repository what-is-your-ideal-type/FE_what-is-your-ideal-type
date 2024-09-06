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

interface CardData {
  url: string;
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
              profile: data.profile,
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
    <main className="flex flex-col items-center space-y-8 bg-bg py-16">
      <h1 className="text-3xl font-bold">
        {currentUser?.email}님의 이상형 리스트 입니다.
      </h1>
      <NavigateToSurvey label="새로운 이상형 찾기" />
      <section className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
        {cards.map((card, index) => (
          <div
            key={index}
            className="w-[250px]"
            onClick={() =>
              navigate(`${card.resultUrl}`, {
                state: { profile: card.profile },
              })
            }
          >
            <div className="p-4">
              <img
                src={card.url}
                alt={card.fileName}
                className="w-full h-auto"
              />
              <div className="mt-4 space-y-1 text-center">
                {card.hashTags?.map((hashTag, index) => (
                  <i key={index}>#{hashTag} </i>
                ))}
                <b>{card.createdAt.toLocaleDateString()}</b>
              </div>
            </div>
          </div>
        ))}
      </section>
    </main>
  );
};

export default MyPage;
