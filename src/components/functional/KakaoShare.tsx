import React from "react";
import { useEffect } from "react";
import { Button } from "../ui/Button";
const { Kakao } = window;

const Kakaoshare = () => {
  const realUrl = "https://what-is-your-ideal-type.vercel.app";
  const resultUrl = window.location.href;

  useEffect(() => {
    Kakao.cleanup();
    Kakao.init("dfd8e8ebd0ff355e3edb9867070551e5");
    console.log(Kakao.isInitialized());
  }, []);

  const shareKakao = () => {
    Kakao.Share.sendDefault({
      objectType: "feed",
      content: {
        title: "AI 이상형 찾기",
        description: "AI가 그려준 내 이상형은 어떻게 생겼을까?",
        imageUrl: "https://ibb.co/m5vDHcb",
        link: {
          mobileWebUrl: realUrl,
        },
      },
      buttons: [
        {
          title: "나도 이상형 찾으러 가기",
          link: {
            mobileWebUrl: realUrl,
          },
        },
      ],
    });
  };

  return (
    <Button onClick={shareKakao}>
      <img src="/images/kakao.png" alt="카카오톡 공유 아이콘" />
    </Button>
  );
};

export default Kakaoshare;
