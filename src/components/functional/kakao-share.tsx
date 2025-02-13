import React from 'react';
import { useEffect } from 'react';
import { Button } from '../ui/button/button';
const { Kakao } = window;

const Kakaoshare = () => {
  const realUrl = 'https://what-is-your-ideal-type.vercel.app';
  const resultUrl = window.location.href;

  useEffect(() => {
    Kakao.cleanup();
    Kakao.init('dfd8e8ebd0ff355e3edb9867070551e5');
  }, []);

  const shareKakao = () => {
    Kakao.Share.sendDefault({
      objectType: 'feed',
      content: {
        title: 'AI 이상형 찾기',
        description: 'AI가 그려준 내 이상형은 어떻게 생겼을까?',
        imageUrl: 'https://ibb.co/m5vDHcb',
        link: {
          mobileWebUrl: realUrl,
        },
      },
      buttons: [
        {
          title: '나도 이상형 찾으러 가기',
          link: {
            mobileWebUrl: realUrl,
          },
        },
      ],
    });
  };

  return (
    <Button
      bgColor='main'
      className='w-32 font-bold p-3 text-xs'
      onClick={shareKakao}
    >
      카톡으로 공유하기
    </Button>
  );
};

export default Kakaoshare;
