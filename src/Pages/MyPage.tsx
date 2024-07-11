import React, { useState, useEffect } from "react";
import Loading from "../components/Loading";
import Button from "../components/Button";
import { mainButtonArgs } from "../components/ButtonArgs";
import { auth, IMAGES_COLLECTION } from "../firebase";
import {
  query,
  getDocs,
  QuerySnapshot,
  DocumentData,
} from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";

interface CardData {
  url: string;
  createdAt: Date;
}

const MyPage = () => {
  const [cards, setCards] = useState<CardData[]>([]);
  const [uid, setUid] = useState<string | null>(null);
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setUid(user.uid);
      } else {
        // 로그인 해주세요.
      }
    });
  }, []);

  useEffect(() => {
    if (uid !== null) {
      const q = query(IMAGES_COLLECTION(uid));
      getDocs(q).then((querySnapshot: QuerySnapshot<DocumentData>) => {
        const newCards: CardData[] = [];
        console.log("querySnapshot", querySnapshot);
        querySnapshot.forEach((doc) => {
          const data = doc.data();
          const cardData: CardData = {
            url: data.url,
            createdAt: data.createdAt.toDate(),
          };
          newCards.push(cardData);
        });
        setCards((prevCards) => [...prevCards, ...newCards]);
      });
    } else {
      // 로그인 해주세요.
    }
  }, [uid]);

  return (
    <main className="flex flex-col items-center space-y-8 bg-bg py-16">
      <h1 className="text-3xl font-bold">Josh님의 이상형 리스트 입니다.</h1>
      <Button label="새로운 이상형 찾기" type="button" {...mainButtonArgs} />
      <section className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
        {cards.map((card, index) => (
          <div key={index} className="w-[250px]">
            <div className="p-4">
              <img src={card.url} alt="차은우" className="w-full h-auto" />
              <div className="mt-4 space-y-1 text-center">
                <p>#차가운 #만찢남/여</p>
                <p>#20대 #오독한 코</p>
                <p>#하얀 피부 #키 180이상</p>
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
