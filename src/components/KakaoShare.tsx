import React, { useEffect } from "react";

declare global {
  interface Window {
    Kakao: any;
  }
}

const Kakaoshare: React.FC = () => {
  const realUrl = "https://what-is-your-ideal-type.vercel.app"; // 메인페이지 링크
  const resultUrl = window.location.href; // 결과페이지 링크

  useEffect(() => {
    if (window.Kakao) {
      window.Kakao.cleanup();
      window.Kakao.init("dfd8e8ebd0ff355e3edb9867070551e5");
      console.log(window.Kakao.isInitialized());
    }
  }, []);

  const shareKakao = () => {
    if (window.Kakao) {
      window.Kakao.Share.sendDefault({
        objectType: "feed",
        content: {
          title: "AI 이상형 찾기",
          description: "AI가 그려준 내 이상형은 어떻게 생겼을까?",
          imageUrl: "https://ibb.co/m5vDHcb",
          link: {
            mobileWebUrl: resultUrl,
          },
        },
        buttons: [
          {
            title: "나도 이상형 찾으러 가기",
            link: {
              mobileWebUrl: resultUrl,
            },
          },
        ],
      });
    }
  };

  return (
    <button className="size-8" onClick={shareKakao}>
      <img src="/images/kakaoshare.png" alt="카카오톡 공유 아이콘" />
    </button>
  );
};

export default Kakaoshare;
